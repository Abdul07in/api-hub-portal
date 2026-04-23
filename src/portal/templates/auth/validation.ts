export interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupForm {
  workEmail: string;
  company: string;
  role: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export const EMPTY_LOGIN_FORM: LoginForm = {
  email: "",
  password: "",
  rememberMe: true,
};

export const EMPTY_SIGNUP_FORM: SignupForm = {
  workEmail: "",
  company: "",
  role: "partner",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isStrongPassword(value: string) {
  return value.length >= 8 && /[A-Za-z]/.test(value) && /\d/.test(value);
}

export const validateLoginForm = (form: LoginForm): Partial<Record<keyof LoginForm, string>> => {
  const errors: Partial<Record<keyof LoginForm, string>> = {};

  if (!form.email.trim()) {
    errors.email = "Business email is required";
  } else if (!EMAIL_REGEX.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

export const validateSignupForm = (form: SignupForm): Partial<Record<keyof SignupForm, string>> => {
  const errors: Partial<Record<keyof SignupForm, string>> = {};

  if (!form.workEmail.trim()) {
    errors.workEmail = "Business email is required";
  } else if (!EMAIL_REGEX.test(form.workEmail)) {
    errors.workEmail = "Enter a valid email address";
  }

  if (!form.company.trim()) {
    errors.company = "Company name is required";
  }

  if (!form.password.trim()) {
    errors.password = "Password is required";
  } else if (!isStrongPassword(form.password)) {
    errors.password = "Use at least 8 characters with letters and numbers";
  }

  if (!form.confirmPassword.trim()) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.confirmPassword !== form.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  if (!form.agreeToTerms) {
    errors.agreeToTerms = "You must accept the portal terms to continue";
  }

  return errors;
};
