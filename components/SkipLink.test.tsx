import { fireEvent, render, screen } from "@testing-library/react";
import { SkipLink } from "./SkipLink";

describe("SkipLink", () => {
  it("renders a skip link targeting the main content anchor", () => {
    render(
      <>
        <SkipLink />
        <main id="main-content" tabIndex={-1}>
          content
        </main>
      </>,
    );

    const link = screen.getByRole("link", { name: "본문으로 바로가기" });

    expect(link).toHaveAttribute("href", "#main-content");
    expect(link).toHaveClass("skip-link");
  });

  it("moves focus to the main content target when activated", () => {
    render(
      <>
        <SkipLink />
        <main id="main-content" tabIndex={-1}>
          content
        </main>
      </>,
    );

    const link = screen.getByRole("link", { name: "본문으로 바로가기" });
    const main = screen.getByRole("main");

    fireEvent.click(link);

    expect(main).toHaveFocus();
  });
});
