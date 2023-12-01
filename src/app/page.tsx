import Categories from "@/Components/CategoriesList";
import Tabs from "@/Components/Tabs";
import { ShopTabContextProvider } from "@/Context/shopTabContext";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/categories");
  return null;
}
