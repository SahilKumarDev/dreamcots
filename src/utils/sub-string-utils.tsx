export const subString = (subStringId: string, from: string) => {
  const subString = subStringId.substring(subStringId.indexOf(from) + 1);
  return subString;
};
