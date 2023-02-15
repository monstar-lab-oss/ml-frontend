export function deepMergeObjects(
  obj1: Record<string, any>,
  obj2: Record<string, any>
) {
  // a shallow copy of the first object to avoid mutating the original
  const mergedObj = { ...obj1 };

  Object.keys(obj2).forEach((key) => {
    const existValue = mergedObj[key];

    const isObject =
      typeof existValue === "object" && typeof obj2[key] === "object";

    if (isObject) {
      mergedObj[key] = deepMergeObjects(existValue, obj2[key]);
    } else {
      mergedObj[key] = obj2[key];
    }
  });

  return mergedObj;
}
