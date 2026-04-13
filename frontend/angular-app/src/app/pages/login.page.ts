export interface LoginPageState {
  identifier: string;
  password: string;
  errorMessage: string;
  loading: boolean;
}

export const loginPageState = (): LoginPageState => ({
  identifier: "",
  password: "",
  errorMessage: "",
  loading: false,
});
