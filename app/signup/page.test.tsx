import { fireEvent, render, screen } from "@testing-library/react";
import SignupPage from "./page";

describe("SignupPage", () => {
  it("renders the signup form fields and login link", () => {
    render(<SignupPage />);

    expect(screen.getByRole("heading", { name: "회원가입" })).toBeInTheDocument();
    expect(screen.getByLabelText("이름")).toBeInTheDocument();
    expect(screen.getByLabelText("이메일")).toBeInTheDocument();
    expect(screen.getByLabelText("비밀번호")).toHaveAttribute("type", "password");
    expect(screen.getByLabelText("비밀번호 확인")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByRole("button", { name: "회원가입" })).toBeInTheDocument();
    expect(
      screen
        .getAllByRole("link", { name: "로그인" })
        .some((link) => link.getAttribute("href") === "/login"),
    ).toBe(true);
  });

  it("shows mismatch validation and removes it when passwords match", () => {
    render(<SignupPage />);

    fireEvent.change(screen.getByLabelText("이름"), {
      target: { value: "테스트 사용자" },
    });
    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "name@company.com" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "password321" },
    });
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(screen.getByText("비밀번호가 서로 일치해야 합니다.")).toHaveAttribute(
      "role",
      "alert",
    );

    fireEvent.change(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(screen.queryByText("비밀번호가 서로 일치해야 합니다.")).not.toBeInTheDocument();
    expect(screen.getByText("데모 계정 생성 흐름이 준비되었습니다.")).toHaveAttribute(
      "role",
      "status",
    );
  });

  it("shows empty-submit and invalid email feedback", () => {
    render(<SignupPage />);

    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(screen.getByText("이름을 입력해주세요.")).toHaveAttribute("role", "alert");
    expect(screen.getByText("진입을 위해 이메일이 필요합니다.")).toHaveAttribute(
      "role",
      "alert",
    );
    expect(screen.getByText("비밀번호를 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );

    fireEvent.change(screen.getByLabelText("이름"), {
      target: { value: "테스트 사용자" },
    });
    fireEvent.change(screen.getByLabelText("이메일"), {
      target: { value: "notanemail" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("비밀번호 확인"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: "회원가입" }));

    expect(screen.getByText("올바른 이메일 형식을 입력해주세요.")).toHaveAttribute(
      "role",
      "alert",
    );
  });
});
