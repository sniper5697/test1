import { render, screen } from "@testing-library/react";
import ServicePage from "./page";

describe("ServicePage", () => {
  it("renders feature cards and the demo CTA", () => {
    render(<ServicePage />);

    expect(
      screen.getByRole("heading", {
        name: "실시간 음성 AI를 실제 제품 경험처럼 보여주는 구조",
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("실시간 응답")).toBeInTheDocument();
    expect(screen.getByText("높은 정확도")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "데모 보기" }),
    ).toHaveAttribute("href", "/#demo");
  });
});
