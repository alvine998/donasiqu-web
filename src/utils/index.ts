const formatNumber = (num: string | number): string => {
  if (num === "") return "";
  const numStr = num.toString().replace(/\D/g, "");
  const numValue = parseInt(numStr, 10);
  if (isNaN(numValue)) return "";
  return numValue.toLocaleString("id-ID");
};

const parseNumber = (str: string): number => {
  if (!str) return 0;
  const num = parseInt(str.replace(/\./g, ""), 10);
  return isNaN(num) ? 0 : num;
};
