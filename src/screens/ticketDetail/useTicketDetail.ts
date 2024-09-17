import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../hooks/useStore";
import { RootState } from "../../redux/store";
import { fetchEvent } from "../../redux/slices/ticketDetailSlice";
import bwipjs from "@bwip-js/react-native";
import { DataURL, TicketDetailRouteProp } from "../../types/types";

export const useTicketDetail = () => {
  const route = useRoute<TicketDetailRouteProp>();
  const { eventId } = route.params;

  const dispatch = useAppDispatch();
  const { event, loading, error } = useAppSelector(
    (state: RootState) => state.ticketDetail
  );

  useEffect(() => {
    dispatch(fetchEvent(eventId));
  }, [dispatch, eventId]);

  const [barcodeImg, setBarcodeImg] = useState<DataURL | null>(null);

  const generateBarcode = async (text: string) => {
    try {
      const img = await bwipjs.toDataURL({
        bcid: "code128",
        text: text,
        scale: 3,
        height: 10,
        includetext: false,
      });
      setBarcodeImg(img);
    } catch (err) {}
  };

  useEffect(() => {
    if (event) generateBarcode(event?.createdAt?.toDateString());
  }, [event]);

  return {
    event,
    barcodeImg,
    loading,
    error,
  };
};
