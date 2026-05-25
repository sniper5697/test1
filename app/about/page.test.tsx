import { render, screen } from "@testing-library/react";
import AboutPage from "./page";

describe("AboutPage", () => {
  it("renders the about heading and contact section", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        name: "Velora Voice를 만든 팀의 방향과 기준",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "문의와 협업을 위한 기본 정보" }),
    ).toBeInTheDocument();
    expect(screen.getByText("hello@veloravoice.ai")).toBeInTheDocument();
  });
});
