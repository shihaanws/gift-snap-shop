import { useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Upload, PlusCircle, RotateCcw, Pencil, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { categories } from "@/data/products";
import type { Product } from "@/data/products";
import { useProducts } from "@/hooks/use-products";

const CSV_REQUIRED_HEADERS = ["id", "name", "price", "description", "category", "images"];

type ProductFormState = {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  images: string;
  variants: string;
  gstRate: string;
  listPrice: string;
  discountPercent: string;
  availableColors: string;
  productCode: string;
  material: string;
  packingType: string;
  masterCarton: string;
  customized: string;
  minOrderQty: string;
};

const initialFormState: ProductFormState = {
  id: "",
  name: "",
  price: "",
  description: "",
  category: categories[0]?.id ?? "gift-sets",
  images: "",
  variants: "",
  gstRate: "",
  listPrice: "",
  discountPercent: "",
  availableColors: "",
  productCode: "",
  material: "",
  packingType: "",
  masterCarton: "",
  customized: "",
  minOrderQty: "",
};

function mapProductToForm(product: Product): ProductFormState {
  return {
    id: product.id ?? "",
    name: product.name ?? "",
    price: String(product.price ?? ""),
    description: product.description ?? "",
    category: product.category ?? "",
    images: product.images?.join("|") ?? "",
    variants: product.variants?.join("|") ?? "",
    gstRate: product.gstRate !== undefined ? String(product.gstRate) : "",
    listPrice: product.listPrice !== undefined ? String(product.listPrice) : "",
    discountPercent: product.discountPercent !== undefined ? String(product.discountPercent) : "",
    availableColors: product.availableColors?.join("|") ?? "",
    productCode: product.productCode ?? "",
    material: product.material ?? "",
    packingType: product.packingType ?? "",
    masterCarton: product.masterCarton ?? "",
    customized: product.customized ?? "",
    minOrderQty: product.minOrderQty !== undefined ? String(product.minOrderQty) : "",
  };
}

function parseCsv(csv: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let inQuotes = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        value += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(value);
      value = "";
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      continue;
    }

    value += char;
  }

  if (value.length > 0 || row.length > 0) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function splitList(value: string): string[] {
  return value
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);
}

function validateProductInput(source: ProductFormState): Product {
  const id = source.id.trim() || slugify(source.name);
  const name = source.name.trim();
  const price = Number(source.price.trim());
  const description = source.description.trim();
  const category = source.category.trim();
  const images = splitList(source.images);
  const variants = splitList(source.variants);
  const availableColors = splitList(source.availableColors);
  const gstRate = source.gstRate.trim() ? Number(source.gstRate.trim()) : undefined;
  const listPrice = source.listPrice.trim() ? Number(source.listPrice.trim()) : undefined;
  const discountPercent = source.discountPercent.trim() ? Number(source.discountPercent.trim()) : undefined;
  const minOrderQty = source.minOrderQty.trim() ? Number(source.minOrderQty.trim()) : undefined;

  if (!id || !name || !description || !category || images.length === 0) {
    throw new Error("Fill all required fields and include at least one image URL.");
  }

  if (Number.isNaN(price)) {
    throw new Error("Price must be numeric.");
  }
  if (gstRate !== undefined && Number.isNaN(gstRate)) {
    throw new Error("GST rate must be numeric.");
  }
  if (listPrice !== undefined && Number.isNaN(listPrice)) {
    throw new Error("List price must be numeric.");
  }
  if (discountPercent !== undefined && Number.isNaN(discountPercent)) {
    throw new Error("Discount percent must be numeric.");
  }
  if (minOrderQty !== undefined && (Number.isNaN(minOrderQty) || minOrderQty < 1)) {
    throw new Error("Minimum order quantity must be at least 1.");
  }

  const product: Product = {
    id,
    name,
    price,
    description,
    category,
    images,
    currency: "INR",
  };
  if (variants.length > 0) {
    product.variants = variants;
  }
  if (availableColors.length > 0) {
    product.availableColors = availableColors;
  }
  if (gstRate !== undefined) {
    product.gstRate = gstRate;
  }
  if (listPrice !== undefined) {
    product.listPrice = listPrice;
  }
  if (discountPercent !== undefined) {
    product.discountPercent = discountPercent;
  }
  if (source.productCode.trim()) {
    product.productCode = source.productCode.trim();
  }
  if (source.material.trim()) {
    product.material = source.material.trim();
  }
  if (source.packingType.trim()) {
    product.packingType = source.packingType.trim();
  }
  if (source.masterCarton.trim()) {
    product.masterCarton = source.masterCarton.trim();
  }
  if (source.customized.trim()) {
    product.customized = source.customized.trim();
  }
  if (minOrderQty !== undefined) {
    product.minOrderQty = minOrderQty;
  }
  return product;
}

