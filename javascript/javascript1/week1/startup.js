const firstWodrs=["Awsome","Great","Fantastic","Excellent","Incredible","Corporate","Amazing","Super","Smart","Brilliant"];

const secondWodrs=["Startup", "Corporation", "House", "Company", "Innovation", "Technology", "Enterprise", "Organization", "Group", "Network"];
const randomNumberFirstWord = Math.floor(Math.random() * 10);
const randomNumberSecondWord = Math.floor(Math.random() * 10);

let startupName=firstWodrs[randomNumberFirstWord]+" "+secondWodrs[randomNumberSecondWord];
console.log(`The startup: "${startupName}" contains ${startupName.length} characters`);