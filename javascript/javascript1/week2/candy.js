 const boughtCandyPrices = [];
 const addCandy=(candyType, weight)=>{

    let totalPrice = 0;
    if(candyType === 'sweet'){
        totalPrice = weight*0.5;
    
    }
    else if(candyType === 'chocolate'){
        totalPrice = weight*0.7;
    }
    else if(candyType === 'toffee'){
        totalPrice = weight*1.1;
    }
    else if(candyType === 'chewing-gum'){
        totalPrice = weight*0.03;
    }
    else{
        console.log('Invalid candy type');
    }
    boughtCandyPrices.push(totalPrice);
   return '[ '+candyType+' '+weight+'g '+totalPrice+' ]';
 }
    console.log(addCandy('sweet', 20));
    console.log(addCandy('chocolate', 10));
    console.log(addCandy('toffee', 30));
    console.log(addCandy('chewing-gum', 50));
    console.log(boughtCandyPrices);
  