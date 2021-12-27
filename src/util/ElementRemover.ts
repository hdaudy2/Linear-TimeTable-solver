const ElementRemover = <T>(array: T[], index: number) => {
  array.splice(index, 1);
  return array;
};

export default ElementRemover;