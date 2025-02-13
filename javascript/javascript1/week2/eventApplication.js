
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
    
   if( typeof event !== 'number'){
        return 'Please enter a number';
    }
 if(event === 0){
        return 'Today is: ' + weeksDays[todayNumber];
    }

    let eventDay=(todayNumber + event) % weeksDays.length;
    if(eventDay<0){
        eventDay += weeksDays.length;
    }

  return weeksDays[eventDay];
}

    

console.log(getEventWeekday(10));
console.log(getEventWeekday(0));
console.log(getEventWeekday(-1));     