"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "../../components/AuthCard";
import { hasFieldErrors, validateLogin, type LoginValues } from "../../lib/auth-validation";

export function LoginPageClient() {
  const [values, setValues] = useState<LoginValues>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof LoginValues>(field: K, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setStatusMessage("");

    if (errors[field]) {
      setErrors(validateLogin(nextValues));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (hasFieldErrors(nextErrors)) {
      setStatusMessage("");
      return;
    }

    setStatusMessage("데모 권한 활성화 준비가 완료되었습니다.");
  }

  return (
    <div className="page-shell">
      <section
        style={{
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <article
          className="section-card"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.92) 0%, rgba(232,241,255,0.92) 100%)",
          }}
        >
          <p className="eyebrow">Welcome Back</p>
          <h2 className="title-md">다시 만나서 반갑습니다</h2>
          <p className="muted" style={{ lineHeight: 1.8, maxWidth: 520 }}>
            Velora Voice의 실시간 음성 경험은 가장 짧은 진입 경로에서 시작되어야
            합니다. 계정 진입 화면도 마케팅 페이지와 같은 톤으로 정리했습니다.
          </p>
          <div
            aria-label="waveform preview"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              alignItems: "end",
              gap: 10,
              minHeight: 120,
              marginTop: 32,
            }}
          >
            {[24, 64, 44, 96, 88, 58, 82, 46, 72, 36].map((height, index) => (
              <span
                key={`${height}-${index}`}
                style={{
                  height,
                  borderRadius: 999,
                  background: "linear-gradient(180deg, #8dcaff, #2c63e3)",
                  display: "block",
                }}
              />
            ))}
          </div>
        </article>

        <AuthCard
          title="로그인"
          description="이메일과 비밀번호만으로 데모 환경에 진입하는 흐름을 보여주는 UI 전용 화면입니다."
          alternateHref="/signup"
          alternateLabel="계정이 아직 없나요?"
          alternateCta="회원가입"
        >
          <form
            aria-label="로그인 폼"
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 16 }}
          >
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>이메일</span>
              <input
                aria-label="이메일"
                aria-describedby={errors.email ? "login-email-error" : undefined}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="name@company.com"
                className="input-control"
                value={values.email}
                onChange={(event) => updateField("email", event.target.value)}
                style={
                  errors.email
                    ? { borderColor: "#ff6b81", boxShadow: "inset 0 0 0 1px #ff6b81" }
                    : undefined
                }
              />
              <span
                id="login-email-error"
                role={errors.email ? "alert" : undefined}
                style={{
                  minHeight: 20,
                  color: "#d43f5e",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {errors.email ?? ""}
              </span>
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>비밀번호</span>
              <input
                aria-label="비밀번호"
                aria-describedby={errors.password ? "login-password-error" : undefined}
                aria-invalid={errors.password ? "true" : "false"}
                placeholder="비밀번호"
                type="password"
                className="input-control"
                value={values.password}
                onChange={(event) => updateField("password", event.target.value)}
                style={
                  errors.password
                    ? { borderColor: "#ff6b81", boxShadow: "inset 0 0 0 1px #ff6b81" }
                    : undefined
                }
              />
              <span
                id="login-password-error"
                role={errors.password ? "alert" : undefined}
                style={{
                  minHeight: 20,
                  color: "#d43f5e",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {errors.password ?? ""}
              </span>
            </label>
            <button className="primary-button" type="submit">
              로그인
            </button>
            <span
              role={statusMessage ? "status" : undefined}
              style={{
                minHeight: 24,
                color: "#2055d5",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {statusMessage}
            </span>
          </form>
        </AuthCard>
      </section>

      <p className="muted" style={{ textAlign: "center", marginTop: 24 }}>
        데모를 먼저 보고 싶다면 <Link href="/#demo">홈의 실시간 음성 섹션</Link>으로
        이동할 수 있습니다.
      </p>
    </div>
  );
}
