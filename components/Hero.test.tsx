import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the homepage hero and demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /실시간 음성 ai를\s*서비스에 연결하는\s*voice interface company/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "데모 보기" })).toHaveAttribute(
      "href",
      "#demo",
    );
  });
});
