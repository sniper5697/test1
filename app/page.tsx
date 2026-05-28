import type { Metadata } from "next";
import { Hero } from "../components/Hero";
import { VoiceDemo } from "../components/VoiceDemo";

export const metadata: Metadata = {
  title: "홈 | Velora Voice",
  description:
    "차세대 AI 음성 비서로 비즈니스와 일상을 더 스마트하게 혁신하는 Velora Voice의 실시간 데모를 확인하세요.",
};

const values = [
  {
    title: "높은 정확도",
    body: "실제 데모에서 고객이 가장 먼저 체감하는 인식 품질을 전면에 드러냅니다.",
  },
  {
    title: "빠른 응답",
    body: "질문 후 응답까지의 대기 시간을 줄여 실제 업무 흐름에 가까운 체험을 만듭니다.",
  },
  {
    title: "실시간성",
    body: "말하기, 파형 변화, 결과 표시가 하나의 연속된 흐름처럼 보이도록 설계합니다.",
  },
];

const useCases = ["고객 상담", "데모 키오스크", "내부 업무 지원", "브랜드 경험"];
const faqs = [
  "이 데모는 어떤 기능을 보여주나요?",
  "정확도는 어느 정도인가요?",
  "어떤 환경에서 사용할 수 있나요?",
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <Hero />

      <section className="section-card home-section home-section--editorial">
        <p className="eyebrow">핵심 가치</p>
        <h2 className="title-md home-section__title">
          정확도, 속도, 실시간성을 하나의 제품 경험으로 정리합니다
        </h2>
        <div className="home-grid home-grid--three">
          {values.map((value) => (
            <article key={value.title} className="feature-card">
              <h3 className="feature-card__title">{value.title}</h3>
              <p className="muted feature-card__body">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <VoiceDemo />

      <section className="section-card home-section home-section--editorial">
        <p className="eyebrow">활용 분야</p>
        <h2 className="title-md home-section__title">
          고객이 바로 상상할 수 있는 적용 장면을 먼저 제시합니다
        </h2>
        <div className="home-grid home-grid--three">
          {useCases.map((useCase) => (
            <article key={useCase} className="feature-card feature-card--usecase">
              <h3 className="feature-card__title">{useCase}</h3>
              <p className="muted feature-card__body">
                음성 인터랙션이 필요한 환경에 맞춰 확장 가능한 제품 경험입니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card home-section home-section--editorial">
        <p className="eyebrow">자주 묻는 질문</p>
        <h2 className="title-md home-section__title">
          도입 전 가장 많이 묻는 질문을 한 자리에서 확인할 수 있게 합니다
        </h2>
        <div className="faq-stack">
          {faqs.map((faq) => (
            <article key={faq} className="faq-card">
              <h3 className="faq-card__title">{faq}</h3>
              <p className="muted faq-card__body">
                실시간 음성 데모, 정확도, 적용 환경을 기준으로 고객이 빠르게 판단할 수 있는 정보를 제공합니다.
              </p>
            </article>
          ))}
        </div>
        <div className="final-cta-band">
          <h3 className="final-cta-band__title">지금 데모를 시작해보세요</h3>
          <p className="muted final-cta-band__body">
            Velora Voice의 핵심 가치를 가장 빠르게 이해하는 방법은 직접 음성으로 체험해보는 것입니다.
          </p>
          <a className="primary-button" href="#demo">
            데모 보기
          </a>
        </div>
      </section>

      <section className="section-card footer-band">
        <strong>Velora Voice</strong>
        <span className="muted">서비스 · 소개 · FAQ · SNS</span>
      </section>
    </div>
  );
}
