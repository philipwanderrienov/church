export interface Congregant {
  id: string;
  fullName: string;
  gender: "Male" | "Female";
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  maritalStatus: "Single" | "Married" | "Widowed" | "Divorced";
  familyCardNumber: string;
  classSector: string;
  rayon: string;
  joinDate: string;
}

export interface CongregationsPageState {
  search: string;
  dialogOpen: boolean;
  editing: Congregant | null;
  form: Omit<Congregant, "id">;
}

export const createEmptyCongregant = (): Omit<Congregant, "id"> => ({
  fullName: "",
  gender: "Male",
  dateOfBirth: "",
  phone: "",
  email: "",
  address: "",
  maritalStatus: "Single",
  familyCardNumber: "",
  classSector: "",
  rayon: "",
  joinDate: "",
});