import { useEffect, useState } from "react";
import type { Product } from "@/mocks/operations/products.mock";
import { useOperationsStore } from "@/stores/operations/useOperationsStore";
import {
  useGetProducts,
  usePostProduct,
  usePatchProduct,
  useDeleteProduct,
} from "@/controllers/API/queries/operations";
import StatusBadge from "../../components/StatusBadge";
import ForwardedIconComponent from "@/components/common/genericIconComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function ProductsPage() {
  const storeProducts = useOperationsStore((s) => s.products);
  const setProducts = useOperationsStore((s) => s.setProducts);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", price: 0, description: "", type: "FINISHED_GOOD" });
  const [editId, setEditId] = useState<string | null>(null);

  const { data: apiProducts, isLoading, error } = useGetProducts();
  const postProduct = usePostProduct();
  const patchProduct = usePatchProduct();
  const deleteProduct = useDeleteProduct();

  const products: Product[] = apiProducts
    ? apiProducts.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description ?? "",
        price: p.price,
        category: p.type ?? "Geral",
        type: (p.type === "RAW_MATERIAL" ? "RAW_MATERIAL" : "FINISHED_GOOD") as Product["type"],
        image: "📦",
        createdAt: "",
      }))
    : storeProducts;

  useEffect(() => {
    if (apiProducts) {
      setProducts(
        apiProducts.map((p) => ({
          id: p.id,
          name: p.name,
          description: p.description ?? "",
          price: p.price,
          category: p.type ?? "Geral",
          type: (p.type === "RAW_MATERIAL" ? "RAW_MATERIAL" : "FINISHED_GOOD") as Product["type"],
          image: "📦",
          createdAt: "",
        })),
      );
    }
  }, [apiProducts, setProducts]);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = () => {
    if (editId) {
      patchProduct.mutate({ id: editId, ...form });
    } else {
      postProduct.mutate(form);
    }
    setOpen(false);
    setEditId(null);
    setForm({ name: "", price: 0, description: "", type: "FINISHED_GOOD" });
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      type: product.type,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteProduct.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        Carregando produtos...
      </div>
    );
  }

  if (error && !apiProducts && storeProducts.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 text-red-500">
        Erro ao carregar produtos.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div className="relative w-72">
          <ForwardedIconComponent
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog
          open={open}
          onOpenChange={(v) => {
            setOpen(v);
            if (!v) {
              setEditId(null);
              setForm({ name: "", price: 0, description: "", type: "FINISHED_GOOD" });
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <ForwardedIconComponent name="Plus" className="mr-2 h-4 w-4" />
              Novo Produto
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editId ? "Editar Produto" : "Novo Produto"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome do produto"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Preço</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Descrição</Label>
                <Input
                  placeholder="Descrição"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Tipo</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                  <option value="FINISHED_GOOD">FINISHED_GOOD</option>
                  <option value="RAW_MATERIAL">RAW_MATERIAL</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filtered.length === 0 ? (
        <div className="flex items-center justify-center p-12 text-muted-foreground">
          Nenhum produto encontrado.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="group rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between">
                <span className="text-3xl">{product.image}</span>
                <StatusBadge
                  status={
                    product.type === "FINISHED_GOOD" ? "active" : "stable"
                  }
                />
              </div>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold">
                  R$ {product.price.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {product.category}
                </span>
              </div>
              <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
                >
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
