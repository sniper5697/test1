export type LoginValues = {
  email: string;
  password: string;
};

export type SignupValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email: string) {
  if (!email.trim()) {
    return "진입을 위해 이메일이 필요합니다.";
  }

  if (!emailPattern.test(email.trim())) {
    return "올바른 이메일 형식을 입력해주세요.";
  }

  return undefined;
}

function validatePassword(password: string) {
  if (!password.trim()) {
    return "비밀번호를 입력해주세요.";
  }

  if (password.trim().length < 8) {
    return "보안을 위해 8자 이상의 비밀번호를 권장합니다.";
  }

  return undefined;
}

export function validateLogin(values: LoginValues): FieldErrors<keyof LoginValues> {
  return {
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  };
}

export function validateSignup(
  values: SignupValues,
): FieldErrors<keyof SignupValues> {
  const errors: FieldErrors<keyof SignupValues> = {
    name: values.name.trim() ? undefined : "이름을 입력해주세요.",
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword: undefined,
  };

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = "비밀번호 확인이 필요합니다.";
  } else if (values.password.trim() !== values.confirmPassword.trim()) {
    errors.confirmPassword = "비밀번호가 서로 일치해야 합니다.";
  }

  return errors;
}

export function hasFieldErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}
