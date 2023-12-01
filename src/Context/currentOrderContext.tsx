"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
type orderContextType = {
  title: string | null;
  status: string | null;
  price: number | null;
  userId: number | null;
  productId: number | null;
  lat: number | null;
  lng: number | null;
  addProduct: (productId: number, userId: number, price: number) => void;
  addLatLng: (lat: number, lng: number) => void;
};

export type orderType = Omit<orderContextType, "addProduct" | "addLatLng">;

const initialState: orderContextType = {
  title: null,
  status: null,
  price: null,
  userId: null,
  productId: null,
  lat: null,
  lng: null,
  addProduct(productId, userId) {},
  addLatLng(lat, lng) {},
};

const CurrentOrderContext = createContext<orderContextType>(initialState);

export function useCurrentOrderContext() {
  return useContext(CurrentOrderContext);
}

type Props = {
  children: React.ReactNode;
};

export function CurrentOrderProvider({ children }: Props) {
  const [order, setOrder] = useState<orderType>({
    title: null,
    status: null,
    price: null,
    userId: null,
    productId: null,
    lat: null,
    lng: null,
  });

  const addProduct = (productId: number, userId: number, price: number) => {
    setOrder((prev) => ({ ...prev, productId, userId, price }));
  };
  const addLatLng = (lat: number, lng: number) => {
    setOrder((prev) => ({ ...prev, lat, lng }));
  };

  const value = {
    ...order,
    addLatLng,
    addProduct,
  };
  const socket = io("http://localhost:3001");

  useEffect(() => {
    socket.on("update-orders", async () => {
      try {
        const response = await fetch("/api/update-orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(response.status.toString());
        }
      } catch (error) {
        console.dir(error);
      }
    });
  }, [socket]);

  return (
    <>
      <CurrentOrderContext.Provider value={value}>
        {children}
      </CurrentOrderContext.Provider>
    </>
  );
}
