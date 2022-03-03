export const setItem = (itemName: string, data: any) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

export const getItem = (itemName: string) =>
  JSON.parse(localStorage.getItem(itemName) || "");

export const setInitalItem = (o: Record<string, any>) =>
  Object.keys(o).map((k) => {
    !localStorage.getItem(k) && localStorage.setItem(k, JSON.stringify(o[k]));
  });
