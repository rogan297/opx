import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetStations, usePostStation } from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StationsPage() {
  const storeStations = useOperationsStore((s) => s.stations);
  const setStations = useOperationsStore((s) => s.setStations);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", responsible: "" });

  const { data: apiStations } = useGetStations();
  const postStation = usePostStation();

  const stations = apiStations
    ? apiStations.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description ?? "",
        responsible: s.responsible ?? "",
        isActive: true,
        currentLoad: 0,
      }))
    : storeStations;

  const handleCreate = () => {
    postStation.mutate(form);
    setOpen(false);
    setForm({ name: "", description: "", responsible: "" });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Estações de Trabalho</h3>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) setForm({ name: "", description: "", responsible: "" });
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <ForwardedIconComponent name="Plus" className="mr-2 h-4 w-4" />
              Nova Estação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Estação</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome da estação"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Input
                  placeholder="Descrição"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Responsável</Label>
                <Input
                  placeholder="Nome do responsável"
                  value={form.responsible}
                  onChange={(e) => setForm({ ...form, responsible: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
              <Button onClick={handleCreate}>Criar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stations.map((station) => (
          <div key={station.id} className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{station.name}</h3>
                <p className="text-xs text-muted-foreground">{station.description}</p>
              </div>
              <StatusBadge status={station.isActive ? "active" : "inactive"} />
            </div>
            <div className="mb-3 space-y-1 text-xs text-muted-foreground">
              <p>Responsável: {station.responsible || "—"}</p>
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Carga</span>
                <span className={station.currentLoad > 80 ? "text-red-500" : station.currentLoad > 50 ? "text-amber-500" : "text-emerald-500"}>
                  {station.currentLoad}%
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className={`h-full rounded-full transition-all ${
                    station.currentLoad > 80 ? "bg-red-500" : station.currentLoad > 50 ? "bg-amber-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${station.currentLoad}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
