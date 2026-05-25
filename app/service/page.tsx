import type { Metadata } from "next";
import Link from "next/link";
import {
  serviceFeatures,
  serviceFlow,
  serviceUseCases,
  technicalStrengths,
} from "../../lib/page-content";

export const metadata: Metadata = {
  title: "서비스 | Velora Voice",
  description:
    "Velora Voice가 제공하는 고성능 AI 음성 솔루션, 핵심 기능, 적용 흐름과 기술 강점을 한 페이지에서 확인하세요.",
};

export default function ServicePage() {
  return (
    <div className="page-shell">
      <section className="section-card">
        <p className="eyebrow">서비스</p>
        <h1 className="title-md">실시간 음성 AI를 실제 제품 경험처럼 보여주는 구조</h1>
        <p className="muted" style={{ fontSize: 18, lineHeight: 1.8, maxWidth: 860 }}>
          Velora Voice는 단순한 음성 인식 데모가 아니라, 질문과 응답의 리듬까지
          포함한 완성형 인터랙션을 보여주는 제품입니다. 실시간 응답, 높은 정확도,
          자연스러운 음성 인터랙션을 핵심 축으로 설계합니다.
        </p>
      </section>

      <section className="section-card" style={{ marginTop: 48 }}>
        <p className="eyebrow">핵심 기능</p>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            marginTop: 24,
          }}
        >
          {serviceFeatures.map((feature) => (
            <article
              key={feature.title}
              className="section-card"
              style={{ padding: 24, background: "#fff", borderRadius: 24 }}
            >
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{feature.title}</h2>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-card"
        style={{
          marginTop: 48,
          display: "grid",
          gap: 24,
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        <article className="section-card" style={{ padding: 24, background: "#fff", borderRadius: 24 }}>
          <p className="eyebrow">사용 흐름</p>
          <h2 style={{ marginTop: 0, fontSize: 30 }}>질문에서 응답까지의 흐름</h2>
          <ol className="muted" style={{ paddingLeft: 20, lineHeight: 1.9, marginBottom: 0 }}>
            {serviceFlow.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
        <div style={{ display: "grid", gap: 18 }}>
          {technicalStrengths.map((strength) => (
            <article
              key={strength.title}
              className="section-card"
              style={{ padding: 24, background: "#fff", borderRadius: 24 }}
            >
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{strength.title}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                {strength.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" style={{ marginTop: 48 }}>
        <p className="eyebrow">적용 분야</p>
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            marginTop: 24,
          }}
        >
          {serviceUseCases.map((useCase) => (
            <article
              key={useCase}
              className="section-card"
              style={{ padding: 24, background: "#fff", borderRadius: 24 }}
            >
              <h3 style={{ marginTop: 0 }}>{useCase}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                음성 인터랙션이 필요한 장면에 맞춰 즉시 설명 가능한 시나리오입니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-card"
        style={{
          marginTop: 48,
          background: "linear-gradient(180deg, #f0f6ff 0%, #e1eeff 100%)",
        }}
      >
        <p className="eyebrow">데모 CTA</p>
        <h2 className="title-md">지금 바로 실시간 음성 데모를 체험해보세요</h2>
        <p className="muted" style={{ lineHeight: 1.8, maxWidth: 760 }}>
          가장 빠른 이해는 직접 말해보는 것입니다. 제품 설명보다 먼저 체감이
          일어나도록 홈의 데모 구간으로 바로 연결합니다.
        </p>
        <Link className="primary-button" href="/#demo">
          데모 보기
        </Link>
      </section>

    </div>
  );
}
