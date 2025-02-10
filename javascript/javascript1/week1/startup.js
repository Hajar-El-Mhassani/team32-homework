const firstWords=["Awsome","Great","Fantastic","Excellent","Incredible","Corporate","Amazing","Super","Smart","Brilliant"];

const secondWords=["Startup", "Corporation", "House", "Company", "Innovation", "Technology", "Enterprise", "Organization", "Group", "Network"];
const randomNumberFirstWord = Math.floor(Math.random() * 10);
const randomNumberSecondWord = Math.floor(Math.random() * 10);

let startupName=firstWords[randomNumberFirstWord]+" "+secondWords[randomNumberSecondWord];
console.log(`The startup: "${startupName}" contains ${startupName.length} characters`);