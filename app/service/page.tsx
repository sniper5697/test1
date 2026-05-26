import type { Metadata } from "next";
import { SecondaryPageCta } from "../../components/SecondaryPageCta";
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
        <p className="muted secondary-lead">
          Velora Voice는 단순한 음성 인식 데모가 아니라, 질문과 응답의 리듬까지
          포함한 완성형 인터랙션을 보여주는 제품입니다. 실시간 응답, 높은 정확도,
          자연스러운 음성 인터랙션을 핵심 축으로 설계합니다.
        </p>
      </section>

      <section className="section-card secondary-section-spacing">
        <p className="eyebrow">핵심 기능</p>
        <div className="secondary-grid-3">
          {serviceFeatures.map((feature) => (
            <article key={feature.title} className="section-card secondary-surface-card">
              <h2 style={{ marginTop: 0, fontSize: 24 }}>{feature.title}</h2>
              <p className="muted" style={{ lineHeight: 1.7 }}>
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-card secondary-section-spacing secondary-grid-2"
      >
        <article className="section-card secondary-surface-card">
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
            <article key={strength.title} className="section-card secondary-surface-card">
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{strength.title}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                {strength.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card secondary-section-spacing">
        <p className="eyebrow">적용 분야</p>
        <div className="secondary-grid-3">
          {serviceUseCases.map((useCase) => (
            <article key={useCase} className="section-card secondary-surface-card">
              <h3 style={{ marginTop: 0 }}>{useCase}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                음성 인터랙션이 필요한 장면에 맞춰 즉시 설명 가능한 시나리오입니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <SecondaryPageCta
        eyebrow="데모 CTA"
        title="기능 설명에서 끝내지 말고, 음성 리듬을 바로 확인하세요"
        body="서비스 구조를 이해했다면 다음은 실제 상호작용입니다. 홈의 실시간 음성 데모에서 질문-응답의 흐름을 바로 체험할 수 있습니다."
        primaryHref="/#demo"
        primaryLabel="데모 보기"
        secondaryHref="/faq"
        secondaryLabel="FAQ 보기"
      />
    </div>
  );
}
