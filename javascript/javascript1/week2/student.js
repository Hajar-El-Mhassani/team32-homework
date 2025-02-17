const class07Students = [];
function addStudentToClass(studentName) {
  // You write code here
  studentName= studentName.trim();
 if(studentName ===''){
    return 'You cannot add an empty string to a class';
  }
  if(class07Students.includes(studentName) && studentName !== 'Queen'){
        return 'Student '+studentName+' is already in the class';
 }
   if(class07Students.length >= 6 && studentName !== 'Queen'){
        return 'Cannot add more students to class 07';
    }
 
 class07Students.push(studentName);
 return 'Student ' + studentName + ' added successfully';
    
   
    
}

function getNumberOfStudents() {
  // You write code here
  return 'Number of students: ' + class07Students.length;

}



console.log(addStudentToClass(' Ali '));
console.log(addStudentToClass('Queen'));
console.log(addStudentToClass('Queen'));
console.log(addStudentToClass('Queen'));
console.log(addStudentToClass('Hajar'));
console.log(addStudentToClass('Hajar'));
console.log(addStudentToClass('Ali'));
console.log(addStudentToClass('Yasmin'));
console.log(addStudentToClass('Sara'));
console.log(addStudentToClass('Sofia'));
console.log(addStudentToClass(''));
console.log(addStudentToClass('Queen'));
console.log(addStudentToClass('Queen'));
console.log(addStudentToClass('Mariam'));


console.log(class07Students);
console.log(getNumberOfStudents());


