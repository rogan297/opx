import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import {
  useGetInventory,
  useGetProducts,
  useGetStockMovements,
  usePostStockMovement,
} from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function StockPage() {
  const storeStock = useOperationsStore((s) => s.stock);
  const storeMovements = useOperationsStore((s) => s.stockMovements);
  const [search, setSearch] = useState("");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [moveOpen, setMoveOpen] = useState(false);
  const [moveForm, setMoveForm] = useState({
    type: "INPUT",
    quantity: 0,
    reason: "PURCHASE",
  });

  const { data: apiInventory } = useGetInventory();
  const { data: apiProducts } = useGetProducts();
  const { data: apiMovements } = useGetStockMovements({
    inventoryId: selectedItemId ?? undefined,
  });
  const postMovement = usePostStockMovement();

  const stock = apiInventory && apiProducts
    ? apiInventory.map((inv) => {
        const product = apiProducts.find((p) => p.id === inv.product_id);
        const ratio = inv.min_threshold
          ? inv.quantity_available / inv.min_threshold
          : 999;
        const status: "critical" | "alert" | "stable" =
          ratio <= 1 ? "critical" : ratio <= 2 ? "alert" : "stable";
        return {
          id: inv.id,
          productId: inv.product_id,
          productName: product?.name ?? "Desconhecido",
          quantityAvailable: inv.quantity_available,
          minThreshold: inv.min_threshold ?? 0,
          unit: inv.unit ?? "un",
          status,
          lastUpdated: "",
        };
      })
    : storeStock;

  const filtered = stock.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const selectedItem = stock.find((item) => item.id === selectedItemId);
  const movements = selectedItemId
    ? apiMovements
      ? apiMovements.map((m) => ({
          id: m.id,
          inventoryId: m.inventory_id,
          type: (m.quantity > 0 ? "INPUT" : "OUTPUT") as "INPUT" | "OUTPUT",
          reason: m.reason ?? "unknown",
          quantity: m.quantity,
          createdAt: m.created_at,
        }))
      : storeMovements[selectedItemId] || []
    : [];

  const handleCreateMovement = () => {
    if (!selectedItemId) return;
    postMovement.mutate({
      inventory_id: selectedItemId,
      quantity: moveForm.quantity,
      type: moveForm.type,
      reason: moveForm.reason,
    });
    setMoveOpen(false);
    setMoveForm({ type: "INPUT", quantity: 0, reason: "PURCHASE" });
  };

  return (
    <div className="flex h-full gap-4 p-6">
      <div className="flex flex-1 flex-col gap-4">
        <div className="relative w-72">
          <ForwardedIconComponent
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar no estoque..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantidade</TableHead>
                <TableHead>Unidade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow
                  key={item.id}
                  className={`cursor-pointer ${selectedItemId === item.id ? "bg-muted/50" : ""}`}
                  onClick={() => setSelectedItemId(item.id)}
                >
                  <TableCell className="font-medium">{item.productName}</TableCell>
                  <TableCell>
                    <span
                      className={`font-mono font-bold ${
                        item.quantityAvailable <= item.minThreshold
                          ? "text-red-500"
                          : item.quantityAvailable < item.minThreshold * 2
                            ? "text-amber-500"
                            : ""
                      }`}
                    >
                      {item.quantityAvailable}
                    </span>
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <StatusBadge status={item.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.lastUpdated}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <ForwardedIconComponent name="Move" className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedItem && (
        <div className="w-80 shrink-0 rounded-lg border bg-card p-4">
          <div className="mb-4">
            <h3 className="font-semibold">{selectedItem.productName}</h3>
            <p className="text-xs text-muted-foreground">
              ID: {selectedItem.id}
            </p>
          </div>
          <div className="mb-4">
            <p className="mb-1 text-sm text-muted-foreground">Nível de Estoque</p>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full transition-all ${
                  selectedItem.quantityAvailable <= selectedItem.minThreshold
                    ? "bg-red-500"
                    : selectedItem.quantityAvailable < selectedItem.minThreshold * 2
                      ? "bg-amber-500"
                      : "bg-emerald-500"
                }`}
                style={{
                  width: `${Math.min((selectedItem.quantityAvailable / (selectedItem.minThreshold * 3)) * 100, 100)}%`,
                }}
              />
            </div>
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>Min: {selectedItem.minThreshold}</span>
              <span>Atual: {selectedItem.quantityAvailable}</span>
            </div>
          </div>
          <div className="mb-4 flex gap-2">
            <Dialog
              open={moveOpen}
              onOpenChange={(v) => {
                setMoveOpen(v);
                if (!v)
                  setMoveForm({
                    type: "INPUT",
                    quantity: 0,
                    reason: "PURCHASE",
                  });
              }}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex-1">
                  Movimentar
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Movimentação de Estoque</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Tipo</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={moveForm.type}
                      onChange={(e) =>
                        setMoveForm({ ...moveForm, type: e.target.value })
                      }
                    >
                      <option>INPUT</option>
                      <option>OUTPUT</option>
                      <option>PRODUCTION_INPUT</option>
                      <option>PRODUCTION_OUTPUT</option>
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={moveForm.quantity}
                      onChange={(e) =>
                        setMoveForm({
                          ...moveForm,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label>Motivo</Label>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={moveForm.reason}
                      onChange={(e) =>
                        setMoveForm({ ...moveForm, reason: e.target.value })
                      }
                    >
                      <option>PURCHASE</option>
                      <option>SALE</option>
                      <option>WASTE</option>
                      <option>ADJUSTMENT</option>
                      <option>PRODUCTION_FINISH</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setMoveOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleCreateMovement}>Confirmar</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="flex-1">
                  Ajustar Limite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurar Alertas</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Threshold Mínimo</Label>
                    <Input
                      type="number"
                      defaultValue={selectedItem.minThreshold}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Salvar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-muted-foreground">
              Movimentações Recentes
            </h4>
            {movements.length === 0 ? (
              <p className="text-xs text-muted-foreground">
                Nenhuma movimentação
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {movements.map((m) => (
                  <div
                    key={m.id}
                    className="rounded-md bg-muted/50 p-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={
                          m.type === "INPUT" || m.type === "PRODUCTION_OUTPUT"
                            ? "text-emerald-500"
                            : "text-red-500"
                        }
                      >
                        {m.type} ({m.quantity > 0 ? "+" : ""}
                        {m.quantity})
                      </span>
                      <span className="text-muted-foreground">
                        {m.createdAt}
                      </span>
                    </div>
                    <p className="mt-0.5 text-muted-foreground">{m.reason}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
