
/**
 * 
 * @param {Number} event 
 * @returns 
 */
// Function to get the weekday of an event fx today is sunday so the event is on wednesday
const getEventWeekday = (event) => {    

    const date = new Date();
    const todayNumber= date.getDay();
    const weeksDays=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
   
    //if the event is not a number we return a message to enter a number
   if( typeof event !== 'number'){
        return 'Please enter a number';
    }
    //if the event is 0 we return the day of today
 if(event === 0){
        return 'Today is: ' + weeksDays[todayNumber];
    }
 //eventDay is the day of the event and to ensure that the eventDay is between 0 and 6 we use %
    let eventDay=(todayNumber + event) % weeksDays.length;
//if the eventDay is negative we add the length of the array to it to get the right day
    if(eventDay<0){
        eventDay += weeksDays.length;
    }

  return weeksDays[eventDay];
}

    

console.log(getEventWeekday(10));
console.log(getEventWeekday(0));
console.log(getEventWeekday(-50));     