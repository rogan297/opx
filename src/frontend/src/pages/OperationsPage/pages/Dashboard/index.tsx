import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import {
  useGetDashboardStats,
  useGetDashboardActivities,
  useGetDashboardChart,
} from "@/controllers/API/queries/operations";
import StatsCard from "../../components/StatsCard";
import ForwardedIconComponent from "@/components/common/genericIconComponent";

export default function DashboardPage() {
  const storeStats = useOperationsStore((s) => s.dashboardStats);
  const storeActivities = useOperationsStore((s) => s.activities);
  const storeChart = useOperationsStore((s) => s.productionChart);

  const { data: apiStats } = useGetDashboardStats();
  const { data: apiActivities } = useGetDashboardActivities();
  const { data: apiChart } = useGetDashboardChart();

  const isUsingApi = !!apiStats;
  const stats = apiStats ?? storeStats;
  const activities = apiActivities ?? storeActivities;
  const chart = apiChart ?? storeChart;

  const maxVal = Math.max(...chart.values, 1);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Produção Diária"
          value={stats.dailyProduction.value}
          icon="Factory"
          trend={{
            value: stats.dailyProduction.change,
            direction: "up",
          }}
        />
        <StatsCard
          title="Vendas Mensais"
          value={
            isUsingApi
              ? `R$ ${stats.monthlySales.value.toLocaleString()}`
              : `R$ ${stats.monthlySales.value.toLocaleString()}`
          }
          icon="DollarSign"
          trend={{
            value: stats.monthlySales.change,
            direction: "up",
          }}
        />
        <StatsCard
          title="Novos Clientes"
          value={stats.newCustomers.value}
          icon="UserPlus"
          trend={{
            value: Math.abs(stats.newCustomers.change),
            direction: stats.newCustomers.change >= 0 ? "up" : "down",
          }}
        />
        <StatsCard
          title="Alertas de Estoque"
          value={stats.stockAlerts.value}
          icon="AlertTriangle"
          trend={{
            value: Math.abs(stats.stockAlerts.change),
            direction: stats.stockAlerts.change >= 0 ? "up" : "down",
          }}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Produção × Tempo
          </h3>
          <div className="flex h-48 items-end gap-2">
            {chart.labels.map((label, i) => (
              <div key={label} className="flex flex-1 flex-col items-center gap-1">
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
          {!isUsingApi && (
            <p className="mt-2 text-xs text-muted-foreground">
              * Dados simulados. Conecte ao backend para dados reais.
            </p>
          )}
        </div>

        <div className="rounded-lg border bg-card p-4">
          <h3 className="mb-4 text-sm font-medium text-muted-foreground">
            Atividades Recentes
          </h3>
          <div className="flex flex-col gap-3">
            {activities.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Nenhuma atividade registrada.
              </p>
            ) : (
              activities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5">
                    <ForwardedIconComponent
                      name={
                        act.type === "order"
                          ? "ShoppingCart"
                          : act.type === "alert"
                            ? "AlertTriangle"
                            : act.type === "production"
                              ? "Factory"
                              : "Shield"
                      }
                      className="h-4 w-4 text-muted-foreground"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground">{act.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(act.timestamp).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
