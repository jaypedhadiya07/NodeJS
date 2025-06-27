// Frist way
const mod = require("./Functions");
console.log(mod.sumFn(2, 2));
console.log(mod.sub(2, 2));

//Second Way
const { sumFn, sub } = require("./Functions");
console.log(sumFn(2, 2));
console.log(sub(2, 2));
