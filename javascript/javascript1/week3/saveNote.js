
let notes=[];
 const saveNote=(content, id) =>{

    let obj={};
    
    if(!content || content.trim()==='')  
        {
        return 'Note is empty, Please enter a note';
    }
    if(typeof id ==='undefined' ){
        return 'Please enter an ID for the note';
      }
  

    if (id <=0 || !Number.isInteger(id)){
        return 'ID must be positive and greater than 0';
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
console.log(saveNote());

console.log(notes)
