import { useCallback } from "react";
import getCurrencyFormatter from "@/plugins/price-format/getCurrencyFormatter";

const useGetCurrencySymbol = () => {
  return useCallback(
    (currency: string) =>
      getCurrencyFormatter("en", currency)
        .formatToParts(0)
        .find((part) => part.type === "currency")?.value ?? currency,
    [],
  );
};

export default useGetCurrencySymbol;
