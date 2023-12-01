import CategoriesList from "@/Components/CategoriesList";
import CategoryItem from "@/Components/CategoryItem";
import { getCategories } from "@/lib/categories";

export default async function Categories() {
  const categories = await getCategories();

  return (
    <div className="grid-cols-5 grid gap-2">
      {categories.map((category, index) => (
        <CategoryItem key={index} {...category} />
      ))}
    </div>
  );
}
