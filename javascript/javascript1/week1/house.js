// A house price estimator

  // for Peter
  let peterVolumeInMeters=10*10*8;
  let peterGardenSizeInM2=100;
  const peterCost=2500000;
  const PeterHousePrice=PeterVolumeInMeters*2.5*1000+PeterGardenSizeInM2*300;
  console.log("Peter calculated it will cost "+PeterHousePrice);
  if(PeterHousePrice<peterCost){
      console.log("Peter will pay too much for a house");
  }
  else
  if(PeterHousePrice>peterCost){
      console.log("Peter will pay too little for a house");
  }
  else{
      console.log("Peter will pay is a good price for a house");
  }
   // For Julia
  let juliaVolumeInMeters=5*11*8;
  let juliaGardenSizeInM2=70;
  const juliaCost=1000000;
  const juliaHousePrice=juliaVolumeInMeters*2.5*1000+juliaGardenSizeInM2*300;
  console.log("Julyie calculated it will cost "+juliaHousePrice);
  
  if(juliaHousePrice<juliaCost){   
   console.log("Julyie will pay too much for a house");
  }
  else if(juliaHousePrice>juliaCost){
      console.log("Julyie will pay too little for a house");
  }
  else{
      console.log("Julyie will pay is a good price for a house");
  }