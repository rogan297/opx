import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBarButtonsComponent from "@/components/core/sidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";
import PageLayout from "@/components/common/pageLayout";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { OperationsProvider } from "./context";

const navItems = [
  { href: "/operations", title: "Dashboard", icon: "LayoutDashboard" },
  { href: "/operations/products", title: "Produtos", icon: "Package" },
  { href: "/operations/stock", title: "Estoque", icon: "Warehouse" },
  { href: "/operations/suppliers", title: "Fornecedores", icon: "Truck" },
  { href: "/operations/production", title: "Produção Kanban", icon: "Columns3" },
  { href: "/operations/stations", title: "Estações", icon: "Building2" },
  { href: "/operations/workflows", title: "Workflows", icon: "GitMerge" },
  { href: "/operations/employees", title: "Funcionários", icon: "Users" },
  { href: "/operations/inventory", title: "Insumos", icon: "Boxes" },
  { href: "/operations/maintenance", title: "Manutenção", icon: "Wrench" },
  { href: "/operations/metrics", title: "Métricas & BI", icon: "BarChart3" },
  { href: "/operations/ai-manager", title: "IA Manager", icon: "Bot" },
  { href: "/operations/standards", title: "Compliance", icon: "Shield" },
];

export default function OperationsPage() {
  const location = useLocation();

  const sidebarItems = navItems.map((item) => ({
    href: item.href,
    title: item.title,
    icon: <ForwardedIconComponent name={item.icon} className="w-4 flex-shrink-0 stroke-[1.5]" />,
  }));

  const currentNav = navItems.find((item) => {
    if (item.href === "/operations") return location.pathname === "/operations";
    return location.pathname.startsWith(item.href);
  });

  return (
    <PageLayout
      title={currentNav?.title || "Operations"}
      description=""
    >
      <SidebarProvider width="16rem" defaultOpen={false}>
        <SideBarButtonsComponent items={sidebarItems} />
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col overflow-x-hidden pt-1">
            <OperationsProvider>
              <Outlet />
            </OperationsProvider>
          </div>
        </main>
      </SidebarProvider>
    </PageLayout>
  );
}
