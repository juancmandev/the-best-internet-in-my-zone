const mapOrder = (array: Array<any>, order: any) => {
  array.sort(function (a: any, b: any) {
    if (order.indexOf(a) > order.indexOf(b)) return 1;
    else return -1;
  });

  return array;
};

export default mapOrder;
