export const setItem = (
  itemName: string,
  data: Record<string, unknown> | Record<string, unknown>[]
) => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

export const getItem = (itemName: string) =>
  JSON.parse(localStorage.getItem(itemName));

export const setInitalItem = (o: Record<string, unknown>) =>
  Object.keys(o).map((k) => {
    !localStorage.getItem(k) && localStorage.setItem(k, JSON.stringify(o[k]));
  });
