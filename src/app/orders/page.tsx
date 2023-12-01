import OrderItem from "@/Components/OrderItem";
import { orderType } from "@/Context/currentOrderContext";

export default async function Orders() {
  const response = await fetch(process.env.URL + `/api/order/${1}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 5,
    },
  });

  const orders: orderType[] = await response.json();

  return (
    <div className="grid-cols-5 grid gap-2">
      {orders.map((order, index) => (
        <OrderItem key={index} {...order} />
      ))}
    </div>
  );
}
