export interface BoardMember {
  id: string;
  name: string;
  position: string;
  commission: string;
  termStart: string;
  termEnd: string;
  status: "Active" | "Expired";
}

export interface Commission {
  id: string;
  name: string;
  description: string;
  head: string;
  memberCount: number;
}

export const createEmptyBoardMember = (): Omit<BoardMember, "id"> => ({
  name: "",
  position: "",
  commission: "",
  termStart: "",
  termEnd: "",
  status: "Active",
});

export const createEmptyCommission = (): Omit<Commission, "id"> => ({
  name: "",
  description: "",
  head: "",
  memberCount: 0,
});