import Link from "next/link";

const navItems = [
  { href: "/service", label: "서비스" },
  { href: "/about", label: "소개" },
  { href: "/faq", label: "FAQ" },
  { href: "/login", label: "로그인" },
  { href: "/signup", label: "회원가입" },
];

export function SiteHeader() {
  return (
    <section
      className="section-card"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 64,
        gap: 16,
        flexWrap: "wrap",
      }}
    >
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: 12 }}
        aria-label="Velora Voice 홈으로"
      >
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
      </Link>
      <nav aria-label="주요 메뉴" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
