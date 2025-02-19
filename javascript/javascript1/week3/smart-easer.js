
let notes=[];
 const saveNote=(content, id) =>{

    let obj={};
    // check if content  empty or white space
    if(!content || content.trim()==='')  
        {
        return 'Note is empty, Please enter a note';
    }
    // check if id is undefined
    if(typeof id ==='undefined' ){
        return 'Please enter an ID for the note';
      }
  
  //check if id is valid
    if (id <=0 || !Number.isInteger(id)){
        return 'ID must be positive and greater than 0';
    }
    // check id id of the note is already in the array
    if (notes.find(note => note.id === id)) {
        return "ID already exists. Please use a unique ID.";
    }

        content= content.toString().trim();
        obj['content']=content;
        obj['id']=id;
       notes.push(obj);
       return true;

    }
 
   
 
console.log(saveNote('hs',7.27));
console.log(saveNote('hsh'));
console.log(saveNote('My nmae is Hajar',1));
console.log(saveNote('My name is Ali',2));
console.log(saveNote('my Name id Yasmin',3));
console.log(saveNote('my Name id Yasmin',3));
console.log(saveNote('Hello World',4));
console.log(saveNote());

console.log(notes)


//get note by ID
const getNote= (id)=>{

    // check if id is undefined
    if(typeof id === 'undefined'){
        return 'Please enter an ID';
    }
    // check if id is valid
    if(id <=0 || !Number.isInteger(id)){
        return 'ID must be positive and greater than 0';
    }
    for (let i=0; i<notes.length; i++){
        let note=notes[i];
        if(note['id']===id){
            return notes[i];
        }
      }
     
        return `This ${id} does not exist in the notes`;
    
}

const firstNote= getNote(2);
const secondNote= getNote(5);
const thirdNote= getNote(7);
const fourthNote= getNote(4);
const fifthNote= getNote(0);
const sixthNote= getNote();
console.log(firstNote);
console.log(secondNote);
console.log(thirdNote);
console.log(fourthNote);
console.log(fifthNote);
console.log(sixthNote);