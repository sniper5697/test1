import { act, fireEvent, render, screen } from "@testing-library/react";
import { VoiceDemo } from "./VoiceDemo";

const recognitionInstances: MockSpeechRecognition[] = [];
let lastUtterance: MockSpeechSynthesisUtterance | null = null;

class MockSpeechRecognition extends EventTarget {
  lang = "ko-KR";
  interimResults = false;
  continuous = false;
  start = vi.fn(() => {
    this.dispatchEvent(new Event("start"));
  });
  stop = vi.fn(() => {
    this.dispatchEvent(new Event("end"));
  });
  abort = vi.fn(() => {
    this.dispatchEvent(new Event("end"));
  });

  constructor() {
    super();
    recognitionInstances.push(this);
  }

  emitResult(transcript: string) {
    const event = new Event("result");
    Object.assign(event, {
      results: [[{ transcript }]],
    });
    this.dispatchEvent(event);
  }

  emitError(error: string) {
    const event = new Event("error");
    Object.assign(event, { error });
    this.dispatchEvent(event);
  }
}

class MockSpeechSynthesisUtterance {
  text: string;
  lang = "ko-KR";
  onend: (() => void) | null = null;

  constructor(text: string) {
    this.text = text;
    lastUtterance = this;
  }
}

const speechSynthesisMock = {
  cancel: vi.fn(),
  speak: vi.fn(),
};

describe("VoiceDemo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    recognitionInstances.length = 0;
    lastUtterance = null;
    speechSynthesisMock.cancel.mockClear();
    speechSynthesisMock.speak.mockClear();

    Object.defineProperty(window, "SpeechRecognition", {
      configurable: true,
      writable: true,
      value: MockSpeechRecognition,
    });

    Object.defineProperty(window, "webkitSpeechRecognition", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      writable: true,
      value: MockSpeechSynthesisUtterance,
    });

    Object.defineProperty(window, "speechSynthesis", {
      configurable: true,
      writable: true,
      value: speechSynthesisMock,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("runs the happy path from listening to speaking and back to idle", async () => {
    render(<VoiceDemo />);

    fireEvent.click(screen.getByRole("button", { name: "체험 시작하기" }));

    expect(screen.getByTestId("voice-status")).toHaveTextContent("듣고 있어요...");
    expect(recognitionInstances).toHaveLength(1);

    act(() => {
      recognitionInstances[0].emitResult("정확도 설명해줘");
    });

    expect(screen.getByTestId("voice-status")).toHaveTextContent("생각 중...");
    expect(screen.getByTestId("voice-transcript")).toHaveTextContent("정확도 설명해줘");

    act(() => {
      vi.advanceTimersByTime(240);
    });

    expect(speechSynthesisMock.speak).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("voice-status")).toHaveTextContent("응답을 들려주는 중...");
    expect(screen.getByTestId("voice-reply")).toHaveTextContent("인식 결과를 빠르게 정리");

    act(() => {
      lastUtterance?.onend?.();
    });

    expect(screen.getByTestId("voice-status")).toHaveTextContent(
      "체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.",
    );
  });

  it("shows a permission denied message when recognition rejects microphone access", async () => {
    render(<VoiceDemo />);

    fireEvent.click(screen.getByRole("button", { name: "체험 시작하기" }));

    act(() => {
      recognitionInstances[0].emitError("not-allowed");
    });

    expect(screen.getByRole("alert")).toHaveTextContent("마이크 권한이 필요합니다.");
    expect(screen.getByTestId("voice-status")).toHaveTextContent("마이크 권한이 필요합니다.");
  });

  it("falls back to text-only completion when SpeechSynthesisUtterance is unavailable", async () => {
    Object.defineProperty(window, "SpeechSynthesisUtterance", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    render(<VoiceDemo />);

    fireEvent.click(screen.getByRole("button", { name: "체험 시작하기" }));

    act(() => {
      recognitionInstances[0].emitResult("지원 환경이 궁금해");
      vi.advanceTimersByTime(240);
    });

    expect(screen.getByTestId("voice-reply")).toHaveTextContent("상담, 키오스크, 내부 업무 지원");
    expect(screen.getByTestId("voice-status")).toHaveTextContent(
      "체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.",
    );
    expect(speechSynthesisMock.speak).not.toHaveBeenCalled();
  });

  it("stops an active session and cancels speech playback", async () => {
    render(<VoiceDemo />);

    fireEvent.click(screen.getByRole("button", { name: "체험 시작하기" }));
    expect(screen.getByRole("button", { name: "중지하기" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "중지하기" }));

    expect(recognitionInstances[0].abort).toHaveBeenCalledTimes(1);
    expect(speechSynthesisMock.cancel).toHaveBeenCalled();
    expect(screen.getByTestId("voice-status")).toHaveTextContent(
      "체험 시작하기를 누르면 브라우저가 마이크 권한을 확인합니다.",
    );
  });
});
