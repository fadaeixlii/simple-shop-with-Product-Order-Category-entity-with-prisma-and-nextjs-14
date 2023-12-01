import Image from "next/image";
import { useRouter } from "next/navigation";
import { orderType } from "@/Context/currentOrderContext";
import { getProductById } from "@/lib/products";
import { getUserById } from "@/lib/user";

interface OrderIteProps extends orderType {}

const OrderItem = async (props: OrderIteProps) => {
  const product = await getProductById(props.productId ?? 0);
  const user = await getUserById(1);

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg w-full lg:max-w-full lg:flex">
      <div className=" p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">order</p>
          <div className="text-gray-900 font-bold text-xl mb-2">
            {props.title}
          </div>
          <div className="text-green-900 font-bold text-xl mb-2">
            product:{product?.title}
          </div>
          <p className="text-gray-700 text-base">
            delivery-coordinate : {props.lat}-{props.lng}
          </p>
          <p className="text-green-700 text-base">price : {props.price}</p>
          <p className="text-orange-700 text-base">status : {props.status}</p>
        </div>
        <div className="flex items-center">
          <Image
            className="w-10 h-10 rounded-full mr-4"
            src="/Images/Profile.jpg"
            alt="Avatar of user"
            width={40}
            height={40}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">{user?.name}</p>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
