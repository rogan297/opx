import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetCustomers } from "@/controllers/API/queries/operations";
import StatsCard from "../../components/StatsCard";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";

export default function SuppliersPage() {
  const storeSuppliers = useOperationsStore((s) => s.suppliers);
  const [search, setSearch] = useState("");

  const { data: apiCustomers } = useGetCustomers();

  const isUsingMock = !apiCustomers;
  const suppliers = isUsingMock
    ? storeSuppliers
    : apiCustomers.map((c) => ({
        id: c.id,
        name: c.name,
        rating: 0,
        reliabilityPct: 0,
        lastOrder: "",
        contactName: "",
        contactPhone: "",
        contactEmail: c.email ?? "",
        onTimeDelivery: 0,
        savingsViaAI: 0,
        qualitySLA: 0,
      }));

  const filtered = suppliers.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()),
  );

  const avgDelivery =
    isUsingMock && suppliers.length > 0
      ? Math.round(
          suppliers.reduce((a, s) => a + s.onTimeDelivery, 0) / suppliers.length,
        )
      : 0;
  const avgSavings =
    isUsingMock && suppliers.length > 0
      ? Math.round(
          suppliers.reduce((a, s) => a + s.savingsViaAI, 0) / suppliers.length,
        )
      : 0;
  const avgSLA =
    isUsingMock && suppliers.length > 0
      ? Math.round(
          suppliers.reduce((a, s) => a + s.qualitySLA, 0) / suppliers.length,
        )
      : 0;

  return (
    <div className="flex flex-col gap-6 p-6">
      {isUsingMock && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatsCard
            title="Entregas no Prazo"
            value={`${avgDelivery}%`}
            icon="CheckCircle2"
          />
          <StatsCard
            title="Economia via IA"
            value={`${avgSavings}%`}
            icon="BrainCircuit"
          />
          <StatsCard
            title="Qualidade SLA"
            value={`${avgSLA}%`}
            icon="Award"
          />
        </div>
      )}

      <div className="rounded-lg border bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
        <div className="flex items-center gap-3">
          <ForwardedIconComponent
            name="Sparkles"
            className="h-6 w-6 text-blue-500"
          />
          <div>
            <p className="font-semibold">
              {isUsingMock
                ? "Auditoria Inteligente de Fornecedores"
                : "Gestão de Parceiros"}
            </p>
            <p className="text-sm text-muted-foreground">
              {isUsingMock
                ? `IA está analisando o desempenho dos fornecedores em tempo real. Economia média de ${avgSavings}% nas negociações.`
                : `${suppliers.length} parceiros cadastrados no sistema.`}
            </p>
          </div>
        </div>
      </div>

      <div className="relative w-72">
        <ForwardedIconComponent
          name="Search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar fornecedor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            Nenhum fornecedor encontrado.
          </div>
        ) : (
          filtered.map((supplier) => (
            <div
              key={supplier.id}
              className="rounded-lg border bg-card p-4 shadow-sm"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  {isUsingMock && (
                    <div className="mt-1 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <ForwardedIconComponent
                          key={i}
                          name="Star"
                          className={`h-3.5 w-3.5 ${
                            i < Math.round(supplier.rating)
                              ? "text-amber-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-xs text-muted-foreground">
                        {supplier.rating}
                      </span>
                    </div>
                  )}
                </div>
                {isUsingMock && (
                  <span className="text-sm font-bold text-emerald-500">
                    {supplier.reliabilityPct}%
                  </span>
                )}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                {supplier.contactEmail && (
                  <p>Email: {supplier.contactEmail}</p>
                )}
                {isUsingMock && supplier.contactName && (
                  <p>Contato: {supplier.contactName}</p>
                )}
                {isUsingMock && supplier.contactPhone && (
                  <p>Tel: {supplier.contactPhone}</p>
                )}
                {isUsingMock && supplier.lastOrder && (
                  <p>Último pedido: {supplier.lastOrder}</p>
                )}
                {!isUsingMock && <p>Parceiro comercial</p>}
              </div>
              {isUsingMock && (
                <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 text-center text-xs">
                  <div>
                    <p className="font-semibold text-foreground">
                      {supplier.onTimeDelivery}%
                    </p>
                    <p className="text-muted-foreground">No Prazo</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {supplier.savingsViaAI}%
                    </p>
                    <p className="text-muted-foreground">Economia</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {supplier.qualitySLA}%
                    </p>
                    <p className="text-muted-foreground">Qualidade</p>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
