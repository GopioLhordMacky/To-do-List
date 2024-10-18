const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

window.onload = showTask;

function addTask() {
    if (inputBox.value === '') {
        alert("Ano wala kang ilalagay?!");
    } else {
        let li = document.createElement("li");
        let img = document.createElement("img");
        img.src = "unchecked.png";
        li.appendChild(img);

        let taskText = document.createElement("span");
        taskText.innerHTML = inputBox.value;
        li.appendChild(taskText);

        // Sinearch ko lang po 'tong syntax na to sa W3School huhu
        let date = new Date();
        let hours = String(date.getHours()).padStart(2, '0'); 
        let minutes = String(date.getMinutes()).padStart(2, '0'); 
        let day = date.getDate();
        let month = date.toLocaleString('default', { month: 'long' });
        let year = date.getFullYear();
        //Sinearch ko lang po 'tong syntax na to sa W3School huhu

        let timestamp = document.createElement("p");
        timestamp.className = "timestamp";
        timestamp.innerHTML = `(Added: ${hours}:${minutes} on ${month} ${day} ${year})`;
        li.appendChild(timestamp);

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.className = "edit-btn";
        editBtn.onclick = function () 
        {
            editTask(taskText);
        };
        li.appendChild(editBtn);

        let span = document.createElement("span");
        span.className = "removebutton";
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) 
{
    if (e.target.tagName === "LI")
    {
        e.target.classList.toggle("checked");
        let img = e.target.children[0];
        if (e.target.classList.contains("checked")) 
        {
            img.src = "checked.png";
        } else
        {
            img.src = "unchecked.png";
        }
    } else if (e.target.className === "removebutton") 
    {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function editTask(taskText) 
{
    let newTask = prompt("Ano na naman babaguhin mo?", taskText.innerHTML);
    if (newTask !== null && newTask.trim() !== "") 
    {
        taskText.innerHTML = newTask; 
        saveData(); 
    }
    else
    {
        alert("Wala ka namang nilagay!")
    }
}

function showTask() 
{
    const savedData = localStorage.getItem("data");
    if (savedData) 
    {
        listContainer.innerHTML = savedData;

        const editButtons = listContainer.querySelectorAll(".edit-btn");
        editButtons.forEach
        (
                (editBtn, index) => 
            {
                const taskText = listContainer.children[index].querySelector("span");
                editBtn.onclick = function () 
                {
                    editTask(taskText); 
                };
            }
        );
    }
}
function saveData() 
{
    localStorage.setItem("data", listContainer.innerHTML);
}

