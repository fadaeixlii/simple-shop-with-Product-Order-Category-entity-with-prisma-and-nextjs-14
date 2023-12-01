"use client";

import { getCategoryById } from "@/lib/categories";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

interface TabsProps {
  children: React.ReactNode;
}

const Tabs = (props: TabsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [category, setCategory] = React.useState<{
    title: string;
    id: number;
  } | null>(null);

  const fetchCategory = async () => {
    try {
      const contentType = "application/json";
      if (params?.id) {
        const response = await fetch(`/api/category/${params?.id}`, {
          method: "GET",

          headers: {
            "Content-Type": contentType,
          },
        });
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
        const cat = await response.json();
        setCategory(cat);
      }
    } catch (error) {
      console.dir(error);
    }
  };

  React.useEffect(() => {
    if (params?.id) fetchCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-wrap container p-3">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 w-1/4 text-center ">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal border-solid border-gray-200 w-full  " +
                  (pathname !== "/orders"
                    ? "text-white bg-gray-400"
                    : "text-gray-400 bg-white")
                }
                onClick={(e) => {
                  if (pathname === "/orders") {
                    router.push("/categories");
                  }
                }}
                data-toggle="tab"
                role="tablist"
              >
                {pathname !== "/orders"
                  ? params?.id
                    ? `category => ${category ? category?.title : ""}`
                    : pathname.replace("/", " ")
                  : "shop"}
              </button>
            </li>
            <li className="-mb-px mr-2 last:mr-0 w-1/4 text-center ">
              <button
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal border-2 border-solid border-gray-200 w-full " +
                  (pathname === "/orders"
                    ? "text-white bg-gray-400"
                    : "text-gray-400 bg-white")
                }
                onClick={(e) => {
                  router.push("/orders");
                }}
                data-toggle="tab"
                role="tablist"
              >
                orders
              </button>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 ">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">{props.children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
