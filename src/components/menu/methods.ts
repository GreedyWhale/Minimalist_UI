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

const findComponentChildren = (
  context: any,
  childName: string | number
): any[] => {
  let result: any[] = [];
  let children = context.$children;
  if (context.$children && context.$children.length) {
    let child = children.filter((vm: any) => vm.name === childName);
    if (child && child.length) {
      return child[0].$children;
    }
    for (let i = 0; i < children.length; i++) {
      result.concat(findComponentChildren(children[i], childName));
    }
    return result;
  }
  return [];
};

const isContainsChild = (context: any, childName: string | number): boolean => {
  let children = context.$children;
  if (context.$children && context.$children.length) {
    let child = children.filter((vm: any) => vm.name === childName);
    if (child && child.length) {
      return true;
    }
    for (let i = 0; i < children.length; i++) {
      let result = isContainsChild(children[i], childName);
      if (result) {
        return true;
      }
    }
  }
  return false;
};
export { findComponentParent, findComponentChildren, isContainsChild };
