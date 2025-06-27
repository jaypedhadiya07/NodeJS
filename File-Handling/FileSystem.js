const fs = require("fs");

const os = require("os");
console.log(os.cpus().length); // 12

/* write FILE */

// Sync...  Blocking Operations
fs.writeFileSync("./text.txt", "jay");
// Async... Non-Blocking Operations
fs.writeFile("./text.txt", "raj", (erro) => {});

/* read FILE */

// Sync... Blocking Operations return value
// const contacts = fs.readFileSync("./Contact.txt", "utf-8");
// console.log(contacts);

// Async...   NoN-Blocking Operations
// fs.readFile("./Contact.txt", "utf-8", (error, result) => {
//   if (error) {
//     console.log("Error", error);
//   } else {
//     console.log(result);
//   }
// });

//How To Work Sync & Async Opretion

// //Blocking Operations and OUTPUT is 1,2,CONTACT DATA,3,4
// console.log(1);
// console.log(2);
// const contacts = fs.readFileSync("./Contact.txt", "utf-8");
// console.log(contacts);
// console.log(3);
// console.log(4);

//NON-Blocking ... and hi OUTPUT is 1,2,3,4,CONTACT DATA
// console.log(1);
// console.log(2);
// fs.readFile("./Contact.txt", "utf-8", (error, result) => {
//   if (error) {
//     console.log("Error", error);
//   } else {
//     console.log(result);
//   }
// });
// console.log(3);
// console.log(4);

/* append Data */
// fs.appendFileSync("./Contact.txt", "jay")
// fs.appendFile("./Contact.txt", `${Date.now()} \n`, (error) => {});
// fs.cpSync("./Contact.txt", "Contact2.txt");
// fs.unlinkSync("./Contact2.txt");
// console.log(fs.statSync("./Contact.txt"));
// fs.mkdirSync("./my.txt"); //Create NEW folder