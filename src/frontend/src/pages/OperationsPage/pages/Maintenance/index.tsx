import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetAssets } from "@/controllers/API/queries/operations";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
  const storeAssets = useOperationsStore((s) => s.assets);
  const [search, setSearch] = useState("");

  const { data: apiAssets } = useGetAssets();

  const assets = apiAssets ?? storeAssets;

  const filtered = assets.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const avgUptime =
    assets.length > 0
      ? (
          assets.reduce(
            (a, s) => a + ("uptime_pct" in s ? s.uptime_pct : s.uptimePct),
            0,
          ) / assets.length
        ).toFixed(1)
      : "0";
  const criticalItems = assets.filter((a) => {
    const health = "health_pct" in a ? a.health_pct : a.healthPct;
    return health < 60;
  }).length;
  const totalHours = assets
    .reduce(
      (a, s) =>
        a + ("hours_operated" in s ? s.hours_operated : s.hoursOperated),
      0,
    )
    .toLocaleString();
  const totalEnergy = assets
    .reduce(
      (a, s) =>
        a +
        ("energy_consumption" in s
          ? s.energy_consumption
          : s.energyConsumption),
      0,
    )
    .toLocaleString();

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Uptime Médio</p>
          <p className="text-2xl font-bold text-emerald-500">{avgUptime}%</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Itens Críticos</p>
          <p className="text-2xl font-bold text-red-500">{criticalItems}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Horas de Operação</p>
          <p className="text-2xl font-bold">{totalHours}h</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-xs text-muted-foreground">Consumo de Energia</p>
          <p className="text-2xl font-bold">{totalEnergy} kWh</p>
        </div>
      </div>

      <div className="relative w-72">
        <ForwardedIconComponent
          name="Search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar ativos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((asset) => {
          const health =
            "health_pct" in asset ? asset.health_pct : asset.healthPct;
          const category = asset.category;
          const lastService =
            "last_service" in asset
              ? asset.last_service
              : asset.lastService;
          const nextService =
            "next_service" in asset
              ? asset.next_service
              : asset.nextService;
          return (
            <div
              key={asset.id}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <h3 className="font-semibold">{asset.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {category}
                </span>
              </div>
              <div className="mb-3">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Saúde</span>
                  <span
                    className={`font-bold ${
                      health >= 80
                        ? "text-emerald-500"
                        : health >= 60
                          ? "text-amber-500"
                          : "text-red-500"
                    }`}
                  >
                    {health}%
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full transition-all ${
                      health >= 80
                        ? "bg-emerald-500"
                        : health >= 60
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${health}%` }}
                  />
                </div>
              </div>
              <div className="mb-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <p>Último serviço</p>
                  <p className="font-medium text-foreground">
                    {lastService}
                  </p>
                </div>
                <div>
                  <p>Próximo serviço</p>
                  <p className="font-medium text-foreground">
                    {nextService}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <ForwardedIconComponent
                    name="AlertTriangle"
                    className="mr-1 h-3 w-3"
                  />
                  Log Errors
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <ForwardedIconComponent
                    name="Ticket"
                    className="mr-1 h-3 w-3"
                  />
                  Open Ticket
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
