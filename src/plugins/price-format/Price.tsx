import type { FC } from "react";
import usePriceFormat from "@/plugins/price-format/usePriceFormat";

export type PriceProps = {
  amount: number;
  currency: string;
};
const Price: FC<PriceProps> = ({ amount, currency }) => {
  const priceFormat = usePriceFormat();
  return priceFormat({ amount, currency });
};
export default Price;
