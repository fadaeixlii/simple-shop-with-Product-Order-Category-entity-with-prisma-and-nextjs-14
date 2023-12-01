"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
export default function DeliveryCoordinate() {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/Components/OpenStreetMap"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="w-full h-max">
      <Map position={{ lat: 35.701351, lng: 51.3388143 }} zoom={15} />
    </div>
  );
}
