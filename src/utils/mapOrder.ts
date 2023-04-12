const mapOrder = (array: any, order: any) => {
  array.sort(function (a: any, b: any) {
    const A = a;
    const B = b;

    if (order.indexOf(A) > order.indexOf(B)) return 1;
    else return -1;
  });

  return array;
};

export default mapOrder;
