import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, DollarSign } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CrudDialog from "@/components/CrudDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getAll, create, update, remove, type Donation } from "@/lib/store";
import { toast } from "sonner";

const STORE_KEY = "donations";
const emptyForm: Omit<Donation, "id"> = {
  date: "",
  donorName: "",
  type: "Offering",
  amount: 0,
  notes: "",
};

const fmt = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

export default function Finance() {
  const [data, setData] = useState<Donation[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Donation | null>(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => setData(getAll<Donation>(STORE_KEY));
  useEffect(load, []);

  const total = data.reduce((s, d) => s + d.amount, 0);
  const byType = (t: string) =>
    data.filter((d) => d.type === t).reduce((s, d) => s + d.amount, 0);

  const save = () => {
    if (!form.donorName.trim() || !form.date) {
      toast.error("Donor and date required");
      return;
    }
    if (editing) update<Donation>(STORE_KEY, editing.id, form);
    else create<Donation>(STORE_KEY, form);
    toast.success("Saved");
    setDialogOpen(false);
    load();
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-gold" />
              Financial Module
            </h1>
            <p className="text-muted-foreground mt-1">
              Track donations, tithes, and offerings
            </p>
          </div>
          <Button
            onClick={() => {
              setEditing(null);
              setForm(emptyForm);
              setDialogOpen(true);
            }}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            <Plus className="h-4 w-4 mr-2" /> Record Donation
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-5 text-center">
            <p className="text-2xl font-bold text-gold">{fmt(total)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </div>
          {["Tithe", "Offering", "Special", "Building Fund"].map((t) => (
            <div
              key={t}
              className="bg-card border border-border rounded-lg p-5 text-center"
            >
              <p className="text-lg font-bold text-foreground">
                {fmt(byType(t))}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{t}</p>
            </div>
          ))}
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Date
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Donor
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Type
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  Amount
                </th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">
                  Notes
                </th>
                <th className="text-right py-3 px-4 font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data
                .sort((a, b) => b.date.localeCompare(a.date))
                .map((d) => (
                  <tr
                    key={d.id}
                    className="border-b border-border/50 hover:bg-secondary/30"
                  >
                    <td className="py-3 px-4 text-muted-foreground">
                      {d.date}
                    </td>
                    <td className="py-3 px-4 font-medium text-foreground">
                      {d.donorName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gold/10 text-gold">
                        {d.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-medium text-foreground">
                      {fmt(d.amount)}
                    </td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">
                      {d.notes}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setEditing(d);
                          setForm(d);
                          setDialogOpen(true);
                        }}
                        className="p-1.5 rounded hover:bg-secondary"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => {
                          remove(STORE_KEY, d.id);
                          toast.success("Deleted");
                          load();
                        }}
                        className="p-1.5 rounded hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <CrudDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editing ? "Edit Donation" : "Record Donation"}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div>
            <Label>Date</Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <div>
            <Label>Donor Name</Label>
            <Input
              value={form.donorName}
              onChange={(e) => setForm({ ...form, donorName: e.target.value })}
            />
          </div>
          <div>
            <Label>Type</Label>
            <Select
              value={form.type}
              onValueChange={(v) =>
                setForm({ ...form, type: v as Donation["type"] })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tithe">Tithe</SelectItem>
                <SelectItem value="Offering">Offering</SelectItem>
                <SelectItem value="Special">Special</SelectItem>
                <SelectItem value="Building Fund">Building Fund</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Amount (IDR)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({ ...form, amount: parseInt(e.target.value) || 0 })
              }
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={save}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            Save
          </Button>
        </div>
      </CrudDialog>
    </PageLayout>
  );
}
