import { render, screen, within } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
  it("renders the primary navigation with core routes", () => {
    render(<HomePage />);

    const navigation = screen.getByRole("navigation", { name: "주요 메뉴" });

    expect(within(navigation).getByRole("link", { name: "서비스" })).toHaveAttribute(
      "href",
      "/service",
    );
    expect(within(navigation).getByRole("link", { name: "소개" })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(within(navigation).getByRole("link", { name: "FAQ" })).toHaveAttribute(
      "href",
      "/faq",
    );
    expect(within(navigation).getByRole("link", { name: "로그인" })).toHaveAttribute(
      "href",
      "/login",
    );
    expect(
      within(navigation).getByRole("link", { name: "회원가입" }),
    ).toHaveAttribute("href", "/signup");
  });

  it("renders both demo CTAs and the target demo section", () => {
    render(<HomePage />);

    const demoLinks = screen.getAllByRole("link", { name: "데모 보기" });

    expect(demoLinks).toHaveLength(2);
    demoLinks.forEach((link) => expect(link).toHaveAttribute("href", "#demo"));

    expect(
      screen.getByRole("heading", {
        name: "말하는 순간 바로 보이는 실시간 음성 인터랙션",
      }),
    ).toBeInTheDocument();
  });
});
