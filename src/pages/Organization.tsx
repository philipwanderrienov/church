import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Shield, AlertTriangle, Users2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import CrudDialog from "@/components/CrudDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { getAll, create, update, remove, type BoardMember, type Commission } from "@/lib/store";
import { toast } from "sonner";

const emptyBoard: Omit<BoardMember, "id"> = { name: "", position: "", commission: "", termStart: "", termEnd: "", status: "Active" };
const emptyCommission: Omit<Commission, "id"> = { name: "", description: "", head: "", memberCount: 0 };

export default function Organization() {
  const [boards, setBoards] = useState<BoardMember[]>([]);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [boardDialog, setBoardDialog] = useState(false);
  const [commDialog, setCommDialog] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardMember | null>(null);
  const [editingComm, setEditingComm] = useState<Commission | null>(null);
  const [boardForm, setBoardForm] = useState(emptyBoard);
  const [commForm, setCommForm] = useState(emptyCommission);

  const loadAll = () => {
    setBoards(getAll<BoardMember>("board_members"));
    setCommissions(getAll<Commission>("commissions"));
  };
  useEffect(loadAll, []);

  const isExpiringSoon = (endDate: string) => {
    const diff = new Date(endDate).getTime() - Date.now();
    return diff > 0 && diff < 180 * 24 * 60 * 60 * 1000;
  };

  const saveBoard = () => {
    if (!boardForm.name.trim()) { toast.error("Name is required"); return; }
    if (editingBoard) update<BoardMember>("board_members", editingBoard.id, boardForm);
    else create<BoardMember>("board_members", boardForm);
    toast.success("Saved");
    setBoardDialog(false);
    loadAll();
  };

  const saveComm = () => {
    if (!commForm.name.trim()) { toast.error("Name is required"); return; }
    if (editingComm) update<Commission>("commissions", editingComm.id, commForm);
    else create<Commission>("commissions", commForm);
    toast.success("Saved");
    setCommDialog(false);
    loadAll();
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4">
        <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-3 mb-2">
          <Shield className="h-8 w-8 text-gold" />
          Organizational Management
        </h1>
        <p className="text-muted-foreground mb-8">Manage board members, terms of office, and commissions</p>

        <Tabs defaultValue="boards">
          <TabsList className="mb-6">
            <TabsTrigger value="boards">Board Members</TabsTrigger>
            <TabsTrigger value="commissions">Commissions</TabsTrigger>
          </TabsList>

          <TabsContent value="boards">
            <div className="flex justify-end mb-4">
              <Button onClick={() => { setEditingBoard(null); setBoardForm(emptyBoard); setBoardDialog(true); }} className="bg-gold text-primary hover:bg-gold/90">
                <Plus className="h-4 w-4 mr-2" /> Add Board Member
              </Button>
            </div>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Position</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Commission</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Term</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.map((b) => (
                    <tr key={b.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 font-medium text-foreground">{b.name}</td>
                      <td className="py-3 px-4 text-muted-foreground">{b.position}</td>
                      <td className="py-3 px-4 text-muted-foreground">{b.commission}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs">
                        {b.termStart} — {b.termEnd}
                        {isExpiringSoon(b.termEnd) && (
                          <span className="ml-2 inline-flex items-center gap-1 text-gold">
                            <AlertTriangle className="h-3 w-3" /> Expiring soon
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${b.status === "Active" ? "bg-green-100 text-green-700" : "bg-destructive/10 text-destructive"}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => { setEditingBoard(b); setBoardForm(b); setBoardDialog(true); }} className="p-1.5 rounded hover:bg-secondary"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                        <button onClick={() => { remove("board_members", b.id); toast.success("Deleted"); loadAll(); }} className="p-1.5 rounded hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="commissions">
            <div className="flex justify-end mb-4">
              <Button onClick={() => { setEditingComm(null); setCommForm(emptyCommission); setCommDialog(true); }} className="bg-gold text-primary hover:bg-gold/90">
                <Plus className="h-4 w-4 mr-2" /> Add Commission
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commissions.map((c) => (
                <div key={c.id} className="bg-card border border-border rounded-lg p-5 hover:border-gold/30 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Users2 className="h-6 w-6 text-gold" />
                      <div>
                        <h3 className="font-display font-semibold text-foreground">{c.name}</h3>
                        <p className="text-sm text-muted-foreground">Head: {c.head}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => { setEditingComm(c); setCommForm(c); setCommDialog(true); }} className="p-2 rounded hover:bg-secondary"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                      <button onClick={() => { remove("commissions", c.id); toast.success("Deleted"); loadAll(); }} className="p-2 rounded hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive" /></button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">{c.description}</p>
                  <p className="text-xs text-gold mt-2">{c.memberCount} members</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CrudDialog open={boardDialog} onOpenChange={setBoardDialog} title={editingBoard ? "Edit Board Member" : "Add Board Member"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="sm:col-span-2"><Label>Name</Label><Input value={boardForm.name} onChange={(e) => setBoardForm({ ...boardForm, name: e.target.value })} /></div>
          <div><Label>Position</Label><Input value={boardForm.position} onChange={(e) => setBoardForm({ ...boardForm, position: e.target.value })} /></div>
          <div><Label>Commission</Label><Input value={boardForm.commission} onChange={(e) => setBoardForm({ ...boardForm, commission: e.target.value })} /></div>
          <div><Label>Term Start</Label><Input type="date" value={boardForm.termStart} onChange={(e) => setBoardForm({ ...boardForm, termStart: e.target.value })} /></div>
          <div><Label>Term End</Label><Input type="date" value={boardForm.termEnd} onChange={(e) => setBoardForm({ ...boardForm, termEnd: e.target.value })} /></div>
          <div>
            <Label>Status</Label>
            <Select value={boardForm.status} onValueChange={(v) => setBoardForm({ ...boardForm, status: v as "Active" | "Expired" })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setBoardDialog(false)}>Cancel</Button>
          <Button onClick={saveBoard} className="bg-gold text-primary hover:bg-gold/90">Save</Button>
        </div>
      </CrudDialog>

      <CrudDialog open={commDialog} onOpenChange={setCommDialog} title={editingComm ? "Edit Commission" : "Add Commission"}>
        <div className="grid grid-cols-1 gap-4 mt-4">
          <div><Label>Name</Label><Input value={commForm.name} onChange={(e) => setCommForm({ ...commForm, name: e.target.value })} /></div>
          <div><Label>Description</Label><Textarea value={commForm.description} onChange={(e) => setCommForm({ ...commForm, description: e.target.value })} /></div>
          <div><Label>Head</Label><Input value={commForm.head} onChange={(e) => setCommForm({ ...commForm, head: e.target.value })} /></div>
          <div><Label>Member Count</Label><Input type="number" value={commForm.memberCount} onChange={(e) => setCommForm({ ...commForm, memberCount: parseInt(e.target.value) || 0 })} /></div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => setCommDialog(false)}>Cancel</Button>
          <Button onClick={saveComm} className="bg-gold text-primary hover:bg-gold/90">Save</Button>
        </div>
      </CrudDialog>
    </PageLayout>
  );
}
