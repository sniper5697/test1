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
  const { error, reply, start, state, statusText, stop, transcript } = useVoiceDemo();
  const isBusy = state !== "idle" && state !== "error";

  return (
    <section
      id="demo"
      className="section-card"
      data-state={state}
      style={{ marginTop: 64 }}
    >
      <p className="eyebrow">실시간 음성 데모</p>
      <h2 className="title-md">말하는 순간 바로 보이는 실시간 음성 인터랙션</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
          marginTop: 28,
          alignItems: "stretch",
        }}
      >
        <article className="section-card" style={{ padding: 24, background: "#fff" }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>체험 흐름</h3>
          <ol className="muted" style={{ paddingLeft: 20, lineHeight: 1.8, margin: 0 }}>
            <li>체험 시작하기를 눌러 마이크 권한을 확인합니다.</li>
            <li>사용자의 질문이 텍스트로 전환됩니다.</li>
            <li>상태 변화와 파형이 동시에 반응합니다.</li>
            <li>Velora Voice가 음성과 텍스트로 응답합니다.</li>
          </ol>
        </article>

        <article className="section-card" style={{ padding: 24, background: "#fff" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h3 style={{ margin: 0 }}>음성 세션 상태</h3>
            <span
              data-testid="voice-status"
              aria-live="polite"
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "8px 14px",
                borderRadius: 999,
                background:
                  state === "error"
                    ? "rgba(240, 108, 84, 0.12)"
                    : "rgba(78, 146, 255, 0.12)",
                color: state === "error" ? "#b34835" : "#2055d5",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              {statusText}
            </span>
          </div>

          <div
            aria-label="waveform"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(11, 1fr)",
              alignItems: "end",
              gap: 10,
              minHeight: 150,
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            {waveforms[state].map((height, index) => (
              <span
                key={`${state}-${index}`}
                style={{
                  height,
                  borderRadius: 999,
                  background: waveGradient[state],
                  display: "block",
                  transition: "height 180ms ease, background 180ms ease",
                }}
              />
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
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
                onClick={start}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px 24px",
                  borderRadius: 999,
                  border: "1px solid #bfd5ff",
                  background: "#f7fbff",
                  color: "#2055d5",
                  fontWeight: 700,
                }}
              >
                다시 질문하기
              </button>
            )}
          </div>
        </article>

        <article className="section-card" style={{ padding: 24, background: "#fff" }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>대화 미리보기</h3>
          <div style={{ display: "grid", gap: 14 }}>
            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: "#f7fbff",
                border: "1px solid #dce9ff",
              }}
            >
              <strong style={{ display: "block", marginBottom: 8 }}>사용자 질문</strong>
              <p
                data-testid="voice-transcript"
                className="muted"
                style={{ margin: 0, lineHeight: 1.8 }}
              >
                {transcript || "마이크를 켜면 인식된 질문이 여기에 표시됩니다."}
              </p>
            </div>
            <div
              style={{
                padding: 18,
                borderRadius: 20,
                background: "linear-gradient(180deg, #f2f6ff 0%, #e6eeff 100%)",
                border: "1px solid #d6e4ff",
              }}
            >
              <strong style={{ display: "block", marginBottom: 8 }}>Velora Voice 응답</strong>
              <p
                data-testid="voice-reply"
                className="muted"
                aria-live="polite"
                style={{ margin: 0, lineHeight: 1.8 }}
              >
                {reply || "음성 결과가 준비되면 이곳에 텍스트와 함께 응답 흐름이 이어집니다."}
              </p>
            </div>
          </div>
          {error && (
            <p
              role="alert"
              style={{
                marginTop: 18,
                marginBottom: 0,
                color: "#b34835",
                lineHeight: 1.7,
              }}
            >
              {error}
            </p>
          )}
        </article>
      </div>
    </section>
  );
}
