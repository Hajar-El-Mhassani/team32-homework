// Count vowels
function getCount(str) {
  if (/[A-Z]/.test(str)) {
    return "Input must be in lowercase";
  } else {
    let count = 0;
    let vowels = ["a", "e", "i", "o", "u"];
    for (let i = 0; i < str.length; i++) {
      if (vowels.includes(str[i])) {
        count++;
      }
    }

    return count;
  }
}

console.log(getCount("hajar el mhassani"));

//Square Every Digit
function squareDigits(num) {
  let numStr = num.toString();
  let square = "";
  let concat = "";
  for (let i = 0; i < numStr.length; i++) {
    square = numStr[i] * numStr[i];
    concat += square;
  }
  return Number(concat);
}
console.log(squareDigits(9119));

// High and low of number
function highAndLow(numbers) {
  let maxNum = -Infinity;
  let lowNum = Infinity;
  let numberArr = numbers.split(" ");
  for (let i = 0; i < numberArr.length; i++) {
    let currentNum = parseFloat(numberArr[i]);
    if (currentNum > maxNum) {
      maxNum = currentNum;
    }
    if (currentNum < lowNum) {
      lowNum = currentNum;
    }
  }
  return `${maxNum} ${lowNum}`;
}
console.log(highAndLow("1 2 3 4 5 6"));
