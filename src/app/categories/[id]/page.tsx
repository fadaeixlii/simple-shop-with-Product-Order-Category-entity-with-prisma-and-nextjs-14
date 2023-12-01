import CategoriesList from "@/Components/CategoriesList";
import CategoryItem from "@/Components/CategoryItem";
import ProductItem from "@/Components/ProductItem";
import { getCategoryById } from "@/lib/categories";
import { getProductByCategoryId } from "@/lib/products";
import { useParams } from "next/navigation";

interface ProductByCategoryIdProps {
  params: {
    id: string;
  };
}

export default async function ProductByCategoryId(
  props: ProductByCategoryIdProps
) {
  const products = await getProductByCategoryId(Number(props.params.id));
  const category = await getCategoryById(Number(props.params.id));

  return (
    <div className="grid-cols-4 grid gap-2">
      {products.map((product, index) => (
        <ProductItem key={index} {...product} categoryTitle={category?.title} />
      ))}
    </div>
  );
}
