// const foo = (s1, s2) => callback(s1 + s2);
// const callback = (result) => "Callback : " + result;
// console.log(foo("Foo", "Bar", callback));
// console.log("Callback: ", "Foo", "Bar");
/* - - - - - - - -  - - - - - - - - - - - -  - - - - */

// function foo() {
//   return "Foo";
// }
// console.log(setTimeout(foo, 1000));
/* - - - - - - - -  - - - - - - - - - - - -  - - - - */

// const foo = (s1, s2, callback) => {
//   setTimeout((s1, s2) => callback(s1 + s2), 1000);
// };
// callback = (result) => console.log(result);
// foo("Foo", "Bar", callback);
/* - - - - - - - -  - - - - - - - - - - - -  - - - - */

const foo = (s1, s2) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(s1, s2);
    }, 1000);
  });
};
foo("Foo", "Bar").then((result) => console.log(result));

const callFoo = () => {
  console.log(foo(""));
};
