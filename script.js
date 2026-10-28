
let workouts = JSON.parse(localStorage.getItem("workouts")) || [];

const form = document.getElementById("workoutForm");
const list = document.getElementById("workoutList");
const clearButton = document.getElementById("clearButton");

function saveWorkouts() {
    localStorage.setItem("workouts", JSON.stringify(workouts));
}

function displayWorkouts() {
    list.innerHTML = "";

    workouts.forEach(function(workout, index) {
        let item = document.createElement("li");
        let text = document.createElement("span");
        let deleteButton = document.createElement("button");

        text.textContent =
            workout.exercise + " - " +
            workout.weight + " lbs x " +
            workout.reps + " reps";

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            workouts.splice(index, 1);
            saveWorkouts();
            displayWorkouts();
        });

        item.appendChild(text);
        item.appendChild(deleteButton);
        list.appendChild(item);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    let exercise = document.getElementById("exercise").value.trim();
    let weight = Number(document.getElementById("weight").value);
    let reps = Number(document.getElementById("reps").value);

    if (!exercise || !Number.isFinite(weight) ||
        weight < 0 || !Number.isInteger(reps) || reps < 1) {
        alert("Please enter a valid workout.");
        return;
    }

    let workout = {
        exercise: exercise,
        weight: weight,
        reps: reps
    };

    workouts.push(workout);
    saveWorkouts();
    displayWorkouts();
    form.reset();
});

clearButton.addEventListener("click", function() {
    if (confirm("Delete all workouts?")) {
        workouts = [];
        saveWorkouts();
        displayWorkouts();
    }
});

displayWorkouts();
