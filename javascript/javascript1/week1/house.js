// A house price estimator

  // for Peter
  let PeterVolumeInMeters=10*10*8;
  let PeterGardenSizeInM2=100;
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
   // For Julyie
  let JulyieVolumeInMeters=5*11*8;
  let JulyieGardenSizeInM2=70;
  const JulyieCost=1000000;
  const JulyieHousePrice=JulyieVolumeInMeters*2.5*1000+JulyieGardenSizeInM2*300;
  console.log("Julyie calculated it will cost "+JulyieHousePrice);
  
  if(JulyieHousePrice<JulyieCost){   
   console.log("Julyie will pay too much for a house");
  }
  else if(JulyieHousePrice>JulyieCost){
      console.log("Julyie will pay too little for a house");
  }
  else{
      console.log("Julyie will pay is a good price for a house");
  }