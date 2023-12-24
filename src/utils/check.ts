export const check = (value: any) => {
  switch (typeof value) {
    case "string":
      return value.length === 0;
    case "number":
      return isNaN(value);
    default:
      return false;
  }
};
