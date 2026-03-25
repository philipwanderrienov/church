import { useState, useEffect } from "react";
import { Plus, Trash2, HandHeart, Check } from "lucide-react";
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
import {
  getAll,
  create,
  update,
  remove,
  type PrayerRequest,
} from "@/lib/store";
import { toast } from "sonner";

const STORE_KEY = "prayer_requests";
const emptyForm: Omit<PrayerRequest, "id"> = {
  name: "",
  date: "",
  category: "General",
  request: "",
  status: "Pending",
};

export default function PrayerRequests() {
  const [data, setData] = useState<PrayerRequest[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const load = () => setData(getAll<PrayerRequest>(STORE_KEY));
  useEffect(load, []);

  const save = () => {
    if (!form.name.trim() || !form.request.trim()) {
      toast.error("Name and prayer request required");
      return;
    }
    create<PrayerRequest>(STORE_KEY, {
      ...form,
      date: new Date().toISOString().split("T")[0],
    });
    toast.success("Prayer request submitted. God bless you!");
    setDialogOpen(false);
    setForm(emptyForm);
    load();
  };

  const updateStatus = (id: string, status: PrayerRequest["status"]) => {
    update<PrayerRequest>(STORE_KEY, id, { status });
    toast.success(`Marked as ${status}`);
    load();
  };

  const statusColor = (s: string) => {
    if (s === "Pending") return "bg-gold/10 text-gold";
    if (s === "Prayed") return "bg-blue-100 text-blue-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3">
              <HandHeart className="h-8 w-8 text-gold" />
              Prayer Requests
            </h1>
            <p className="text-muted-foreground mt-1">
              Submit your prayer points and let the pastors intercede for you
            </p>
          </div>
          <Button
            onClick={() => {
              setForm(emptyForm);
              setDialogOpen(true);
            }}
            className="bg-gold text-primary hover:bg-gold/90"
          >
            <Plus className="h-4 w-4 mr-2" /> Submit Prayer Request
          </Button>
        </div>

        <div className="space-y-4 max-w-3xl">
          {data
            .sort((a, b) => b.date.localeCompare(a.date))
            .map((p) => (
              <div
                key={p.id}
                className="bg-card border border-border rounded-lg p-5 hover:border-gold/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {p.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {p.date} · {p.category}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor(p.status)}`}
                  >
                    {p.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground italic mb-4">
                  "{p.request}"
                </p>
                <div className="flex gap-2">
                  {p.status === "Pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(p.id, "Prayed")}
                      className="text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" /> Mark as Prayed
                    </Button>
                  )}
                  {p.status === "Prayed" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(p.id, "Answered")}
                      className="text-xs"
                    >
                      <Check className="h-3 w-3 mr-1" /> Mark as Answered
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      remove(STORE_KEY, p.id);
                      toast.success("Deleted");
                      load();
                    }}
                    className="text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3 mr-1" /> Delete
                  </Button>
                </div>
              </div>
            ))}
          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-12">
              No prayer requests yet. Be the first to share your prayer needs.
            </p>
          )}
        </div>
      </div>

      <CrudDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Submit Prayer Request"
      >
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div>
            <Label>Your Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select
              value={form.category}
              onValueChange={(v) => setForm({ ...form, category: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
                <SelectItem value="Spiritual">Spiritual Growth</SelectItem>
                <SelectItem value="Thanksgiving">Thanksgiving</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Prayer Request</Label>
            <Textarea
              rows={4}
              value={form.request}
              onChange={(e) => setForm({ ...form, request: e.target.value })}
              placeholder="Share what you'd like us to pray for..."
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
            Submit
          </Button>
        </div>
      </CrudDialog>
    </PageLayout>
  );
}
