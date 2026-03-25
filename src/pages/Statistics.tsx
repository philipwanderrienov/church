import { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import PageLayout from "@/components/PageLayout";
import { getAll, type Congregant } from "@/lib/store";

const COLORS = ["hsl(38, 75%, 55%)", "hsl(220, 25%, 35%)", "hsl(38, 60%, 70%)", "hsl(220, 20%, 55%)", "hsl(0, 72%, 51%)"];

function getAge(dob: string) {
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
}

export default function Statistics() {
  const [data, setData] = useState<Congregant[]>([]);
  useEffect(() => setData(getAll<Congregant>("congregants")), []);

  const genderData = [
    { name: "Male", value: data.filter((c) => c.gender === "Male").length },
    { name: "Female", value: data.filter((c) => c.gender === "Female").length },
  ];

  const maritalData = [
    { name: "Single", value: data.filter((c) => c.maritalStatus === "Single").length },
    { name: "Married", value: data.filter((c) => c.maritalStatus === "Married").length },
    { name: "Widowed", value: data.filter((c) => c.maritalStatus === "Widowed").length },
    { name: "Divorced", value: data.filter((c) => c.maritalStatus === "Divorced").length },
  ].filter((d) => d.value > 0);

  const ageGroups = [
    { range: "0-12", min: 0, max: 12 },
    { range: "13-17", min: 13, max: 17 },
    { range: "18-25", min: 18, max: 25 },
    { range: "26-40", min: 26, max: 40 },
    { range: "41-60", min: 41, max: 60 },
    { range: "60+", min: 61, max: 200 },
  ];

  const ageData = ageGroups.map((g) => ({
    range: g.range,
    count: data.filter((c) => {
      const age = getAge(c.dateOfBirth);
      return age >= g.min && age <= g.max;
    }).length,
  }));

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3 mb-2">
          <BarChart3 className="h-8 w-8 text-gold" />
          Statistics Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">Visual overview of congregation demographics</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-gold">{data.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Total Members</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-gold">{new Set(data.map(c => c.familyCardNumber)).size}</p>
            <p className="text-sm text-muted-foreground mt-1">Family Cards</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-gold">{new Set(data.map(c => c.classSector)).size}</p>
            <p className="text-sm text-muted-foreground mt-1">Sectors</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-display text-lg font-semibold mb-4 text-foreground">Members by Age Group</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(40, 15%, 85%)" />
                <XAxis dataKey="range" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(38, 75%, 55%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-display text-lg font-semibold mb-4 text-foreground">Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={genderData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {genderData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
            <h3 className="font-display text-lg font-semibold mb-4 text-foreground">Marital Status</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={maritalData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label>
                  {maritalData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
