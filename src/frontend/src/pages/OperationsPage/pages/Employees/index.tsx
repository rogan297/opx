import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import {
  useGetEmployees,
  usePostEmployee,
} from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function EmployeesPage() {
  const storeEmployees = useOperationsStore((s) => s.employees);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    station: "",
    email: "",
    phone: "",
    start_date: "",
  });

  const { data: apiEmployees } = useGetEmployees();
  const postEmployee = usePostEmployee();

  const employees = apiEmployees ?? storeEmployees;

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCreate = () => {
    postEmployee.mutate(form);
    setOpen(false);
    setForm({ name: "", role: "", station: "", email: "", phone: "", start_date: "" });
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <ForwardedIconComponent
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar funcionários..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v)
              setForm({
                name: "",
                role: "",
                station: "",
                email: "",
                phone: "",
                start_date: "",
              });
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <ForwardedIconComponent name="Plus" className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Funcionário</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Cargo</Label>
                <Input
                  placeholder="Cargo"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Estação</Label>
                <Input
                  placeholder="Estação alocada"
                  value={form.station}
                  onChange={(e) => setForm({ ...form, station: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Telefone</Label>
                <Input
                  placeholder="(11) 99999-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleCreate}>Adicionar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            className="rounded-lg border bg-card p-4 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {emp.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{emp.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {emp.role}
                  </p>
                </div>
              </div>
              <StatusBadge
                status={"is_active" in emp && emp.is_active ? "active" : "inactive"}
              />
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p className="flex items-center gap-1">
                <ForwardedIconComponent name="Building2" className="h-3 w-3" />
                {emp.station}
              </p>
              <p className="flex items-center gap-1">
                <ForwardedIconComponent name="Mail" className="h-3 w-3" />
                {emp.email}
              </p>
              <p className="flex items-center gap-1">
                <ForwardedIconComponent name="Phone" className="h-3 w-3" />
                {emp.phone}
              </p>
              {"start_date" in emp && emp.start_date && (
                <p className="flex items-center gap-1">
                  <ForwardedIconComponent name="Calendar" className="h-3 w-3" />
                  Início: {emp.start_date}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
