export function Hero() {
  return (
    <section className="section-card hero-company" aria-labelledby="hero-title">
      <div className="hero-company__grid">
        <div className="hero-company__copy">
          <p className="eyebrow">Voice AI Company</p>
          <h1 id="hero-title" className="title-lg hero-company__title">
            실시간 음성 AI를
            <br />
            서비스에 연결하는
            <br />
            Voice Interface Company
          </h1>
          <p className="muted hero-company__body">
            Velora Voice는 음성 인식, 응답 오케스트레이션, 실시간 UX를 하나의 흐름으로
            설계해 고객 상담, 키오스크, 내부 업무까지 바로 연결되는 voice AI 경험을
            만듭니다.
          </p>
          <div className="hero-company__actions">
            <a className="primary-button" href="#demo">
              데모 보기
            </a>
          </div>
          <div className="hero-company__signals" aria-label="주요 특성">
            <span>정확도 중심</span>
            <span>실시간 응답</span>
            <span>자연스러운 인터랙션</span>
          </div>
        </div>

        <div className="hero-company__visual" aria-hidden="true">
          <div className="hero-company__panel">
            <div className="hero-company__panel-top">
              <span className="hero-company__pill">Service Preview</span>
              <span className="hero-company__tiny-label">LIVE</span>
            </div>

            <div className="hero-company__bars">
              <span style={{ height: 62 }} />
              <span style={{ height: 88 }} />
              <span style={{ height: 110 }} />
              <span style={{ height: 78 }} />
              <span style={{ height: 126 }} />
              <span style={{ height: 92 }} />
              <span style={{ height: 70 }} />
            </div>

            <div className="hero-company__metrics">
              <div>
                <strong>상태</strong>
                <span>응답 준비</span>
              </div>
              <div>
                <strong>지연</strong>
                <span>0.7s</span>
              </div>
              <div>
                <strong>모드</strong>
                <span>실운영</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
