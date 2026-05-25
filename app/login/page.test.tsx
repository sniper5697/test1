import { fireEvent, render, screen } from "@testing-library/react";
import LoginPage from "./page";

describe("LoginPage", () => {
  it("renders the login form fields and signup link", () => {
    render(<LoginPage />);

    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "회원가입" })
        .some((link) => link.getAttribute("href") === "/signup"),
    ).toBe(true);
  });

  it("shows accessible validation feedback on empty submit and clears it after valid resubmit", () => {
    render(<LoginPage />);

    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(screen.getByText("진입을 위해 이메일이 필요합니다.")).toHaveAttribute(
      "role",
      "alert",
    );
    expect(screen.getByText("비밀번호를 입력해주세요.")).toHaveAttribute("role", "alert");

    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "name@company.com" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(screen.queryByText("진입을 위해 이메일이 필요합니다.")).not.toBeInTheDocument();
    expect(screen.queryByText("비밀번호를 입력해주세요.")).not.toBeInTheDocument();
    expect(screen.getByText("데모 권한 활성화 준비가 완료되었습니다.")).toHaveAttribute(
      "role",
      "status",
    );
  });

  it("shows an email format error for invalid input", () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "notanemail" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(screen.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );
  });
});
