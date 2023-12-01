"use client";

import { useRouter } from "next/navigation";

interface CategoryItemProps {
  title: string;
  id: number;
}
const CategoryItem = (props: CategoryItemProps) => {
  const router = useRouter();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg ">
      <div className="px-6 py-4">
        <div className=" text-sm italic mb-2">category</div>
        <div className="font-bold text-xl mb-2">{props.title}</div>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          onClick={() => {
            router.push(`/categories/${props.id}`);
          }}
          className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          go to category
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
