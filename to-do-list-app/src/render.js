const task = document.getElementById('task-input');
const category = document.getElementById('categories');

const cat1Tasks = document.getElementById('urgent-important');
const cat2Tasks = document.getElementById('urgent-not-important');
const cat3Tasks = document.getElementById('not-urgent-important');
const cat4Tasks = document.getElementById('not-urgent-not-important');
const taskLists = [cat1Tasks, cat2Tasks, cat3Tasks, cat4Tasks];

const progressText = document.getElementById('progress-text');
const totalTasksSpan = document.getElementById('total-tasks');
const completedTasksSpan = document.getElementById('completed-tasks');
const speechBubble = document.getElementById('chopper-message');

const addMessages = [
    "Let's get to work!",
    "We can do this!",
    "New task added!",
    "Wow! Another one?",
    "I sorted your tasks for you! ✨",
    "Task Priority Recap: ❤️💛💙💚"
]

const completeMessages = [
    "That's one down!",
    "Task completed!",
    "One step closer!",
    "Nailed it!",
    "Good job!"
]

const deleteMessage = [
    "Good riddance",
    "One less thing to worry about",
    "Bye bye!",
    "Pheww!"
]

function getRandomMessage(messages) {
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

function addTask(){
    if(task.value === ''){
        speechBubble.textContent = 'You must write something!';
    } 
    else{
        let li = document.createElement("li");
        li.innerHTML = task.value;

        if (category.value === "urgent-important") {
            cat1Tasks.appendChild(li);
        } else if (category.value === "urgent-not-important") {
            cat2Tasks.appendChild(li);
        } else if (category.value === "not-urgent-important") {
            cat3Tasks.appendChild(li);
        } else {
            cat4Tasks.appendChild(li);
        }
        
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span)
    }
    task.value = "" // Clear the input box
    speechBubble.textContent = getRandomMessage(addMessages);

    updateProgressBar();
    saveData();
}

taskLists.forEach(addLiActions);
function addLiActions(taskList) {
    taskList.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            speechBubble.textContent = getRandomMessage(completeMessages);
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            speechBubble.textContent = getRandomMessage(deleteMessage);
            saveData();
        }
        updateProgressBar();
    }, false);
}

task.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
}, false)


function updateProgressBar() {
    // Get the total num of tasks
    const allTasks = document.querySelectorAll('.cat1 li, .cat2 li, .cat3 li, .cat4 li'); // Get all the tasks
    const totalTasks = allTasks.length;

    // Calculate the progress percentage
    let completedTasks = Array.from(allTasks).filter(task => task.classList.contains('checked')).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100): 0;

    // Set the percentage amount
    completedTasksSpan.textContent = completedTasks;
    progressText.textContent = progressPercentage;
    totalTasksSpan.textContent = totalTasks;

    const progressBar = document.querySelector('.cur_progress');

    // Transparency
    if (progressPercentage === 0) {
        progressBar.style.opacity = "0"; // Make transparent if 0%
    } else {
        progressBar.style.opacity = "1"; // Make visible if > 0%
    }

    // Length of the current progress
    progressBar.style.width = `${progressPercentage}%`;

}

function saveData() {
    localStorage.setItem("cat1Data", cat1Tasks.innerHTML);
    localStorage.setItem("cat2Data", cat2Tasks.innerHTML);
    localStorage.setItem("cat3Data", cat3Tasks.innerHTML);
    localStorage.setItem("cat4Data", cat4Tasks.innerHTML);
}

function showTask() {
    cat1Tasks.innerHTML = localStorage.getItem("cat1Data");
    cat2Tasks.innerHTML = localStorage.getItem("cat2Data");
    cat3Tasks.innerHTML = localStorage.getItem("cat3Data");
    cat4Tasks.innerHTML = localStorage.getItem("cat4Data");
}

showTask();
updateProgressBar();