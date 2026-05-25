import type { Page } from "@playwright/test";

type MockVoiceOptions = {
  transcript?: string;
  permissionDenied?: boolean;
  resultDelayMs?: number;
  speechEndDelayMs?: number;
};

export async function installMockVoiceApis(
  page: Page,
  options: MockVoiceOptions = {},
) {
  const {
    transcript = "테스트 질문입니다",
    permissionDenied = false,
    resultDelayMs = 60,
    speechEndDelayMs = 80,
  } = options;

  await page.addInitScript(
    ({ transcript, permissionDenied, resultDelayMs, speechEndDelayMs }) => {
      class FakeSpeechRecognition extends EventTarget {
        continuous = false;
        interimResults = true;
        lang = "ko-KR";

        start() {
          if (permissionDenied) {
            const event = new Event("error");
            Object.assign(event, { error: "not-allowed" });
            setTimeout(() => this.dispatchEvent(event), 20);
            return;
          }

          setTimeout(() => this.dispatchEvent(new Event("start")), 10);
          setTimeout(() => {
            const event = new Event("result");
            Object.assign(event, {
              resultIndex: 0,
              results: [[{ transcript }]],
            });
            this.dispatchEvent(event);
          }, resultDelayMs);
          setTimeout(() => this.dispatchEvent(new Event("end")), resultDelayMs + 60);
        }

        stop() {
          this.dispatchEvent(new Event("end"));
        }

        abort() {
          this.dispatchEvent(new Event("end"));
        }
      }

      const synth =
        window.speechSynthesis ??
        ({
          speaking: false,
          getVoices() {
            return [{ lang: "ko-KR", name: "Mock Korean Voice" }];
          },
        } as SpeechSynthesis);

      Object.defineProperty(synth, "speak", {
        configurable: true,
        value(utterance: SpeechSynthesisUtterance) {
          Object.defineProperty(synth, "speaking", {
            configurable: true,
            value: true,
          });
          setTimeout(() => {
            Object.defineProperty(synth, "speaking", {
              configurable: true,
              value: false,
            });
            utterance.onend?.(new Event("end") as SpeechSynthesisEvent);
          }, speechEndDelayMs);
        },
      });

      Object.defineProperty(synth, "cancel", {
        configurable: true,
        value() {
          Object.defineProperty(synth, "speaking", {
            configurable: true,
            value: false,
          });
        },
      });

      Object.defineProperty(synth, "getVoices", {
        configurable: true,
        value() {
          return [{ lang: "ko-KR", name: "Mock Korean Voice" }];
        },
      });

      Object.assign(window, {
        SpeechRecognition: FakeSpeechRecognition,
        webkitSpeechRecognition: FakeSpeechRecognition,
        speechSynthesis: synth,
      });
    },
    { transcript, permissionDenied, resultDelayMs, speechEndDelayMs },
  );
}
