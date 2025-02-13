/**
 * 
 * @param {String} firstName 
 * @param {String} surName 
 * @param {Boolean} userFormalName 
 
 */


//created a function to get the full name of a person
const getFullName=(firstName,lastName, userFormalName)=>{

    
  if(userFormalName){
    return 'Lord ' + firstName + ' ' + lastName;
}
if(firstName===''){
    return 'Please enter your first name';
}
if(lastName===''){
    return 'Please enter your last name';
}
return firstName + ' ' + lastName;
  
}
//calling the function with two different names and userFormalName as true and false
const fullName1=getFullName('Hajar','El Mhassani',true);
const fullNam2=getFullName('Yasmin','Atik',false);

//calling functowwith no userFormalName to see the default value
const fullNam3=getFullName('Ali','Atik');
//printing the results
console.log(fullName1);
console.log(fullNam2);

/**
 * to this function works also for women, we can add a condition to check if the user is a woman or not
 * and add the title 'Lady' if the user is a woman and 'Lord' if the user is a man 
 * or we can add a title parameter to the function to specify the title of the user 
 * and add a condition to check if the user is a woman or not and add the title to the name
 * or we can use userFormalName as a title  string to add a condition to check if the user is a woman or not 
const getFullName=(firstName, lastName, userFormalName) =>{
    if(userFormalName==='male'){
        return 'Lord ' + firstName + ' ' + lastName;
    }
    else if(userFormalName==='female'){
        return 'Lady ' + firstName + ' ' + lastName;
    }
    else if(!firstName){
        return 'Please enter your first name';
    }
    else if (!lastName){
        return 'Please enter your last name';
    }
    else{
    return firstName + ' ' + lastName;
}
}
*/