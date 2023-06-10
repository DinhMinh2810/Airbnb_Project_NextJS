"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";

import { SafeListing, SafeReservation, SafeUser } from "@/app/types";

import Button from "../Button";
import useCountries from "@/app/customHooks/useCountries";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [disabled, onAction, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={
              data.imageSrc ||
              "data:image/jpeg;base64,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"
            }
            alt="Listing"
          />
          <div
            className="
            absolute
            top-3
            right-3
          "
          >
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
