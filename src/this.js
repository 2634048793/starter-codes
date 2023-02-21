// function createObj() {
//   const that = {};
//   that.name = ''
//   that.age = ''
//   return that;
// }

// const obj = createObj();
// const obj2 = createObj();

// obj.name = "Long";
// obj2.name = "Yun";

// console.log(obj.name);
// console.log(obj2.name);

function Obj() {
  this.name = "";
  this.age = "";
  console.log("123");
}

const obj = new Obj();
const obj2 = new Obj();

obj.name = "Long";
obj2.name = "Yun";

console.log(obj.name);
console.log(obj2.name);
