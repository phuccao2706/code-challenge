import React from "react";

const Problem1 = () => {
  const sumToN_a = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
  };

  const sumToN_b = (n: number): number => {
    if (n <= 0) return 0;
    return n + sumToN_b(n - 1);
  };

  const sumToN_c = (n: number): number => {
    return (n * (n + 1)) / 2;
  };

  return <div>Problem1</div>;
};

export default Problem1;
