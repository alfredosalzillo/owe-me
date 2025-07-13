const CURRENCY_FORMATTERS = new Map<string, Intl.NumberFormat>();
const getCurrencyFormatter = (lang: string, currency: string) => {
  if (typeof window === 'undefined') {
    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
    });
  }
  const key = `${lang}-${currency}`;
  if (!CURRENCY_FORMATTERS.has(key)) {
    CURRENCY_FORMATTERS.set(key, new Intl.NumberFormat(lang, {
      style: 'currency',
      currency,
    }));
  }
  return CURRENCY_FORMATTERS.get(key)!;
};

export default getCurrencyFormatter;
