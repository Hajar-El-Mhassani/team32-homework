// Remove items from array
const names = [
    "Peter",
    "Ahmad",
    "Yana",
    "kristina",
    "Rasmus",
    "Samuel",
    "Ahmad",
    "katrine",
    "Tala",
  ];

  
  // Write some code here
   const removeItem = (item)=>{
   
    for(let i =names.length -1; i>=0; i--){
        const name=names[i];
      
        if(name===item){
            names.splice(i,1);
           
        }
       
    }
    return names;
  } 

  const nameToRemove = "Rasmus";
  
 removeItem(nameToRemove);

  console.log(names); 

// When we will be there
 //Fisrt way
const travelInformation = {
    speed: 50,
    destinationDistance: 432,
    getTimeOfDistination: function(){
        let travelTime=0;
        if(this.speed ===0){
            return `The speed shoud be greater than 0`;
        }
        else if(this.destinationDistance===0){
            return travelTime;
        }
        else if(this.speed===0 && this.destinationDistance===0){
            return travelTime;
        }
         
      else{

        travelTime=this.destinationDistance / this.speed;
     // Convert timeTravel to hours and minutes

     let hours=Math.floor(travelTime);
     let minutes=Math.floor((travelTime - hours) * 60);
     return `${hours} hours and ${minutes} minutes`;

    }

  }

}

const travelTime =travelInformation.getTimeOfDistination();
console.log(travelTime);

//Second way
 const travelInfo={
    speed: 50,
    destinationDistance: 432,
 }
 const getTimeDistination=(obj)=>{

    let speed=obj.speed;
    let distance= obj.destinationDistance;
    let travelTime=0;

if(speed ===0){
            return `The speed shoud be greater than 0`;
        }
        else if(distance===0){
            return travelTime;
        }
        else if(speed===0 && distance===0){
            return travelTime;
        }
         
      else{

        travelTime=distance / speed;
     // Convert timeTravel to hours and minutes
        
     let hours=Math.floor(travelTime);
     let minutes=Math.floor((travelTime - hours) * 60);
     return `${hours} hours and ${minutes} minutes`;

    }
 }

 const timeTravel= getTimeDistination(travelInfo);
 console.log(timeTravel);

//series duration of my life

const seriesDurations = [
    {
      title: "Game of thrones",
      days: 3,
      hours: 1,
      minutes: 0,
    },
    {
      title: "Sopranos",
      days: 3,
      hours: 14,
      minutes: 0,
    },
    {
      title: "The Wire",
      days: 2,
      hours: 12,
      minutes: 0,
    },
  ];

  const logOutSeriesText=() =>{
   
    
    let totalOfSerie=0;
    const lifespan=80;
    for(let i=0; i< seriesDurations.length; i++){
        const  series= seriesDurations[i];
         let hours=series.hours/24;
         let minutes= series.minutes /1440;

         let totalDay=series.days+ hours + minutes;
         let totalYears= totalDay / 365;
     
       let percentageOfLife =Math.floor(((totalYears / lifespan) * 100)*1000)/1000;
     
        console.log(`${series.title} took ${percentageOfLife}% of my life`)
        totalOfSerie += percentageOfLife
        //rounded with 1 decimal
        totalOfSerie = Math.ceil(totalOfSerie * 10) / 10;
      
    }
     
    console.log(`In total is ${totalOfSerie}% of my life`)
  }

  logOutSeriesText();
  