export const _hasHeightClass = (className: string) => {
  const hasWidthClass = /\bw-\S*/.test(className);
  return hasWidthClass;
};

export const _hasWidthClass = (className: string) => {
  const hasHeightClass = /\bh-\S*/.test(className);
  return hasHeightClass;
};
