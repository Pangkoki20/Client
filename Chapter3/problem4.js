// use .map to create new number array

const strArr = ["1", "2", "3", "4", "5", "6", "7"];
console.log(strArr);

const numArr = strArr.map((number) => {
  return parseInt(number);
});

console.log(numArr);

// output => [1,2,3,4,5,6,7]
