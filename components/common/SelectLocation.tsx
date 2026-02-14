"use client";

import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


const SelectLocation = ({
  value,
  onChange,
}: {
  value?: { lat: number; lng: number };
  onChange: (value: { lat: number; lng: number }) => void;
}) => {
  const [markerLocation, setMarkerLocation] = useState({
    lat: Number(value?.lat) || 31.8353372,
    lng: Number(value?.lng) || 36.276591,
  });

  const handleMapClick = (mapProps: any) => {
    if (mapProps.detail.latLng) {
      const lat = mapProps.detail.latLng.lat;
      const lng = mapProps.detail.latLng.lng;
      setMarkerLocation({ lat, lng });
      onChange({ lat, lng });
    } else {
      alert("Please select the specific location");
    }
  };

  const geolocationAPI = navigator.geolocation;

  const getUserCoordinates = () => {
    if (!geolocationAPI) {
      console.log("Geolocation API is not available in your browser!");
    } else {
      geolocationAPI.getCurrentPosition(
        (position) => {
          const { coords } = position;
          setMarkerLocation({ lat: coords.latitude, lng: coords.longitude });
          // selectedLatLngAction(coords.latitude, coords.longitude);
        },
        () => {
          console.log("Something went wrong getting your position!");
        }
      );
    }
  };

  useEffect(() => {
    if (!value?.lat || !value?.lng) {
      getUserCoordinates();
    }
  }, [geolocationAPI, value]);

  return (
    <div className="rounded-lg overflow-hidden w-full max-h-[265px] aspect-video">
      <APIProvider apiKey={"AIzaSyCnERgO2sxll_9-hB4IqA5iIz-EARxpQ1M"}>
        <Map
          defaultZoom={10}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
          onClick={handleMapClick}
          cameraControl
        >
          <Marker position={markerLocation} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default SelectLocation;
