"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCurrentOrderContext } from "@/Context/currentOrderContext";

interface ProductItemProps {
  id: number;
  title: string;
  image: string | null;
  price: number;
  categoryId: number;
  categoryTitle?: string;
}
const ProductItem = (props: ProductItemProps) => {
  const currentOrderContext = useCurrentOrderContext();
  const router = useRouter();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <Image
        className="w-1/2 mx-auto"
        src="/Images/productExampleImage.jpg"
        alt="Sunset in the mountains"
        width={200}
        height={200}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{props.title}</div>
        <p className="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        {props.categoryTitle && (
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {`#${props.categoryTitle}`}
          </span>
        )}
        <span className="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {`${props.price}$`}
        </span>
        <button
          onClick={() => {
            currentOrderContext.addProduct(props.id, 1, props.price);
            router.push("/delivery-coordinate");
          }}
          className="bg-white hover:bg-green-200 text-green-800 font-semibold py-2 px-4 border border-green-400 rounded shadow"
        >
          buy $
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
