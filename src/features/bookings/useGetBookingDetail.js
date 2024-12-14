import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useGetBookingDetail() {
  const { bookingId } = useParams();
  const {
    isLoading,
    error,
    data: bookingDetail,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { isLoading, bookingDetail, error };
}
