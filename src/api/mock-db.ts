export type User = {
  id: number;
  name: string;
  email: string;
  role: "admin" | "doctor" | "caregiver";
};

export type Patient = {
  id: number;
  name: string;
  age: number;
  condition: string;
};

export type Alert = {
  id: number;
  patientId: number;
  message: string;
  level: "info" | "warning" | "critical";
  resolved: boolean;
  createdAt: string;
};

export type Log = {
  id: number;
  message: string;
  level: "info" | "warning" | "error";
  createdAt: string;
};


export const db = {
  users: [
    {
      id: 1,
      name: "Sara Maharmeh",
      email: "sara@healthguard.com",
      role: "admin",
    },
    {
      id: 2,
      name: "Moayad Abdo",
      email: "moayad@healthguard.com",
      role: "doctor",
    },
  ] as User[],

  patients: [
    {
      id: 1,
      name: "Ahmad Saleh",
      age: 68,
      condition: "Diabetes",
    },
    {
      id: 2,
      name: "Rania Khaled",
      age: 55,
      condition: "High blood pressure",
    },
  ] as Patient[],

  alerts: [
    {
      id: 1,
      patientId: 1,
      message: "High blood pressure detected",
      level: "warning",
      resolved: false,
      createdAt: new Date().toISOString(),
    },
  ] as Alert[],

  logs: [
    {
      id: 1,
      message: "System initialized",
      level: "info",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      message: "Doctor logged in",
      level: "info",
      createdAt: new Date().toISOString(),
    },
  ] as Log[],
};
