import { Layout } from "@/components/Layout";
import { StatCard } from "@/components/StatCard";
import { Users, AlertTriangle, HeartPulse, Activity, Bell } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

/* ================= TYPES ================= */

type DashboardStats = {
  totalPatients: number;
  activeAlerts: number;
  totalUsers: number;
  devicesOnline: number;
  roleDistribution: {
    doctor: number;
    nurse: number;
    admin: number;
  };
};

type LogEntry = {
  id: number;
  action: string;
  details?: string;
  timestamp: string;
};

/* ================= MOCK DATA ================= */

const MOCK_STATS: DashboardStats = {
  totalPatients: 128,
  activeAlerts: 2,
  totalUsers: 24,
  devicesOnline: 18,
  roleDistribution: {
    doctor: 10,
    nurse: 10,
    admin: 4,
  },
};

const MOCK_LOGS: LogEntry[] = [
  {
    id: 1,
    action: "ALERT_RESOLVED",
    details: "Critical alert resolved",
    timestamp: "2026-01-02T10:22:00Z",
  },
  {
    id: 2,
    action: "PATIENT_CREATED",
    details: "New patient admitted",
    timestamp: "2026-01-02T09:45:00Z",
  },
  {
    id: 3,
    action: "USER_LOGIN",
    details: "Admin logged in",
    timestamp: "2026-01-02T09:10:00Z",
  },
];

/* ================= CHART DATA ================= */

const COLORS = ["#0C2F5A", "#8BC4FF", "#4E6772", "#FF8042"];

const patientAdmissions = [
  { name: "Mon", admissions: 4 },
  { name: "Tue", admissions: 7 },
  { name: "Wed", admissions: 5 },
  { name: "Thu", admissions: 12 },
  { name: "Fri", admissions: 9 },
  { name: "Sat", admissions: 6 },
  { name: "Sun", admissions: 8 },
];

export default function Dashboard() {
  const stats = MOCK_STATS;
  const logs = MOCK_LOGS;

  const roleData = [
    { name: "Doctors", value: stats.roleDistribution.doctor },
    { name: "Nurses", value: stats.roleDistribution.nurse },
    { name: "Admins", value: stats.roleDistribution.admin },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground mt-1">
              Real-time monitoring and hospital administration summary.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white px-4 py-2 rounded-lg border border-border shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            System Operational
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            icon={Users}
            trend="+12%"
            trendUp
          />
          <StatCard
            title="Active Alerts"
            value={stats.activeAlerts}
            icon={AlertTriangle}
            urgent={stats.activeAlerts > 0}
            className={stats.activeAlerts > 0 ? "animate-pulse" : ""}
          />
          <StatCard
            title="Staff Members"
            value={stats.totalUsers}
            icon={HeartPulse}
          />
          <StatCard
            title="Devices Online"
            value={stats.devicesOnline}
            icon={Activity}
            trend="+100%"
            trendUp
          />
        </div>

        {/* Charts */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Patient Admissions (Last 7 Days)</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={patientAdmissions}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="admissions"
                    stroke="#0C2F5A"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Staff Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleData}
                    innerRadius={60}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {roleData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent System Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                      <Bell className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{log.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.details}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {format(new Date(log.timestamp), "MMM d, HH:mm")}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
