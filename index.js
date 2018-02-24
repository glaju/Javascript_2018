var todoContainer = document.getElementById("todo-container");
var todos = [];
function addTodo(todo){
    todo = todo || {};
    if (typeof todo.label !== "string"){
        throw new Error("todo.label must be a string");
    }
    if (typeof todo.done !== "boolean"){
        throw new Error("todo.done must be a boolean");
    }

    todos.push(todo);

    const todoElem=document.createElement("div");
    
    todoElem.className = "listitem";
    const todoText = document.createTextNode(todo.label);
    todoElem.id = todo.label;

    if(todo.done){
        todoElem.style.textDecoration = "line-through";
        todoElem.style.textTransform = "lowercase";
    }
    else{
        todoElem.style.textTransform = "uppercase";
    }
    todoElem.appendChild(todoText);
    todoElem.addEventListener("click", function(){
        todo.done = !todo.done;
        if(todo.done){
            todoElem.style.textDecoration ="line-through";
            todoElem.style.textTransform = "lowercase";
        }else{
            todoElem.style.textDecoration ="";
            todoElem.style.textTransform = "uppercase";
        }
        save();
    })
    todoContainer.appendChild(todoElem);
    save();
   


}
function save(){
    const json = JSON.stringify(todos);
    
    localStorage.setItem("todo-state",json);
}

function rmTodo(rm_label){
      
	todos = todos.filter(function(todo) {
    return !(todo.label === rm_label );})
    
    todoContainer.removeChild( document.getElementById(rm_label));
    save();

}


document.getElementById("remove-button").addEventListener("click", function(){
    const rmItem= document.getElementById("remove-input").value.trim();
    if(!rmItem){
        return;
    }
    if(rmItem === "all"){
        while (todoContainer.firstChild) {
            todoContainer.removeChild(todoContainer.firstChild);
        }
        todos=[];
        return;
    }
    rmTodo(rmItem);
})
document.getElementById("add-button").addEventListener("click", function(){
    const newTodo = document.getElementById("todo-input").value.trim();
    if(!newTodo){
        return;
    }
    addTodo({
        label: newTodo,
        done: false
    });
})

const savedJson = localStorage.getItem("todo-state");

if(savedJson){
    const lastState = JSON.parse(savedJson);
    for(let idx =0; idx<Object.keys(lastState).length;idx+=1){
        
        addTodo(lastState[idx]);
    }
}else{
addTodo({
    label: "CODE",
    done: false
});

addTodo({
    label: "learn Chinese",
    done: true
});
}
//save();