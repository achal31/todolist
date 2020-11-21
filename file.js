/*-------------GLOBAL VARIABLES--------------------------------*/
var pendingTaskArray=[];
var completeTaskArray=[];
var rowindex="";
var listtype="";


/*-----------FUNCTION USE TO ADD TASK TO THE PENDING LIST-----------*/
function addTask()
{  
       var taskName=document.getElementById("taskfield").value;
        
       if(document.getElementById("taskfield").value !="")
        {
            pendingTaskArray.push(taskName);
            document.getElementById("taskfield").value="";
            pendingTasklist("","");
        }

}

/*---------------FUNCTION USED TO DELETE THE TASK FROM THE LIST---------*/
function deleteTask(index,type)
{ 

    /*---------------CONDITION USED TO DELETE THE TASK FROM THE PENDING LIST---------*/
    if(type==0)
    {
       pendingTaskArray.splice(index,1);
       pendingTasklist("","");
    }

    /*---------------CONDITION USED TO DELETE THE TASK FROM THE COMPLETED LIST---------*/

    if(type==1)
    {
        completeTaskArray.splice(index,1);
        completeTasklist("",""); 
    }
    
}

/*---------------FUNCTION USED TO EDIT THE SELECTED TASK FROM THE LIST---------*/
function editTask(index,type)
{
    document.getElementById('add').style.display = 'none';
    document.getElementById('update').style.display = 'inline';


    /*---------------CONDITION USED TO EDIT THE TASK FROM THE PENDING LIST---------*/
    if(type==0)
    {
    
        document.getElementById("taskfield").value=pendingTaskArray[index];
        rowindex=index;
        listtype=type;
    }

    /*---------------CONDITION USED TO DELETE THE TASK FROM THE COMPLETED LIST---------*/
    if(type==1)
    {
        document.getElementById("taskfield").value=completeTaskArray[index];
        rowindex=index;
        listtype=type;
    }
    

}

/*---------------FUNCTION USED TO UPDATE THE  SELECTED TASK FROM THE LIST---------*/
function updateTask()
{  
    /*---------------CONDITION USED TO CHECK WHETHER INPUT FIELD IS EMPTY OR NOT---------*/
    if(document.getElementById("taskfield").value!="")
    {

        /*---------------FUNCTION USED TO UPDATE THE  SELECTED TASK FROM THE PENDING LIST---------*/
        if(listtype==0)
        {
            pendingTaskArray[rowindex]=document.getElementById("taskfield").value;
            pendingTasklist("","");
        }

        /*---------------FUNCTION USED TO UPDATE THE  SELECTED TASK FROM THE COMPLETED LIST---------*/
        if(listtype==1)
        {
            completeTaskArray[rowindex]=document.getElementById("taskfield").value;
            completeTasklist("","");
        }
    }
    document.getElementById("taskfield").value="";
    document.getElementById('add').style.display = 'inline';
    document.getElementById('update').style.display = 'none';
}


/*---------------FUNCTION USED TO DISPLAY THE TASK FROM THE PENDING LIST---------*/
function pendingTasklist(value,removeid)
{   

    if(value!="" && removeid!="")
    { 
        completeTaskArray.splice(removeid,1);
        pendingTaskArray.push(value);
        completeTasklist("","");
    }    
    var taskhtml="";
    var i=0;
    taskhtml+='<table><tr><td><h3>PENDING TASK<h3></td></tr>';

    for(i=0;i<pendingTaskArray.length;i++)
{
    taskhtml +='<tr>';
    taskhtml +='<td> <input type="checkbox" id='+i+' value='  + pendingTaskArray[i] + ' onchange=completeTasklist(this.value,this.id); ></td>';
    taskhtml +='<td><h2>' + pendingTaskArray[i]+ '</h2></td>';
    taskhtml +='<td> <button id='+i+' onclick="deleteTask(this.id,0)" class="btn">DELETE </button> </td>';
    taskhtml +='<td> <button id='+i+' onclick="editTask(this.id,0)" class="btn">EDIT</button> </td></tr>';
}

taskhtml +='</table>';

document.getElementById("pendingList").innerHTML=taskhtml;

}

/*---------------FUNCTION USED TO DISPLAY THE TASK FROM THE COMPLETED LIST---------*/
function completeTasklist(value,removeid)
{ 
   
    if(value!="" && removeid!="")
    {    pendingTaskArray.splice(removeid,1);
        completeTaskArray.push(value);
        pendingTasklist("","");
    }
 var taskhtml="";
 var i=0;

 taskhtml+='<table><tr><td><h3>COMPLETED TASK<h3></td></tr>';

 for(i=0;i<completeTaskArray.length;i++)
{
 taskhtml +='<tr>';
 taskhtml +='<td> <input type="checkbox" id='+i+' value='  + completeTaskArray[i] + ' onchange=pendingTasklist(this.value,this.id); checked></td>';
 taskhtml +='<td><h2>' + completeTaskArray[i]+ '</h2></td>';
 taskhtml +='<td> <button id='+i+' onclick="deleteTask(this.id,1)" class="btn">DELETE </button> </td>';
 taskhtml +='<td> <button id='+i+' onclick="editTask(this.id,1)" class="btn">EDIT</button> </td></tr>';
}

taskhtml +='</table>';

document.getElementById("completeList").innerHTML=taskhtml;


}
