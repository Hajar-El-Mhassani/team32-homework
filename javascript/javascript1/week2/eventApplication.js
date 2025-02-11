
/**
 * 
 * @param {Number} event 
 * @returns 
 */
// Function to get the weekday of an event fx today is sunday so the event is on wednesday
const getEventWeekday = (event) => {    

    // get the current date
    const date = new Date();
     
    //get the day of the week form the current date
    const dayOfWeekNumber =  date.getDay();
    //array of days
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //get the day name from the array
    const dayName= days[dayOfWeekNumber]
    //if the day name is true print the day name and the event day
    if (dayName) {
        console.log('Today is: ' + dayName);  
        //add the event day to the current day
        event = dayOfWeekNumber+ event;
       

    } 
    //if the event is more than 6 days we use the modulo operator to get the event day
     if (event>6){

        event = event % days.length;
       console.log('The event is on: ' + days[event]);
     
    }
   //get the event day from the array
   return days[event];
    
}
console.log(getEventWeekday(10));     