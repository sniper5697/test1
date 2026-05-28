"use client";

import { useVoiceDemo, type VoiceDemoState } from "../lib/useVoiceDemo";

const waveforms: Record<VoiceDemoState, number[]> = {
  idle: [26, 40, 34, 52, 60, 48, 36, 54, 30, 44, 32],
  permission: [36, 58, 42, 74, 82, 66, 48, 76, 42, 62, 44],
  listening: [54, 88, 64, 108, 118, 92, 70, 102, 58, 86, 66],
  thinking: [30, 52, 42, 70, 82, 76, 58, 66, 44, 58, 40],
  speaking: [44, 76, 58, 94, 110, 86, 62, 96, 48, 78, 60],
  error: [24, 34, 28, 42, 48, 44, 30, 40, 26, 36, 24],
};

const waveGradient: Record<VoiceDemoState, string> = {
  idle: "linear-gradient(180deg, #c7dcff, #78a7ff)",
  permission: "linear-gradient(180deg, #9ed3ff, #4b87ff)",
  listening: "linear-gradient(180deg, #8dcaff, #2c63e3)",
  thinking: "linear-gradient(180deg, #b7c9ff, #617cf0)",
  speaking: "linear-gradient(180deg, #9ea7ff, #6550df)",
  error: "linear-gradient(180deg, #ffcabf, #f06c54)",
};

export function VoiceDemo() {
  const { error, errorKind, reply, start, state, statusText, stop, transcript } =
    useVoiceDemo();
  const isBusy = state !== "idle" && state !== "error";

  return (
    <section id="demo" className="section-card voice-demo-a1" data-state={state}>
      <p className="eyebrow">실시간 음성 데모</p>
      <div className="voice-demo-a1__intro">
        <div>
          <h2 className="title-md voice-demo-a1__title">
            말하는 순간 바로 보이는 실시간 음성 인터랙션
          </h2>
          <p className="voice-demo-a1__lead">
            실제 제품 스테이지처럼 보이는 어두운 패널 안에서 상태 변화, 파형, 전사,
            응답이 하나의 흐름으로 이어집니다.
          </p>
        </div>
      </div>

      <div className="voice-demo-a1__grid">
        <article className="voice-demo-a1__card voice-demo-a1__card--muted">
          <h3 className="voice-demo-a1__card-title">체험 흐름</h3>
          <ol className="voice-demo-a1__flow">
            <li>체험 시작하기를 눌러 마이크 권한을 확인합니다.</li>
            <li>사용자의 질문이 텍스트로 전환됩니다.</li>
            <li>상태 변화와 파형이 동시에 반응합니다.</li>
            <li>Velora Voice가 음성과 텍스트로 응답합니다.</li>
          </ol>
        </article>

        <article className="voice-demo-a1__card voice-demo-a1__card--primary">
          <div className="voice-demo-a1__status-row">
            <h3 className="voice-demo-a1__card-title">음성 세션 상태</h3>
            <span
              data-testid="voice-status"
              className="voice-demo-a1__status-pill"
              aria-live="polite"
              data-error={state === "error" ? "true" : "false"}
            >
              {statusText}
            </span>
          </div>

          <div aria-label="waveform" className="voice-demo-a1__waveform">
            {waveforms[state].map((height, index) => (
              <span
                key={`${state}-${index}`}
                className="voice-demo-a1__wave-bar"
                style={{
                  height,
                  background: waveGradient[state],
                  transition: "height 180ms ease, background 180ms ease",
                }}
              />
            ))}
          </div>

          <div className="voice-demo-a1__actions">
            <button
              type="button"
              className="primary-button"
              data-testid="voice-toggle"
              onClick={isBusy ? stop : start}
              aria-label={isBusy ? "중지하기" : "체험 시작하기"}
            >
              {isBusy ? "중지하기" : "체험 시작하기"}
            </button>
            {(transcript || reply || error) && !isBusy && (
              <button
                type="button"
                className="voice-demo-a1__ghost-button"
                onClick={start}
              >
                다시 질문하기
              </button>
            )}
          </div>
        </article>

        <article className="voice-demo-a1__card voice-demo-a1__card--conversation">
          <h3 className="voice-demo-a1__card-title">대화 미리보기</h3>
          <div className="voice-demo-a1__conversation">
            <div className="voice-demo-a1__bubble voice-demo-a1__bubble--user">
              <strong>사용자 질문</strong>
              <p data-testid="voice-transcript" className="voice-demo-a1__bubble-text">
                {transcript || "마이크를 켜면 인식된 질문이 여기에 표시됩니다."}
              </p>
            </div>
            <div className="voice-demo-a1__bubble voice-demo-a1__bubble--reply">
              <strong>Velora Voice 응답</strong>
              <p data-testid="voice-reply" className="voice-demo-a1__bubble-text" aria-live="polite">
                {reply || "음성 결과가 준비되면 이곳에 텍스트와 함께 응답 흐름이 이어집니다."}
              </p>
            </div>
          </div>
          {error && (
            <div role="alert" className="voice-demo-a1__error">
              <p className="voice-demo-a1__error-copy">{error}</p>
              {errorKind === "unsupported" && (
                <p className="voice-demo-a1__error-note">
                  호환 브라우저에서 다시 열면 실시간 마이크 체험을 바로 이어갈 수 있습니다.
                </p>
              )}
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
