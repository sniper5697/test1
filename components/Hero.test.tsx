import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the homepage hero and demo CTA", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", {
        name: /실시간 음성 ai를\s*더 빠르고 정확하게/i,
      }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "데모 보기" })).toHaveAttribute(
      "href",
      "#demo",
    );
  });
});
