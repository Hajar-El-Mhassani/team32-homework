// Get the array of  arggements passed on the command line
const args = process.argv.slice(2);

// check if there are any arguments
if (args.length === 0) {
  console.log(" NO numbers provided");
  process.exit(1);
}
let sum = 0;
let count = 0;
// check if all arguments are numbers
let InvalidArg = [];

for (let i = 0; i < args.length; i++) {
  // check if the argument is a number if not push it to the InvalidArg array
  if (isNaN(args[i]) && args[i] !== "") {
    console.log("Invalid argument");
    InvalidArg.push(args[i]);
    process.exit(1);
  } else {
    sum += parseFloat(args[i]);
    count++;
  }
}
if (count > 0) {
  const avg = (sum / args.length).toFixed(0);
  console.log("Average: ", avg);
}
