import { useState } from "react";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import { useGetStandards } from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Button } from "@/components/ui/button";

export default function StandardsPage() {
  const storeStandards = useOperationsStore((s) => s.standards);
  const storeTasks = useOperationsStore((s) => s.complianceTasks);
  const [filterType, setFilterType] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: apiStandards } = useGetStandards();

  const isUsingMock = !apiStandards;
  const standards = apiStandards
    ? apiStandards.map((s) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        category: s.category,
        type: s.type,
        isActive: s.is_active,
        complianceScore: s.compliance_score,
        requirements: s.requirements,
        passed: s.passed,
      }))
    : storeStandards;

  const filtered =
    filterType === "all"
      ? standards
      : standards.filter((s) => s.type === filterType);

  const activeStandards = standards.filter((s) => s.isActive);
  const overallScore =
    activeStandards.length > 0
      ? Math.round(
          activeStandards.reduce((a, s) => a + s.complianceScore, 0) /
            activeStandards.length,
        )
      : 0;

  const typeSet = Array.from(new Set(standards.map((s) => s.type)));
  const types = ["all", ...typeSet];

  return (
    <div className="flex h-full gap-4 p-6">
      <div className="w-48 shrink-0">
        <div className="mb-4 flex items-center gap-2">
          <ForwardedIconComponent
            name="Shield"
            className="h-5 w-5 text-primary"
          />
          <span className="font-semibold">GLOBAL COMPLIANCE ENGINE</span>
        </div>
        <div className="mb-6 rounded-lg border bg-card p-4 text-center">
          <p className="text-xs text-muted-foreground">Compliance Score</p>
          <p
            className={`text-3xl font-bold ${
              overallScore >= 80
                ? "text-emerald-500"
                : overallScore >= 60
                  ? "text-amber-500"
                  : "text-red-500"
            }`}
          >
            {overallScore}%
          </p>
        </div>
        <div className="space-y-1">
          {types.map((type) => (
            <Button
              key={type}
              variant={filterType === type ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              onClick={() => setFilterType(type)}
            >
              {type === "all" ? "Todas" : type}
            </Button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto">
        <div className="flex items-center gap-2">
          <span className="rounded-md bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-500">
            ESG READY
          </span>
          {isUsingMock && (
            <span className="text-xs text-muted-foreground">(dados simulados)</span>
          )}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {filtered.map((std) => (
            <div key={std.id} className="rounded-lg border bg-card shadow-sm">
              <button
                className="flex w-full items-center justify-between p-4 text-left"
                onClick={() =>
                  setExpandedId(expandedId === std.id ? null : std.id)
                }
              >
                <div>
                  <h3 className="font-semibold">{std.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {std.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${
                        std.complianceScore >= 80
                          ? "text-emerald-500"
                          : std.complianceScore >= 60
                            ? "text-amber-500"
                            : "text-red-500"
                      }`}
                    >
                      {std.complianceScore}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {std.passed}/{std.requirements}
                    </p>
                  </div>
                  <ForwardedIconComponent
                    name={expandedId === std.id ? "ChevronUp" : "ChevronDown"}
                    className="h-4 w-4 text-muted-foreground"
                  />
                </div>
              </button>
              {expandedId === std.id && (
                <div className="border-t px-4 pb-4 pt-3">
                  <div className="mb-3">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-muted-foreground">Progresso</span>
                      <span>
                        {Math.round((std.passed / std.requirements) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${(std.passed / std.requirements) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  {isUsingMock &&
                    storeTasks.filter((t) => t.standardId === std.id).length >
                      0 && (
                      <div>
                        <p className="mb-2 text-xs font-medium text-muted-foreground">
                          Tarefas
                        </p>
                        {storeTasks
                          .filter((t) => t.standardId === std.id)
                          .map((task) => (
                            <div
                              key={task.id}
                              className="mb-2 flex items-center justify-between rounded-md bg-muted/50 p-2 text-xs"
                            >
                              <div>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-muted-foreground">
                                  {task.assignee} · {task.dueDate}
                                </p>
                              </div>
                              <StatusBadge status={task.status} />
                            </div>
                          ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
