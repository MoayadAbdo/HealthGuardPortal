import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ---------- Types ---------- */

export type PatientStatus = "stable" | "critical" | "recovering";

export type Patient = {
  id: number;
  name: string;
  dob: string;
  roomNumber: string;
  condition: string;
  status: PatientStatus;
};

/* ---------- Mock DB ---------- */

let PATIENTS: Patient[] = [
  {
    id: 1,
    name: "John Doe",
    dob: "1985-04-12",
    roomNumber: "101-A",
    condition: "Post-surgery recovery",
    status: "stable",
  },
  {
    id: 2,
    name: "Sara Khalil",
    dob: "1978-09-23",
    roomNumber: "202-B",
    condition: "Cardiac monitoring",
    status: "critical",
  },
  {
    id: 3,
    name: "Ahmad Nasser",
    dob: "1992-01-05",
    roomNumber: "305-C",
    condition: "Respiratory infection",
    status: "recovering",
  },
];

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/* ---------- Hooks ---------- */

export function usePatients() {
  return useQuery<Patient[]>({
    queryKey: ["patients"],
    queryFn: async () => {
      await delay();
      return PATIENTS;
    },
  });
}

export function useCreatePatient() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Patient, "id">) => {
      await delay();

      const newPatient: Patient = {
        id: PATIENTS.length
          ? Math.max(...PATIENTS.map((p) => p.id)) + 1
          : 1,
        ...data,
      };

      PATIENTS = [newPatient, ...PATIENTS];
      return newPatient;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
    },
  });
}