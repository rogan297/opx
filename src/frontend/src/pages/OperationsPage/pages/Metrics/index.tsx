import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import {
  useGetAssets,
  useGetStations,
  useGetProductionOrders,
  useGetDashboardChart,
} from "@/controllers/API/queries/operations";
import StatsCard from "../../components/StatsCard";

export default function MetricsPage() {
  const storeAssets = useOperationsStore((s) => s.assets);
  const storeStations = useOperationsStore((s) => s.stations);
  const storeOrders = useOperationsStore((s) => s.productionOrders);
  const storeChart = useOperationsStore((s) => s.productionChart);

  const { data: apiAssets } = useGetAssets();
  const { data: apiStations } = useGetStations();
  const { data: apiOrders } = useGetProductionOrders();
  const { data: apiChart } = useGetDashboardChart();

  const isUsingMock = !apiAssets;
  const assets = apiAssets ?? storeAssets;
  const stations = apiStations ?? storeStations;
  const productionOrders = apiOrders ?? storeOrders;
  const chart = apiChart ?? storeChart;

  const avgTime = "12 min";
  const activeStations = stations.filter((s) => {
    const load = "currentLoad" in s ? s.currentLoad : 0;
    return true;
  });
  const stationEfficiency =
    activeStations.length > 0
      ? Math.round(
          activeStations.reduce((a, s) => {
            const load = "currentLoad" in s ? s.currentLoad : 0;
            return a + (100 - load);
          }, 0) / activeStations.length,
        )
      : 0;
  const activeProduction = productionOrders.filter(
    (o) => o.status === "IN_PROGRESS" || o.status === "in_progress",
  ).length;

  const maxVal = Math.max(...chart.values, 1);
  const donutData = [
    { label: "Componentes", value: 42, color: "bg-orange-500" },
    { label: "Matéria-prima", value: 28, color: "bg-amber-500" },
    { label: "Fixadores", value: 18, color: "bg-blue-500" },
    { label: "Insumos", value: 12, color: "bg-green-500" },
  ];
  const donutTotal = donutData.reduce((a, d) => a + d.value, 0);

  let cumulativePercent = 0;
  const donutSegments = donutData.map((d) => {
    const percent = d.value / donutTotal;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return { ...d, startPercent, percent };
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatsCard
          title="Tempo Médio de Produção"
          value={avgTime}
          icon="Timer"
          trend={{ value: 5, direction: "down" }}
        />
        <StatsCard
          title="Eficiência por Estação"
          value={`${stationEfficiency}%`}
          icon="Gauge"
          trend={{ value: 3, direction: "up" }}
        />
        <StatsCard
          title="Volume de Produção"
          value="R$ 28.450"
          icon="TrendingUp"
          trend={{ value: 8.5, direction: "up" }}
        />
        <StatsCard
          title="Produções Ativas"
          value={activeProduction}
          icon="Factory"
          trend={{ value: 2, direction: "up" }}
        />
      </div>

      {isUsingMock && (
        <p className="text-xs text-muted-foreground">
          * Alguns dados são simulados. Conecte ao backend para dados reais.
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Produção × Tempo
          </h3>
          <div className="flex h-48 items-end gap-2">
            {chart.labels.map((label, i) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-1"
              >
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all hover:bg-primary"
                  style={{
                    height: `${(chart.values[i] / maxVal) * 100}%`,
                  }}
                />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Produção por Categoria
          </h3>
          <div className="flex items-center justify-center">
            <div className="relative h-48 w-48">
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full -rotate-90"
              >
                {donutSegments.map((seg, i) => {
                  const r = 38;
                  const circ = 2 * Math.PI * r;
                  const offset = circ * (1 - seg.percent);
                  const dashOffset = -circ * seg.startPercent;
                  const colorMap: Record<string, string> = {
                    "bg-orange-500": "var(--orange-500)",
                    "bg-amber-500": "var(--amber-500)",
                    "bg-blue-500": "var(--blue-500)",
                    "bg-green-500": "var(--green-500)",
                  };
                  return (
                    <circle
                      key={seg.label}
                      cx="50"
                      cy="50"
                      r={r}
                      fill="none"
                      stroke={colorMap[seg.color] || seg.color}
                      strokeWidth="12"
                      strokeDasharray={`${circ} ${circ}`}
                      strokeDashoffset={dashOffset + offset}
                      className="transition-all duration-500"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {donutData.map((d) => (
              <div
                key={d.label}
                className="flex items-center gap-2 text-xs"
              >
                <span className={`h-3 w-3 rounded-full ${d.color}`} />
                {d.label} ({d.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
