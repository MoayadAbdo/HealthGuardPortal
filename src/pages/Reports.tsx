import { Layout } from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown, BarChart3, PieChart, TrendingUp } from "lucide-react";

export default function Reports() {
  const reportTypes = [
    {
      title: "Weekly Patient Statistics",
      desc: "Admissions, discharges, and occupancy rates.",
      icon: BarChart3,
    },
    {
      title: "Staff Performance Review",
      desc: "Shift coverage, task completion, and metrics.",
      icon: TrendingUp,
    },
    {
      title: "Incident Summary Report",
      desc: "Summary of critical alerts and system failures.",
      icon: PieChart,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Export system data and generate insights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reportTypes.map((report, i) => (
            <Card
              key={i}
              className="hover:shadow-lg transition-all border-border/50"
            >
              <CardHeader>
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary mb-2">
                  <report.icon className="w-6 h-6" />
                </div>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>{report.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full gap-2">
                  <FileDown className="w-4 h-4" /> Download PDF
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-12 text-center border-2 border-dashed border-border/50 rounded-xl bg-muted/20">
          <p className="text-muted-foreground">
            More advanced custom report builder coming soon.
          </p>
        </div>
      </div>
    </Layout>
  );
}
