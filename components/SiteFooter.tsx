import Link from "next/link";

export function SiteFooter() {
  return (
    <footer
      className="section-card"
      style={{
        marginTop: 64,
        display: "flex",
        justifyContent: "space-between",
        gap: 16,
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Link href="/" aria-label="Velora Voice 홈으로">
        <strong>Velora Voice</strong>
      </Link>
      <span className="muted">서비스 · 소개 · FAQ · 로그인 · 회원가입</span>
    </footer>
  );
}
