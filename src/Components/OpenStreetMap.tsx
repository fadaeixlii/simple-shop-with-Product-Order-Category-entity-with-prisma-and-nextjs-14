import { MapContainer, Marker, TileLayer, Tooltip, Popup } from "react-leaflet";
import { useMapEvents } from "react-leaflet/hooks";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { useState } from "react";
import { useCurrentOrderContext } from "@/Context/currentOrderContext";
import { useRouter } from "next/navigation";
type LatLngType = { lng: number; lat: number };

interface LocationMarkerProps {
  setLatLng: (LatLng: LatLngType) => void;
  LatLng: LatLngType;
}

function LocationMarker(props: LocationMarkerProps) {
  const map = useMapEvents({
    click(e) {
      props.setLatLng(e.latlng);
      console.log(e);
    },
    locationfound(e) {
      props.setLatLng(e.latlng);
    },
  });

  return props.LatLng === null ? null : (
    <Marker position={props.LatLng}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

interface MyMapProps {
  position: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

export default function MyMap(props: MyMapProps) {
  const { position, zoom } = props;
  const [LatLng, setLatLng] = useState<LatLngType>(position);

  const currentOrderContext = useCurrentOrderContext();
  const router = useRouter();

  return (
    <div className="w-full h-max relative">
      <MapContainer
        className="h-max"
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setLatLng={setLatLng} LatLng={LatLng} />
      </MapContainer>
      <button
        onClick={async (e) => {
          e.stopPropagation();
          e.preventDefault();
          try {
            currentOrderContext.addLatLng(LatLng.lat, LatLng.lng);
            await fetch("/api/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                title: currentOrderContext.title,
                status: currentOrderContext.status,
                lat: LatLng.lat,
                lng: LatLng.lng,
                price: currentOrderContext.price,
                productId: currentOrderContext.productId,
                userId: currentOrderContext.userId,
              }),
            });

            router.push("/orders");
          } catch (error) {
            console.dir(error);
          }
        }}
        className="bg-white hover:bg-green-200 text-green-800 font-semibold py-2 px-4 border border-green-400 rounded shadow absolute bottom-3 right-3 z-50"
      >
        Select Delivery Location
      </button>
    </div>
  );
}
