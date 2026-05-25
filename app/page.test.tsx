import { render, screen } from "@testing-library/react";
import HomePage from "./page";

describe("HomePage", () => {
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

  it("does not render a duplicate primary navigation inside the homepage body", () => {
    render(<HomePage />);

    expect(screen.queryByRole("navigation", { name: "주요 메뉴" })).not.toBeInTheDocument();
  });
});
