import { db } from "./mock-db";

const delay = (ms = 400) => new Promise(res => setTimeout(res, ms));

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function mockFetch(
  url: string,
  options?: RequestInit
): Promise<Response> {
  await delay();

  const method = options?.method ?? "GET";

  if (url === "/users" && method === "GET") {
    return json(db.users);
  }

  if (url === "/users" && method === "POST") {
    const body = JSON.parse(options?.body as string);
    const newUser = { id: Date.now(), ...body };
    db.users.push(newUser);
    return json(newUser, 201);
  }

  if (url === "/patients" && method === "GET") {
    return json(db.patients);
  }

  if (url === "/alerts" && method === "GET") {
    return json(db.alerts);
  }

  if (url === "/alerts" && method === "POST") {
    const body = JSON.parse(options?.body as string);
    const newAlert = {
      id: Date.now(),
      resolved: false,
      createdAt: new Date().toISOString(),
      ...body,
    };
    db.alerts.push(newAlert);
    return json(newAlert, 201);
  }

  if (url.startsWith("/alerts/") && url.endsWith("/resolve")) {
    const id = Number(url.split("/")[2]);
    db.alerts = db.alerts.map(alert =>
      alert.id === id ? { ...alert, resolved: true } : alert
    );
    return json({ success: true });
  }

  if (url === "/logs" && method === "GET") {
    return json(db.logs);
  }

  return json({ message: "Not Found" }, 404);
}
