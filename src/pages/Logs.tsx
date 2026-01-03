import { Layout } from "@/components/Layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Search } from "lucide-react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type LogEntry = {
  id: number;
  timestamp: string;
  action: string;
  details?: string;
  userId: number;
};

const MOCK_LOGS: LogEntry[] = [
  {
    id: 1,
    timestamp: "2026-01-02T10:45:12Z",
    action: "USER_LOGIN",
    details: "Admin logged in",
    userId: 1,
  },
  {
    id: 2,
    timestamp: "2026-01-02T11:02:33Z",
    action: "PATIENT_CREATED",
    details: "Patient Sara added",
    userId: 2,
  },
  {
    id: 3,
    timestamp: "2026-01-02T12:18:09Z",
    action: "ALERT_RESOLVED",
    details: "Critical alert resolved",
    userId: 1,
  },
];

export default function Logs() {
  const [logs] = useState<LogEntry[]>(MOCK_LOGS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(
    (log: LogEntry) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details &&
        log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            System Audit Logs
          </h1>
          <p className="text-muted-foreground mt-1">
            Track system activity and user actions.
          </p>
        </div>

        <Card className="shadow-lg border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Activity History
            </CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[180px]">Timestamp</TableHead>
                    <TableHead className="w-[200px]">Action</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="w-[100px]">User ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log: LogEntry) => (
                    <TableRow key={log.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className="font-medium text-primary bg-primary/5 border-primary/10"
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {log.details || "-"}
                      </TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{log.userId}
                      </TableCell>
                    </TableRow>
                  ))}

                  {filteredLogs.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={4}
                        className="text-center py-10 text-muted-foreground"
                      >
                        No logs match your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
