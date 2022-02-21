const isValue = (val:any) => {
  if (val === undefined || val === null) return false;
  if (Array.isArray(val) && val.length === 0) return false;
  if (typeof val === "object" && Object.keys(val).length === 0) return false;
  return true;
};

export const ClearObject:any = (obj:any) => {
  const clone = obj;
  if (Array.isArray(clone)) {
    const temp = clone.filter((val) => isValue(val));
    return temp.map((val) => {
      return ClearObject(val);
    });
  }
  if (typeof clone === "object")
    Object.keys(clone).map((key) => {
      if (!isValue(clone[key])) return delete clone[key];
      if (Array.isArray(clone[key])) {
        const temp = clone[key].filter((val:any) => isValue(val));
        return (clone[key] = temp.map((val:any) => {
          return ClearObject(val);
        }));
      }
      if (typeof clone[key] === "object")
        return (clone[key] = ClearObject(clone[key]));
    });
  return clone;
};

export function ClearObjectWithType<T>(obj:T):Partial<T>{
  const res = ClearObject(obj);
  return res;
}

