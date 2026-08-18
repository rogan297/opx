import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { useStartNewFlow } from "@/components/core/flowBuilderWelcome/hooks/use-start-new-flow";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFlowsManagerStore from "@/stores/flowsManagerStore";
import StatusBadge from "../../components/StatusBadge";

export default function WorkflowsPage() {
  const flows = useFlowsManagerStore((s) => s.flows) ?? [];
  const navigate = useNavigate();
  const startNewFlow = useStartNewFlow();
  const [search, setSearch] = useState("");

  const filtered = flows.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <ForwardedIconComponent
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar workflows..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => startNewFlow()}>
          <ForwardedIconComponent name="Plus" className="mr-2 h-4 w-4" />
          Novo Workflow
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Componentes</TableHead>
              <TableHead>Atualização</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-muted-foreground"
                >
                  Nenhum workflow encontrado. Crie um novo workflow para
                  começar.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((flow) => (
                <TableRow key={flow.id}>
                  <TableCell className="font-medium">{flow.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {flow.description || "—"}
                  </TableCell>
                  <TableCell>
                    <StatusBadge
                      status={flow.is_component ? "active" : "draft"}
                    />
                  </TableCell>
                  <TableCell>{flow.data?.nodes?.length ?? 0}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {flow.updated_at
                      ? new Date(flow.updated_at).toLocaleDateString("pt-BR")
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/flow/${flow.id}`)}
                    >
                      <ForwardedIconComponent
                        name="Eye"
                        className="mr-1 h-3 w-3"
                      />
                      Abrir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
