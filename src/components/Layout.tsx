import { ReactNode } from "react";
import { Link } from "wouter";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-background">
      <aside className="w-64 bg-primary text-white p-6 hidden md:block">
        <h2 className="text-xl font-bold mb-6">HealthGuard</h2>

        <nav className="space-y-2">
          {[
            ["Dashboard", "/dashboard"],
            ["Patients", "/patients"],
            ["Alerts", "/alerts"],
            ["Users", "/users"],
            ["Logs", "/logs"],
            ["Reports", "/reports"],
            ["Settings", "/settings"],
          ].map(([label, href]) => (
            <Link key={href} href={href}>
              <a className="block px-3 py-2 rounded-lg hover:bg-white/10 transition">
                {label}
              </a>
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
