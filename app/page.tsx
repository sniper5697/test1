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
    title: "인식 신뢰성",
    body: "실내외 소음, 다양한 화자, 짧은 발화에서도 안정적으로 의미를 잡아내는 STT 흐름을 설계합니다.",
  },
  {
    title: "운영 가능한 응답",
    body: "대기 시간, fallback, 재질문 같은 운영 요소를 포함해 실제 서비스에서 끊기지 않는 응답 경험을 만듭니다.",
  },
  {
    title: "서비스 연결성",
    body: "상담, 키오스크, 사내 도구처럼 서비스 문맥이 다른 환경에 맞춰 음성 흐름을 안전하게 연결합니다.",
  },
];

const technology = [
  {
    title: "실시간 파이프라인",
    body: "브라우저 입력부터 인식, 응답 생성, 재생까지 이어지는 전체 루프를 빠르게 보여줍니다.",
  },
  {
    title: "제어와 가드레일",
    body: "사용자 의도, 시스템 상태, 재시도 규칙을 함께 다뤄 대화형 서비스가 무너지지 않게 합니다.",
  },
  {
    title: "운영 검증 중심",
    body: "데모는 보기용이 아니라 운영 준비도를 판단하는 기준으로 쓰일 수 있게 구성합니다.",
  },
];

const useCases = [
  {
    title: "고객 상담",
    body: "자주 묻는 문의, 상담 안내, 대기 흐름을 음성 인터페이스로 정리해 상담 접점을 더 빠르게 연결합니다.",
  },
  {
    title: "공간형 데모",
    body: "전시, 리테일, 체험존에서 즉시 반응하는 음성 경험으로 브랜드 이해와 참여를 높입니다.",
  },
  {
    title: "업무 지원",
    body: "짧은 질문과 반복 업무를 음성 인터페이스로 전환해 내부 생산성과 접근성을 함께 개선합니다.",
  },
  {
    title: "브랜드 경험",
    body: "제품 설명, 서비스 소개, 핵심 메시지를 사람다운 응답 흐름 안에서 전달합니다.",
  },
];
const faqs = [
  {
    question: "이 데모는 어떤 운영 흐름을 검증하나요?",
    answer:
      "입력, 인식, 응답 생성, 음성 재생까지 이어지는 실시간 voice AI 루프를 한 화면에서 확인할 수 있습니다.",
  },
  {
    question: "실제 서비스에 넣을 만큼 안정적인가요?",
    answer:
      "정확도만이 아니라 지연, 재질문, 오류 복귀까지 포함해 운영 가능한 상태를 판단하는 기준으로 설계합니다.",
  },
  {
    question: "어떤 서비스 환경에 맞출 수 있나요?",
    answer:
      "상담, 키오스크, 사내 도구, 브랜드 체험형 서비스처럼 대화 중심 접점이 있는 곳에 맞춰 적용할 수 있습니다.",
  },
];

export default function HomePage() {
  return (
    <div className="page-shell">
      <Hero />

      <section className="section-card home-section home-section--company">
        <p className="eyebrow">Company</p>
        <h2 className="title-md home-section__title">
          음성 AI를 실제 서비스 맥락에 맞게 설계하고 운영 가능한 경험으로 연결합니다.
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

        <div className="home-section__split">
          <div className="home-section__split-copy">
            <p className="eyebrow">Technology</p>
            <h3 className="title-sm home-section__subhead">
              도입 전에 확인해야 하는 핵심 요소를 신뢰, 제어, 응답 흐름 중심으로 정리합니다.
            </h3>
          </div>
          <div className="home-grid home-grid--three">
            {technology.map((item) => (
              <article key={item.title} className="feature-card">
                <h3 className="feature-card__title">{item.title}</h3>
                <p className="muted feature-card__body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VoiceDemo />

      <section className="section-card home-section home-section--company">
        <p className="eyebrow">Applications</p>
        <h2 className="title-md home-section__title">
          고객 접점부터 내부 운영까지, Voice AI를 실제 업무 흐름 속에 배치합니다.
        </h2>
        <div className="home-grid home-grid--four">
          {useCases.map((useCase) => (
            <article key={useCase.title} className="feature-card feature-card--usecase">
              <h3 className="feature-card__title">{useCase.title}</h3>
              <p className="muted feature-card__body">{useCase.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card home-section home-section--company">
        <p className="eyebrow">Readiness</p>
        <h2 className="title-md home-section__title">
          도입 전 확인해야 할 질문에 명확하게 답할 수 있는 구조를 준비합니다.
        </h2>
        <div className="faq-stack">
          {faqs.map((faq) => (
            <article key={faq.question} className="faq-card">
              <h3 className="faq-card__title">{faq.question}</h3>
              <p className="muted faq-card__body">{faq.answer}</p>
            </article>
          ))}
        </div>
        <div className="final-cta-band">
          <h3 className="final-cta-band__title">
            실시간 음성 AI 경험을 서비스에 바로 연결해보세요.
          </h3>
          <p className="muted final-cta-band__body">
            Velora Voice 데모로 인식 정확도, 응답 흐름, 실제 운영감을 한 번에 확인할 수 있습니다.
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
