import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  User,
  FileText,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type PatientStatus = "stable" | "critical" | "recovering";

type Patient = {
  id: number;
  name: string;
  dob: string;
  roomNumber: string;
  condition: string;
  status: PatientStatus;
};

const INITIAL_PATIENTS: Patient[] = [
  {
    id: 1,
    name: "Yousef Amin",
    dob: "1985-04-12",
    roomNumber: "101-A",
    condition: "Post-surgery recovery",
    status: "stable",
  },
  {
    id: 2,
    name: "Sara Maharmeh",
    dob: "1992-09-21",
    roomNumber: "202-B",
    condition: "Cardiac monitoring",
    status: "critical",
  },
];

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState<{
    name: string;
    dob: string;
    roomNumber: string;
    condition: string;
    status: PatientStatus;
  }>({
    name: "",
    dob: "",
    roomNumber: "",
    condition: "",
    status: "stable",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPatient: Patient = {
      id: patients.length + 1,
      ...formData,
    };

    setPatients((prev) => [newPatient, ...prev]);
    setIsDialogOpen(false);

    setFormData({
      name: "",
      dob: "",
      roomNumber: "",
      condition: "",
      status: "stable",
    });
  };

  const filteredPatients = patients.filter(
    (p: Patient) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case "critical":
        return "bg-red-100 text-red-700 border-red-200";
      case "stable":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "recovering":
        return "bg-amber-100 text-amber-700 border-amber-200";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">
              Patient Management
            </h1>
            <p className="text-muted-foreground mt-1">
              View and manage patient records and status.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" /> Register Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData({ ...formData, dob: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Room Number</Label>
                    <Input
                      value={formData.roomNumber}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          roomNumber: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label>Medical Condition</Label>
                    <Input
                      value={formData.condition}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          condition: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2 col-span-2">
                    <Label>Current Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(val) =>
                        setFormData({
                          ...formData,
                          status: val as PatientStatus,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stable">Stable</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="recovering">Recovering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Register Patient</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or room..."
            className="pl-9 bg-white border-border shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPatients.map((patient: Patient) => (
            <Card key={patient.id}>
              <div
                className={cn(
                  "h-1 w-full",
                  patient.status === "critical"
                    ? "bg-destructive"
                    : patient.status === "stable"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                )}
              />
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/5 rounded-full text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{patient.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        Room {patient.roomNumber}
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={cn("border", getStatusColor(patient.status))}
                  >
                    {patient.status}
                  </Badge>
                </div>

                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    {patient.condition}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Activity className="w-4 h-4" />
                    DOB: {patient.dob}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredPatients.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground">
              <AlertCircle className="w-8 h-8 opacity-50 mb-2" />
              No patients found matching your search.
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
