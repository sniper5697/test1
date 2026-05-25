"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthCard } from "../../components/AuthCard";
import {
  hasFieldErrors,
  validateSignup,
  type SignupValues,
} from "../../lib/auth-validation";

export function SignupPageClient() {
  const [values, setValues] = useState<SignupValues>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SignupValues, string>>>({});
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof SignupValues>(field: K, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setStatusMessage("");

    if (errors[field]) {
      setErrors(validateSignup(nextValues));
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (hasFieldErrors(nextErrors)) {
      setStatusMessage("");
      return;
    }

    setStatusMessage("데모 계정 생성 흐름이 준비되었습니다.");
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
          <p className="eyebrow">Create Account</p>
          <h2 className="title-md">30초 안에 계정 진입 구조를 이해할 수 있게</h2>
          <p className="muted" style={{ lineHeight: 1.8, maxWidth: 520 }}>
            회원가입 자체가 목적이 아니라, 앞으로 연결될 서비스 생태계의 입구를
            신뢰감 있게 보여주는 화면입니다. 폼은 단순하지만 브랜드 톤은 유지합니다.
          </p>
          <div
            style={{
              display: "grid",
              gap: 14,
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              marginTop: 28,
            }}
          >
            {["빠른 온보딩", "명확한 입력 구조", "홈과 동일한 톤"].map((item) => (
              <article
                key={item}
                className="section-card"
                style={{ padding: 20, background: "#fff", borderRadius: 22 }}
              >
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </article>

        <AuthCard
          title="회원가입"
          description="실제 가입 로직 없이도 계정 생성 경험의 형태와 흐름을 충분히 확인할 수 있는 UI 전용 화면입니다."
          alternateHref="/login"
          alternateLabel="이미 계정이 있나요?"
          alternateCta="로그인"
        >
          <form
            aria-label="회원가입 폼"
            onSubmit={handleSubmit}
            style={{ display: "grid", gap: 16 }}
          >
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>이름</span>
              <input
                aria-label="이름"
                aria-describedby={errors.name ? "signup-name-error" : undefined}
                aria-invalid={errors.name ? "true" : "false"}
                placeholder="이름"
                className="input-control"
                value={values.name}
                onChange={(event) => updateField("name", event.target.value)}
                style={
                  errors.name
                    ? { borderColor: "#ff6b81", boxShadow: "inset 0 0 0 1px #ff6b81" }
                    : undefined
                }
              />
              <span
                id="signup-name-error"
                role={errors.name ? "alert" : undefined}
                style={{
                  minHeight: 20,
                  color: "#d43f5e",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {errors.name ?? ""}
              </span>
            </label>
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>이메일</span>
              <input
                aria-label="이메일"
                aria-describedby={errors.email ? "signup-email-error" : undefined}
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
                id="signup-email-error"
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
                aria-describedby={errors.password ? "signup-password-error" : undefined}
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
                id="signup-password-error"
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
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontWeight: 700 }}>비밀번호 확인</span>
              <input
                aria-label="비밀번호 확인"
                aria-describedby={errors.confirmPassword ? "signup-confirm-password-error" : undefined}
                aria-invalid={errors.confirmPassword ? "true" : "false"}
                placeholder="비밀번호 확인"
                type="password"
                className="input-control"
                value={values.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
                style={
                  errors.confirmPassword
                    ? { borderColor: "#ff6b81", boxShadow: "inset 0 0 0 1px #ff6b81" }
                    : undefined
                }
              />
              <span
                id="signup-confirm-password-error"
                role={errors.confirmPassword ? "alert" : undefined}
                style={{
                  minHeight: 20,
                  color: "#d43f5e",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {errors.confirmPassword ?? ""}
              </span>
            </label>
            <button className="primary-button" type="submit">
              회원가입
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
        먼저 제품을 이해하고 싶다면 <Link href="/service">서비스 페이지</Link>에서 흐름을
        확인할 수 있습니다.
      </p>
    </div>
  );
}
