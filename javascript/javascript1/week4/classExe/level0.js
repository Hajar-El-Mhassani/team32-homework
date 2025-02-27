// 0.1 Running your Javascript

console.log("Hello World!");
console.warn("Something is about to happen...");
console.error("KABOOOOM");

// 0.2 Variables & Scope

//1
const name = "Hajar";
const age = 29;
const isStudent = true;

//2

const name1 = "Alice";
const age2 = 16;
const country = "USA";
let message = "";
let personStatus = "";

if (age < 18) {
  personStatus = "minor";
} else {
  personStatus = "adult";
}

message = `${name1} is a ${personStatus} from ${country}.`;

console.log(message);

//3
const canISee = true;
let room;
if (canISee) {
  room = "This room is not dark";
} else {
  room = "This room is pitch black";
}
console.log(room);

//0.3 Data types

//1

const lastName = "El Mhassani";
const teamName = "Team32";
const teamNumber = 32;
const isMentor = false;
const obj = null;
const arr = [1, 2, 3, 3, 3, 3, , 3, , 4, 4, 4];
const person = {
  name: "Hajar",
  lastName: "El Mhassani",
  age: 30,
  isStuedent: true,
};
const unden = undefined;
const num = 0;
let student;
const empt = "";
//2
console.log(typeof person);
console.log(typeof arr);
console.log(typeof obj);
console.log(typeof lastName);
console.log(typeof teamName);
console.log(typeof teamNumber);
console.log(typeof isMentor);
console.log(typeof student);
console.log(typeof unden);
console.log(typeof num);
console.log(typeof empt);

//3
const a = 10;
const b = -10;
const c = "100";
const d = "no";
const e = true;
const f = false;
const g = null;

console.log("#1", a + a, typeof (a + a)); // output is "#1 20 number"

// guess the output of the following statements
console.log("#2", a + b, typeof (a + b));
console.log("#3", a + c, typeof (a + c));
console.log("#4", a + d, typeof (a + d));
console.log("#5", a + e, typeof (a + e));
console.log("#6", a + f, typeof (a + f));
console.log("#7", a + g, typeof (a + g));

//0.4 Conditions

//1
const checkAge = (age) => {
  if (typeof age === "undefined") {
    return "Please enter an age";
  } else if (age <= 0 || !Number.isInteger(age)) {
    return "Age must be positive and greater than 0";
  } else if (age > 0 && age <= 12) {
    return "It is a child";
  } else if (age > 12 && age <= 19) {
    return "It is a teenager";
  } else {
    return "It is adult";
  }
};

console.log(checkAge(20));

//2
const checkNumber = (number) => {
  if (typeof number === "undefined") {
    return "Please enter an age";
  } else if (!Number.isInteger(number)) {
    return "Number must be a number";
  } else if (number === 0) {
    return `Zero`;
  } else if (number < 0) {
    return `The ${number} is Negative`;
  } else if (number >= 0) {
    return `The ${number} is Positive`;
  } else {
    return "Invalid Number";
  }
};
console.log(checkNumber(0));
console.log(checkNumber(1));
console.log(checkNumber(-2));
console.log(checkNumber());
console.log(checkNumber(777));
console.log(checkNumber("uhj"));
console.log(checkNumber());

// 3

const checkLeapYear = (year) => {
  if (year % 4 === 0) {
    if (year % 100 === 0) {
      if (year % 400 === 0) {
        return `${year} is a leap year`;
      } else {
        return `${year} is not a leap year`;
      }
    } else {
      return `${year} is a leap year`;
    }
  } else {
    return `${year} is not a leap year`;
  }
};

const checkLeap = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return true;
  } else {
    return false;
  }
};

console.log(checkLeapYear(1700));
console.log(checkLeapYear(1800));
console.log(checkLeapYear(1900));
console.log(checkLeapYear(1700));
console.log(checkLeapYear(2000));

console.log(checkLeap(1700));
console.log(checkLeap(1800));
console.log(checkLeap(1900));
console.log(checkLeap(1700));
console.log(checkLeap(2000));

// Loop
for (let i = 0; i <= 10; i++) {
  console.log(i);
}
for (let i = 10; i >= 0; i--) {
  console.log(i);
}
for (let i = 0; i <= 20; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}
const names = ["john", "jane", "joe"];

for (let element of names) {
  console.log(element);
}
// Arrays
//1
const food = ["Couscous", "Harira", "Tajine", "Laks", "Fish", "Vegetables"];
for (let i = 0; i <= food.length - 1; i++) {
  console.log(food[i]);
}
//2
const sumOfNumbers = (numbers) => {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum = sum + numbers[i];
  }
  return sum;
};
console.log(sumOfNumbers([5, 10, -98, 17.5, 365, -2.5]));

//3
const numbers2 = [10, 20, 30, 40, 50];
const addNumber = () => {
  for (let i = 0; i < numbers2.length; i++) {
    numbers2[numbers2.length - 1] = 60;
  }
  return numbers2;
};
console.log(addNumber());
const addNumber1 = () => {
  for (let i = 0; i < numbers2.length; i++) {
    numbers2.pop();
    numbers2.push(60);
  }
  return numbers2;
};
console.log(addNumber1());

// Largest number in array
const largestNumber = (numbers) => {
  let maxNumber = -Infinity;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] > maxNumber) {
      maxNumber = numbers[i];
      console.log("maxNumber", maxNumber);
    }
  }
  return maxNumber;
};
console.log(largestNumber([5, 10, 17.5, 30, 50, 400]));

//Objects
const book = {
  title: "10 teps of success",
  author: "Ahmed el fakih",
  yearsPublished: 2019,

  takeObject: function () {
    return `${this.title} by ${this.author}, published in ${this.yearsPublished}`;
  },
  getAge: function () {
    let date = new Date();
    let year = date.getFullYear();
    return `The old of the book is ${year - this.yearsPublished} years`;
  },
};
const takeObject = (obj) => {
  return `${obj.title} by ${obj.author}, published in ${obj.yearsPublished}`;
};
console.log(book.takeObject());
console.log(takeObject(book));
console.log(book.getAge());

const getBookTitle = (arr) => {
  let bookArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    let titl = obj.title;
    bookArr.push(titl);
  }
  return bookArr;
};
const bookArray = [
  {
    title: "10 teps of success",
    author: "Ahmed el fakih",
    yearsPublished: 2019,
  },
  {
    title: "10 keys of success",
    author: "Ahmed el fakih",
    yearsPublished: 2019,
  },
  {
    title: "Confident",
    author: "Ahmed el fakih",
    yearsPublished: 2019,
  },
  {
    title: "Develepment",
    author: "Ahmed el fakih",
    yearsPublished: 2019,
  },
];
console.log(getBookTitle(bookArray));

//Functions
const greet = (name) => {
  return `Hello, ${name}`;
};

console.log(greet("Hajar"));
console.log(greet("Hajar"));
console.log(greet("Ali"));
console.log(greet("Ali"));
console.log(greet("Ali"));

//sum two number

const add = (num1, num2) => {
  return `${num1} + ${num2} = ${num1 + num2}`;
};

console.log(add(5, 8));
console.log(add(5, 3));
console.log(add(3, 8));

//Square of number

const square = (num) => {
  return num * num;
};
const sumOfSquares = (num1, num2) => {
  let squarNum1 = square(num1);
  let squarNum2 = square(num2);

  return `${squarNum1} + ${squarNum2} = ${squarNum1 + squarNum2}`;
};

console.log(sumOfSquares(3, 4));
