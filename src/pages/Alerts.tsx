import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2, Siren } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

/* ================= TYPES ================= */

type AlertSeverity = "low" | "medium" | "high" | "critical";
type AlertType = "medical" | "system" | "device";

type Alert = {
  id: number;
  type: AlertType;
  severity: AlertSeverity;
  message: string;
  createdAt: string;
  isResolved: boolean;
  patientId?: number;
};

type Patient = {
  id: number;
  name: string;
  roomNumber: string;
};

const MOCK_PATIENTS: Patient[] = [
  { id: 1, name: "Yousef Amin", roomNumber: "101-A" },
  { id: 2, name: "Sara Maharmeh", roomNumber: "202-B" },
];

const INITIAL_ALERTS: Alert[] = [
  {
    id: 1,
    type: "medical",
    severity: "critical",
    message: "Cardiac monitor triggered emergency alert",
    createdAt: "2026-01-02T10:20:00Z",
    isResolved: false,
    patientId: 1,
  },
  {
    id: 2,
    type: "system",
    severity: "medium",
    message: "Backup generator test completed",
    createdAt: "2026-01-01T18:45:00Z",
    isResolved: true,
  },
];

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [patients] = useState<Patient[]>(MOCK_PATIENTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "resolved">("active");

  const [formData, setFormData] = useState<{
    patientId: string;
    type: AlertType;
    severity: AlertSeverity;
    message: string;
  }>({
    patientId: "",
    type: "medical",
    severity: "medium",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newAlert: Alert = {
      id: alerts.length + 1,
      type: formData.type,
      severity: formData.severity,
      message: formData.message,
      createdAt: new Date().toISOString(),
      isResolved: false,
      patientId: formData.patientId ? parseInt(formData.patientId) : undefined,
    };

    setAlerts((prev) => [newAlert, ...prev]);
    setIsDialogOpen(false);
    setFormData({
      patientId: "",
      type: "medical",
      severity: "medium",
      message: "",
    });
  };

  const handleResolve = (id: number) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a))
    );
  };

  const filteredAlerts = alerts
    .filter((alert) => {
      if (filter === "active") return !alert.isResolved;
      if (filter === "resolved") return alert.isResolved;
      return true;
    })
    .sort((a, b) => {
      if (!a.isResolved && b.isResolved) return -1;
      if (a.isResolved && !b.isResolved) return 1;
      if (a.severity === "critical" && b.severity !== "critical") return -1;
      if (a.severity !== "critical" && b.severity === "critical") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary">System Alerts</h1>
            <p className="text-muted-foreground mt-1">
              Real-time notifications and emergency warnings.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Siren className="w-4 h-4 mr-2" /> Broadcast Alert
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create System Alert</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Alert Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(val) =>
                      setFormData({ ...formData, type: val as AlertType })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                      <SelectItem value="device">Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Severity</Label>
                  <Select
                    value={formData.severity}
                    onValueChange={(val) =>
                      setFormData({
                        ...formData,
                        severity: val as AlertSeverity,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Patient (Optional)</Label>
                  <Select
                    value={formData.patientId}
                    onValueChange={(val) =>
                      setFormData({ ...formData, patientId: val })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.name} (Room {p.roomNumber})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Broadcast Alert
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {["active", "resolved", "all"].map((f) => (
            <Button
              key={f}
              size="sm"
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f as any)}
              className="rounded-full"
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        {/* Alerts */}
        <div className="space-y-4">
          {filteredAlerts.map((alert) => (
            <Card
              key={alert.id}
              className={cn(
                alert.isResolved
                  ? "opacity-60 bg-muted/20"
                  : alert.severity === "critical"
                  ? "bg-red-50/50 border-red-200"
                  : "bg-white"
              )}
            >
              <CardContent className="p-5 flex justify-between">
                <div className="flex gap-4">
                  <div
                    className={cn(
                      "p-3 rounded-full",
                      alert.isResolved
                        ? "bg-gray-100"
                        : alert.severity === "critical"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                    )}
                  >
                    {alert.isResolved ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <AlertTriangle className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <Badge className="uppercase text-xs font-bold">
                      {alert.type}
                    </Badge>
                    <p className="font-semibold mt-1">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(alert.createdAt), "PPp")}
                    </p>
                  </div>
                </div>

                {!alert.isResolved && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleResolve(alert.id)}
                  >
                    Mark Resolved
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
