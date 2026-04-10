export interface AccountCreatePageState {
  id: string;
  name: string;
  email: string;
  username: string;
  password: string;
  role: string;
  loading: boolean;
  errorMessage: string;
}

export const createAccountCreatePageState = (): AccountCreatePageState => ({
  id: "",
  name: "",
  email: "",
  username: "",
  password: "",
  role: "jemaat",
  loading: false,
  errorMessage: "",
});