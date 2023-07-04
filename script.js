const students = [];

//this will run onload
function getData(){

    let table=getTable();

    students.forEach(value =>{
        addToTable(table,value);
    });
}

//this is used to add the values from the input to table and store in ObjcectArray
function addToTable(table,obj){

    let row=document.createElement("tr");

        let td1=document.createElement("td");
        let td2=document.createElement("td");
        let td3=document.createElement("td");
        let td4=document.createElement("td");
        let td5=document.createElement("td");
        let td6=document.createElement("td");

        td1.innerText=obj.ID;
        td1.className="id";
        td2.innerText=obj.name;
        td2.className="nameValue";
        td3.innerText=obj.email;
        td3.className="emailValue";
        td4.innerText=obj.gpa;
        td5.innerText=obj.age;
        td6.innerText=obj.degree;
        td6.className="degreeValue";

        td6.appendChild(addEditTrash(obj));

        row.appendChild(td1);
        row.appendChild(td2);
        row.appendChild(td3);
        row.appendChild(td4);
        row.appendChild(td5);
        row.appendChild(td6);

        table.appendChild(row);
}


//this is used to append edit and delete icons to each row's last cell
function addEditTrash(obj){
        let button_section = document.createElement("div");
        button_section.className="button-section";

        let editImage=document.createElement("img");
        editImage.src="edit.svg";
        let trashImage=document.createElement("img");
        trashImage.src="trash.svg";
        editImage.className="td-images";
        editImage.className+=" editImage"
        editImage.id=obj.ID;
        editImage.setAttribute("onclick","editClicked(this.id)");
        trashImage.className="td-images";
        trashImage.className +=" trashImage"
        trashImage.id=obj.ID;
        trashImage.setAttribute("onclick","trashClicked(this.id)");

        button_section.appendChild(editImage);
        button_section.appendChild(trashImage);

        return button_section;
}

//onclick event of button will run this function
function buttonFunction(){

    let btn=document.getElementById("button");
    let btnValue=btn.value;

    //if The Operation is Add Student below will run
    if(btnValue==="Add Student"){

        let name=document.getElementById("name").value;
        let age=document.getElementById("age").value;
        let gpa=document.getElementById("gpa").value;
        let degree=document.getElementById("degree").value;
        let email=document.getElementById("email").value;

        //Checking all the input values have valid values
        if(name===""||age===""||gpa===""||degree===""||email===""){
            alert("ALl Fields Are Required");
            return;
        }

        let studentObject={};
        studentObject.ID=students.length+1;
        studentObject.name=name;
        studentObject.age=age;
        studentObject.gpa=gpa;
        studentObject.degree=degree;
        studentObject.email=email;

        students.push(studentObject);
        let table=getTable();
        addToTable(table,studentObject);
        resetValue();
    }

    //if The Operation is Edit Student below will run
    if(btnValue==="Edit Student"){

        let name=document.getElementById("name").value;
        let age=document.getElementById("age").value;
        let gpa=document.getElementById("gpa").value;
        let degree=document.getElementById("degree").value;
        let email=document.getElementById("email").value;

        //Checking all the input values have valid values
        if(name===""||age===""||gpa===""||degree===""||email===""){
            alert("ALl Fields Are Required");
            return;
        }

        students.forEach((studentObject)=>{
            if(studentObject.ID == studentIdMain){
                studentObject.ID=studentIdMain;
                studentObject.name=name;
                studentObject.age=age;
                studentObject.gpa=gpa;
                studentObject.degree=degree;
                studentObject.email=email;

                updateToTable(studentObject);
                studentIdMain="";
                return;
            }
        })
        
    }
}


//this is will update the cells inside the row of an table
function updateToTable(obj){

    let row=rowFinder(false,obj.ID);

    row.cells[0].innerText=obj.ID;
    row.cells[1].innerText=obj.name;
    row.cells[2].innerText=obj.email;
    row.cells[3].innerText=obj.gpa;
    row.cells[4].innerText=obj.age;
    row.cells[5].innerText=obj.degree;
    row.cells[5].appendChild(addEditTrash(obj));

    resetValue();

    document.getElementById("button").value="Add Student";
}


//resetting all the values in inputs
function resetValue(){
    document.getElementById("name").value="";
    document.getElementById("age").value="";
    document.getElementById("gpa").value="";
    document.getElementById("degree").value="";
    document.getElementById("email").value="";
}

//if edit button clicked in any row this will run
function editClicked(elementId){

    document.getElementById("button").value="Edit Student";

    let row=rowFinder(false,elementId);

    addValuesToTextBoxes(row);
    
}

var studentIdMain;


//gets the values from the required row cells then added those in the inputs
function addValuesToTextBoxes(row){

    let id=row.cells[0].innerText;
    studentIdMain=id;
    let name=row.cells[1].innerText;
    let email=row.cells[2].innerText;
    let gpa=row.cells[3].innerText;
    let age=row.cells[4].innerText;
    let degree=row.cells[5].innerText;

    document.getElementById("name").value=name;
    document.getElementById("age").value=age;
    document.getElementById("gpa").value=gpa;
    document.getElementById("degree").value=degree;
    document.getElementById("email").value=email; 

}

//if delete button clicked in any row this will run
function trashClicked(ele){
    let table=getTable();
    let ind=rowFinder(true,ele);
    table.deleteRow(ind);
    deleteFromStudents(ele);
}

//deletes the object from the Array
function deleteFromStudents(ele){
    let i=students.length;
    while(i-- > -1){
        if(students[i].ID==ele){
            students.splice(i,1);
            break;
        }
    }
}

//getting the table element
function getTable(){
    return document.getElementById("table");
}

//this is used to find the row in which the user clicked edit or delete buttons
function rowFinder(toDelete,elementId){
    let table=getTable();
    let rows=table.rows;
    let rowsId=document.getElementsByClassName("id");
    for(let i=0;i<rows.length-1;i++){
        if(elementId==rowsId[i].innerText){
            if(toDelete){
                return i+1;
            }
            else{
                return rows[i+1];
            }
            break;
        }
    }
}


//this is the function searchs for the record in the tables according to the search value types
function searchInRow(){

    let input=document.getElementById("search").value.toLowerCase();

    let namesInRows=document.getElementsByClassName("nameValue");
    let emailsInRows=document.getElementsByClassName("emailValue");
    let degreeInRows=document.getElementsByClassName("degreeValue");

    let tableRows=getTable().rows;

    let lenn=tableRows.length;

    for(let i=0;i<lenn-1;i++){
        
        let nameValue=namesInRows[i].innerText.toLowerCase();
        let emailValue=emailsInRows[i].innerText.toLowerCase();
        let degreeValue=degreeInRows[i].innerText.toLowerCase();

        if(nameValue.indexOf(input)>-1 || emailValue.indexOf(input)>-1 || degreeValue.indexOf(input)>-1){
            tableRows[i+1].style.display="";
        }
        else{
            tableRows[i+1].style.display="none";
        }
    }
}
