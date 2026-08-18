import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetProductionOrders, usePatchProductionOrder } from "@/controllers/API/queries/operations";
import type { ProductionOrder } from "@/mocks/operations/production.mock";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";

const columns = [
  { key: "PENDING", label: "Pendentes", icon: "Clock" },
  { key: "IN_PROGRESS", label: "Em Preparo", icon: "Loader" },
  { key: "READY", label: "Prontos", icon: "CheckCircle2" },
  { key: "COMPLETED", label: "Completados", icon: "CheckSquare" },
];

const statusFlow: Record<string, string> = {
  PENDING: "IN_PROGRESS",
  IN_PROGRESS: "READY",
  READY: "COMPLETED",
};

export default function ProductionKanbanPage() {
  const storeOrders = useOperationsStore((s) => s.productionOrders);
  const [board, setBoard] = useState<ProductionOrder[]>(storeOrders);

  const { data: apiOrders } = useGetProductionOrders();
  const patchOrder = usePatchProductionOrder();

  const orders = apiOrders
    ? apiOrders.map((o) => ({
        id: o.id,
        productName: o.order_item_id,
        customerName: "",
        status: o.status as ProductionOrder["status"],
        currentStation: `Step ${o.current_step_index ?? 0}`,
        elapsedTime: o.started_at
          ? `${Math.floor(
              (Date.now() - new Date(o.started_at).getTime()) / 60000,
            )} min`
          : "—",
        createdAt: o.created_at,
      }))
    : board;

  const advanceOrder = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;
    const nextStatus = statusFlow[order.status];
    if (!nextStatus) return;

    if (apiOrders) {
      patchOrder.mutate({ id: orderId, action: "complete" });
    } else {
      setBoard((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: nextStatus as ProductionOrder["status"] } : o,
        ),
      );
    }
  };

  return (
    <div className="flex h-full gap-4 overflow-x-auto p-6">
      {columns.map((col) => {
        const items = orders.filter((o) => o.status === col.key);
        return (
          <div
            key={col.key}
            className="flex min-w-72 flex-1 flex-col rounded-lg border bg-muted/30 p-4"
          >
            <div className="mb-4 flex items-center gap-2">
              <ForwardedIconComponent
                name={col.icon}
                className="h-4 w-4 text-muted-foreground"
              />
              <h3 className="font-semibold">{col.label}</h3>
              <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium">
                {items.length}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              {items.map((order) => (
                <div key={order.id} className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold">{order.productName}</p>
                      {order.customerName && (
                        <p className="text-xs text-muted-foreground">{order.customerName}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{order.elapsedTime}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <ForwardedIconComponent name="Building2" className="h-3 w-3" />
                    {order.currentStation}
                  </div>
                  {col.key !== "COMPLETED" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={() => advanceOrder(order.id)}
                    >
                      <ForwardedIconComponent
                        name="ArrowRight"
                        className="mr-1 h-3 w-3"
                      />
                      {col.key === "READY" ? "Completar" : "Avançar"}
                    </Button>
                  )}
                </div>
              ))}
              {items.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Nenhum item
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
