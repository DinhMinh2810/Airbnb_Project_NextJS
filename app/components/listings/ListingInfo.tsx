"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";
import { SafeUser } from "@/app/types";

import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import useCountries from "@/app/customHooks/useCountries";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  user: SafeUser;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}) => {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar
            src={
              user?.image ||
              "data:image/jpeg;base64,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"
            }
          />
        </div>
        <div
          className="
            flex 
            flex-row 
            items-center 
            gap-4 
            font-light
            text-neutral-500
          "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
