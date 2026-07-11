import { ProductVisual } from "@/components/brand/ProductVisual";
import { productSummary } from "@/content/product";

export function ProductSummary() {
  return (
    <section className="product-summary">
      <ProductVisual variant="packshot" />
      <div>
        <h2>BRONGO</h2>
        <p>{productSummary}</p>
      </div>
    </section>
  );
}
