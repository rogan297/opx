import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetInventory, useGetProducts } from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function InventoryPage() {
  const storeStock = useOperationsStore((s) => s.stock);
  const setStock = useOperationsStore((s) => s.setStock);
  const [search, setSearch] = useState("");

  const { data: apiInventory } = useGetInventory();
  const { data: apiProducts } = useGetProducts();

  const items = apiInventory && apiProducts
    ? apiInventory.map((inv) => {
        const product = apiProducts.find((p) => p.id === inv.product_id);
        const ratio = inv.min_threshold ? inv.quantity_available / inv.min_threshold : 999;
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

  const filtered = items.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const criticalCount = items.filter((s) => s.status === "critical").length;
  const turnover =
    items.length > 0
      ? (items.reduce((a, s) => a + s.quantityAvailable, 0) / items.length).toFixed(1)
      : "0";
  const rawItems = items.filter((s) => s.unit === "kg" || s.unit === "L");

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center gap-4">
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Itens Críticos</p>
          <p className="text-2xl font-bold text-red-500">{criticalCount}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Stock Turnover</p>
          <p className="text-2xl font-bold">{turnover}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">Insumos Totais</p>
          <p className="text-2xl font-bold">{rawItems.length}</p>
        </div>
      </div>

      <div className="relative w-72">
        <ForwardedIconComponent
          name="Search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar insumos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Insumo</TableHead>
              <TableHead>Estoque Atual</TableHead>
              <TableHead>Unidade</TableHead>
              <TableHead>Threshold Mínimo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id}>
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
                <TableCell>{item.minThreshold}</TableCell>
                <TableCell>
                  <StatusBadge status={item.status} />
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Adjust</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
