import { useCallback } from "react";
import getCurrencyFormatter from "./getCurrencyFormatter";

type Price = {
  amount: number;
  currency: string;
};
const usePriceFormat = () => {
  return useCallback(
    (price: Price) =>
      getCurrencyFormatter("en", price.currency).format(price.amount),
    [],
  );
};

export default usePriceFormat;
