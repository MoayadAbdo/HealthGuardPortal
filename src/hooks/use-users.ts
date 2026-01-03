import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type User = {
  id: number;
  username: string;
  name: string;
  role: "admin" | "doctor" | "nurse";
  status: "active" | "inactive";
};

export type CreateUserInput = {
  username: string;
  name: string;
  role: "admin" | "doctor" | "nurse";
};

// ---- mock in-memory db ----
let USERS: User[] = [
  { id: 1, username: "moayad", name: "Moayad Abdo", role: "admin", status: "active" },
  { id: 2, username: "sara", name: "Sara Maharmeh", role: "doctor", status: "active" },
  { id: 3, username: "mohammed", name: "Mohammed Aljabiri", role: "doctor", status: "active" },
  { id: 4, username: "hashem", name: "Hashem Shatat", role: "doctor", status: "active" },
    { id: 5, username: "leen", name: "Leen Shaheen", role: "nurse", status: "active" },
];

function delay(ms = 200) {
  return new Promise((r) => setTimeout(r, ms));
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      await delay();
      return USERS;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateUserInput) => {
      await delay();

      const exists = USERS.some(
        (u) => u.username.toLowerCase() === data.username.toLowerCase()
      );
      if (exists) {
        throw new Error("Username already exists");
      }

      const newUser: User = {
        id: USERS.length ? Math.max(...USERS.map((u) => u.id)) + 1 : 1,
        username: data.username,
        name: data.name,
        role: data.role,
        status: "active",
      };

      USERS = [newUser, ...USERS];
      return newUser;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}
