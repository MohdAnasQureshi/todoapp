window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const yourName = document.querySelector("#name");
  const newTodo = document.querySelector("#new-todo");
  const userName = localStorage.getItem("userName") || "";
  yourName.value = userName;

  yourName.addEventListener("change", (e) => {
    localStorage.setItem("userName", e.target.value);
  });

  

  newTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // console.log(e);
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset();
    DisplayTodos();
  });
  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todoList");

  todoList.innerHTML = "";
//   const h3 = document.createElement('h3')
//   h3.innerHTML = "Your Tasks :"
//   todoList.appendChild(h3);

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todoItem");
    
    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteButton = document.createElement("button");
    
   
    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");
    if (todo.category == "home") {
      span.classList.add("home");
    } else {
      span.classList.add("work");
    }
    content.classList.add("todoContent");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteButton.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
    edit.innerHTML = "Edit";
    deleteButton.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteButton);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);
   
  
    todoList.appendChild(todoItem);

    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }
      DisplayTodos();
    });

    edit.addEventListener("click", (e)=>{
        const input = content.querySelector("input")
        input.removeAttribute('readonly');
        input.focus();
        input.addEventListener('blur', (e)=>{
            input.setAttribute('readonly', true)
            todo.content = e.target.value;
            localStorage.setItem("todos", JSON.stringify(todos));
            DisplayTodos();
        })
    })
//    console.log(todo)
    deleteButton.addEventListener("click", ()=>{
    //    console.log(todo)
        todos = todos.filter((t)=>{return t!=todo});
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
    })

  });
}
 