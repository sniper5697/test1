import Link from "next/link";
import { Hero } from "../components/Hero";
import { VoiceDemo } from "../components/VoiceDemo";

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
    <main className="page-shell">
      <section
        className="section-card"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 64, gap: 16, flexWrap: "wrap" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            aria-hidden="true"
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "linear-gradient(135deg, #4aa7ff, #1d52d6)",
              display: "inline-block",
            }}
          />
          <strong>Velora Voice</strong>
        </div>
        <nav aria-label="주요 메뉴" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <Link href="/service">서비스</Link>
          <Link href="/about">소개</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </nav>
      </section>

      <Hero />

      <section className="section-card" style={{ marginTop: 64 }}>
        <p className="eyebrow">핵심 가치</p>
        <h2 className="title-md">정확도, 속도, 실시간성을 하나의 제품 경험으로 정리합니다</h2>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 28 }}>
          {values.map((value) => (
            <article key={value.title} className="section-card" style={{ padding: 24, background: "#fff", borderRadius: 24 }}>
              <h3 style={{ marginTop: 0 }}>{value.title}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <VoiceDemo />

      <section className="section-card" style={{ marginTop: 64 }}>
        <p className="eyebrow">활용 분야</p>
        <h2 className="title-md">고객이 바로 상상할 수 있는 적용 장면을 먼저 제시합니다</h2>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", marginTop: 28 }}>
          {useCases.map((useCase) => (
            <article key={useCase} className="section-card" style={{ padding: 24, background: "#fff", borderRadius: 24 }}>
              <h3 style={{ marginTop: 0 }}>{useCase}</h3>
              <p className="muted" style={{ marginBottom: 0, lineHeight: 1.7 }}>
                음성 인터랙션이 필요한 환경에 맞춰 확장 가능한 제품 경험입니다.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card" style={{ marginTop: 64 }}>
        <p className="eyebrow">자주 묻는 질문</p>
        <h2 className="title-md">도입 전 가장 많이 묻는 질문을 한 자리에서 확인할 수 있게 합니다</h2>
        <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
          {faqs.map((faq) => (
            <article key={faq} className="section-card" style={{ padding: 20, background: "#fff", borderRadius: 22 }}>
              <h3 style={{ marginTop: 0, marginBottom: 8 }}>{faq}</h3>
              <p className="muted" style={{ margin: 0, lineHeight: 1.7 }}>
                실시간 음성 데모, 정확도, 적용 환경을 기준으로 고객이 빠르게 판단할 수 있는 정보를 제공합니다.
              </p>
            </article>
          ))}
        </div>
        <div className="section-card" style={{ marginTop: 28, padding: 28, background: "linear-gradient(180deg, #f0f6ff 0%, #e1eeff 100%)" }}>
          <h3 style={{ marginTop: 0, marginBottom: 12 }}>지금 데모를 시작해보세요</h3>
          <p className="muted" style={{ lineHeight: 1.7 }}>
            Velora Voice의 핵심 가치를 가장 빠르게 이해하는 방법은 직접 음성으로 체험해보는 것입니다.
          </p>
          <a className="primary-button" href="#demo">
            데모 보기
          </a>
        </div>
      </section>

      <footer className="section-card" style={{ marginTop: 64, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <strong>Velora Voice</strong>
        <span className="muted">서비스 · 소개 · FAQ · SNS</span>
      </footer>
    </main>
  );
}
