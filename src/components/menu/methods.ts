const findComponentParent = (context: any, parentName: string): any[] => {
  let parents = [];
  const parent: any = context.$parent;
  if (parent) {
    if (parent.$options.name === parentName) {
      parents.push(parent);
      return parents.concat(findComponentParent(parent, parentName));
    }
  }
  return [];
};

export { findComponentParent };