function mapCsvToProducts(csv: string): Product[] {
  const rows = parseCsv(csv);
  if (rows.length < 2) {
    throw new Error("CSV must contain header + at least one product row.");
  }

  const headers = rows[0].map((h) => h.trim());
  for (const header of CSV_REQUIRED_HEADERS) {
    if (!headers.includes(header)) {
      throw new Error(`Missing required CSV column: ${header}`);
    }
  }

  const indexes = Object.fromEntries(headers.map((header, index) => [header, index]));
  const products: Product[] = [];

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const get = (column: string) => (row[indexes[column]] ?? "").trim();
    const data: ProductFormState = {
      id: get("id"),
      name: get("name"),
      price: get("price"),
      description: get("description"),
      category: get("category"),
      images: get("images"),
      variants: get("variants"),
      gstRate: get("gstRate"),
      listPrice: get("listPrice"),
      discountPercent: get("discountPercent"),
      availableColors: get("availableColors"),
      productCode: get("productCode"),
      material: get("material"),
      packingType: get("packingType"),
      masterCarton: get("masterCarton"),
      customized: get("customized"),
      minOrderQty: get("minOrderQty"),
    };
    products.push(validateProductInput(data));
  }

  return products;
}

const ManageProducts = () => {
  const { products, addOrUpdateProduct, addOrUpdateMany, removeProduct, resetProducts } = useProducts();
  const [form, setForm] = useState<ProductFormState>(initialFormState);
  const [isUploading, setIsUploading] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  const categoryOptions = useMemo(() => categories.map((cat) => cat.id), []);

  const onFormChange = (field: keyof ProductFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmitSingle = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const product = validateProductInput(form);
      await addOrUpdateProduct(product);
      toast.success(editingProductId ? `Updated product: ${product.name}` : `Saved product: ${product.name}`);
      setForm(initialFormState);
      setEditingProductId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save product.");
    }
  };

  const onEditProduct = (product: Product) => {
    setForm(mapProductToForm(product));
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDeleteProduct = async (product: Product) => {
    const shouldDelete = window.confirm(`Delete "${product.name}" (${product.id}) from shop products?`);
    if (!shouldDelete) {
      return;
    }
    try {
      await removeProduct(product.id);
      if (editingProductId === product.id) {
        setForm(initialFormState);
        setEditingProductId(null);
      }
      toast.success(`Deleted product: ${product.name}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete product.");
    }
  };

  const onCsvUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);

    try {
      const csv = await file.text();
      const parsed = mapCsvToProducts(csv);
      const { created, updated } = await addOrUpdateMany(parsed);
      toast.success(`Bulk upload complete. Created: ${created}, Updated: ${updated}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Bulk upload failed.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">Manage Products</h1>
          <p className="text-muted-foreground">Add products manually or upload many products from CSV.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={onSubmitSingle} className="rounded-xl border border-border bg-card p-6 space-y-4">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              {editingProductId ? "Edit Product" : "Add Single Product"}
            </h2>
            {editingProductId && (
              <div className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
                Editing product ID: <span className="font-semibold text-foreground">{editingProductId}</span>
              </div>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">ID (optional)</span>
                <input
                  value={form.id}
                  onChange={(e) => onFormChange("id", e.target.value)}
                  placeholder="auto-generated-from-name"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Price *</span>
                <input
                  value={form.price}
                  onChange={(e) => onFormChange("price", e.target.value)}
                  placeholder="24"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
            </div>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Name *</span>
              <input
                value={form.name}
                onChange={(e) => onFormChange("name", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Description *</span>
              <textarea
                value={form.description}
                onChange={(e) => onFormChange("description", e.target.value)}
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Category *</span>
              <select
                value={form.category}
                onChange={(e) => onFormChange("category", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              >
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Images * (use | for multiple)</span>
              <input
                value={form.images}
                onChange={(e) => onFormChange("images", e.target.value)}
                placeholder="https://img1.jpg|https://img2.jpg"
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Variants (optional, use |)</span>
              <input
                value={form.variants}
                onChange={(e) => onFormChange("variants", e.target.value)}
                placeholder="Black|Navy|Walnut"
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Available Colors (optional, use |)</span>
              <input
                value={form.availableColors}
                onChange={(e) => onFormChange("availableColors", e.target.value)}
                placeholder="Black|Grey"
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">GST %</span>
                <input
                  value={form.gstRate}
                  onChange={(e) => onFormChange("gstRate", e.target.value)}
                  placeholder="18"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">List Price</span>
                <input
                  value={form.listPrice}
                  onChange={(e) => onFormChange("listPrice", e.target.value)}
                  placeholder="4847.5"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Discount %</span>
                <input
                  value={form.discountPercent}
                  onChange={(e) => onFormChange("discountPercent", e.target.value)}
                  placeholder="30"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Product Code</span>
                <input
                  value={form.productCode}
                  onChange={(e) => onFormChange("productCode", e.target.value)}
                  placeholder="H1512"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Minimum Order Qty</span>
                <input
                  value={form.minOrderQty}
                  onChange={(e) => onFormChange("minOrderQty", e.target.value)}
                  placeholder="7"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Material</span>
                <input
                  value={form.material}
                  onChange={(e) => onFormChange("material", e.target.value)}
                  placeholder="PU Leather"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
              <label className="text-sm space-y-1">
                <span className="text-muted-foreground">Packing Type</span>
                <input
                  value={form.packingType}
                  onChange={(e) => onFormChange("packingType", e.target.value)}
                  placeholder="PP Packing"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2"
                />
              </label>
            </div>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Master Carton</span>
              <input
                value={form.masterCarton}
                onChange={(e) => onFormChange("masterCarton", e.target.value)}
                placeholder="Master Carton:20pcs | Weight:22kg | Size:72X56X62CM"
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <label className="text-sm space-y-1 block">
              <span className="text-muted-foreground">Customized</span>
              <input
                value={form.customized}
                onChange={(e) => onFormChange("customized", e.target.value)}
                placeholder="Yes, Logo Branding"
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                <PlusCircle className="w-4 h-4" />
                {editingProductId ? "Update Product" : "Save Product"}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProductId(null);
                    setForm(initialFormState);
                  }}
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
                >
                  <X className="w-4 h-4" />
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="rounded-xl border border-border bg-card p-6 space-y-5">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Bulk Upload CSV
            </h2>
            <p className="text-sm text-muted-foreground">
              Required columns: <code>id,name,price,description,category,images</code>. Optional: <code>variants</code>.
            </p>
            <p className="text-sm text-muted-foreground">
              Extended optional columns: <code>gstRate,listPrice,discountPercent,availableColors,productCode,material,packingType,masterCarton,customized,minOrderQty</code>.
            </p>
            <p className="text-sm text-muted-foreground">
              Use <code>|</code> between multiple image URLs and variants.
            </p>

            <input
              type="file"
              accept=".csv,text/csv"
              onChange={onCsvUpload}
              disabled={isUploading}
              className="block w-full cursor-pointer rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={async () => {
                try {
                  await resetProducts();
                  toast.success("Product list reset to default seed data.");
                } catch (error) {
                  toast.error(error instanceof Error ? error.message : "Failed to reset products.");
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
            >
              <RotateCcw className="w-4 h-4" />
              Reset To Default
            </button>

            <div className="rounded-lg border border-border bg-background p-4">
              <p className="text-sm text-muted-foreground">Current product count</p>
              <p className="text-2xl font-semibold text-foreground">{products.length}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 rounded-xl border border-border bg-card p-6">
          <h2 className="mb-4 text-xl font-semibold text-foreground">All Shop Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="px-3 py-2 font-medium">ID</th>
                  <th className="px-3 py-2 font-medium">Name</th>
                  <th className="px-3 py-2 font-medium">Category</th>
                  <th className="px-3 py-2 font-medium">Price</th>
                  <th className="px-3 py-2 font-medium">Images</th>
                  <th className="px-3 py-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border/70">
                    <td className="px-3 py-2 font-mono text-xs text-muted-foreground">{product.id}</td>
                    <td className="px-3 py-2 text-foreground">{product.name}</td>
                    <td className="px-3 py-2 text-muted-foreground">{product.category}</td>
                    <td className="px-3 py-2 text-foreground">Rs. {product.price.toFixed(2)}</td>
                    <td className="px-3 py-2 text-muted-foreground">{product.images.length}</td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => onEditProduct(product)}
                          className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-foreground transition hover:bg-secondary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteProduct(product)}
                          className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-2.5 py-1.5 text-xs font-medium text-destructive transition hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ManageProducts;
