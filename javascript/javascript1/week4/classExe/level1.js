// Level 1 - Regular Difficulty

// 1.1 Implement Student Grades

//Create Student Objects

const createStudent = (name, age, grades = []) => {
  return {
    name: name,
    age: age,
    grades: grades,
    addGrade: function (newGrade) {
      this.grades.push(newGrade);
    },
  };
};
const studet = createStudent("Alice", 20, [90, 85, 78]);
console.log(studet);
console.log("Before adding new grade:", studet.grades);

studet.addGrade(95);
console.log("After adding new grade:", studet.grades);
//Store Students in an Array
let students = [];

const addToArray = () => {
  students.push(createStudent("Hajar", 29, [45, 78, 12]));
  students.push(createStudent("Ali", 46, [12, 45, 13]));
  students.push(createStudent("Yasmin", 7, [12, 34, 12]));
  students.push(createStudent("Asmahan", 26, [12, 34, 12]));
  return students;
};

console.log(addToArray());
console.log(students);
//Calculate Average Grade
const calculateAverageGrade = (student) => {
  if (!student || typeof student !== "object") {
    return "Please Enter an object";
  }
  if (Object.keys(student).length === 0) {
    return "The object is empty, Please enter information";
  }
  if (!student.grades || student.grades.length === 0) {
    return "The grades of student are not exist";
  }
  let sum = 0;
  for (let i = 0; i < student.grades.length; i++) {
    sum += student.grades[i];
  }
  return sum / student.grades.length;
};

const student = {
  Title: "Alice",
  Age: 20,
  grades: [10, 10, 10],
};
console.log(calculateAverageGrade(student));

//find top student

const findTopStudent = (stud) => {
  let maxGrade = -Infinity;
  for (let i = 0; i < stud.length; i++) {
    let average = calculateAverageGrade(stud[i]);
    console.log("average", average);
    if (average > maxGrade) {
      maxGrade = average;
    }
  }
  return maxGrade;
};
const stud = [
  { name: "Hajar", Age: 29, grades: [45, 7, 12] },
  { name: "Ali", Age: 46, grades: [12, 45, 13] },
  { name: "Yasmin", Age: 7, grades: [18, 34, 12] },
  { name: "Asmahan", Age: 26, grades: [12, 34, 12] },
];
console.log(findTopStudent(stud));

//Display Student Information
const displayStudentInfo = (studd) => {
  return `"${studd.name}, Age:${
    studd.Age
  }, Average grade :${calculateAverageGrade(studd)}"`;
};

console.log(displayStudentInfo(stud[0]));
console.log(displayStudentInfo(stud[1]));
console.log(displayStudentInfo(stud[2]));
console.log(displayStudentInfo(stud[3]));

// reviewing code
const a = 10;
const b = -10;
const c = "100";
const d = "no";
const e = {
  name: "John",
};
const f = [1, 2, 3];
const h = true;

// guess the output of the following statements
console.log("#1", a + a);
console.log("#2", a + b);
console.log("#3", a + c);
console.log("#4", a + d);
console.log("#5", a + e);
console.log("#6", a + e["name"]);
console.log("#7", a + e["age"]);
console.log("#8", a + f);
console.log("#9", a + f[1]);
console.log("#10", a + h);

//  1.4 Troubleshoot issue with grades
function calculateAverageGrad(students) {
  let total = 0;
  let count = 0;

  for (let i = 0; i < students.length; i++) {
    let grade = students[i].grade;

    if (typeof grade === "number" && grade > 0) {
      total += grade;
      count++;
    } else {
      console.log("Invalid grade for student: " + students[i].name);
    }
  }

  return count > 0 ? total / count : 0;
}

let studentsList = [
  { name: "Alice", grade: 90 },
  { name: "Bob", grade: -10 },
  { name: "Charlie", grade: 85 },
  { name: "David", grade: 100 },
  { name: "Eva", grade: "A" },
];

console.log("Average grade:", calculateAverageGrad(studentsList));
//  1.5 Implement a Recipe Management System
