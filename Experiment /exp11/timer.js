let timers = [];

let selectedTimer = -1;

let interval = null;

let timeout = null;


/* ADD TIMER */

export function addTimer() {

    let name =
        document.getElementById("className").value;

    let minutes =
        Number(document.getElementById("minutes").value);

    let seconds =
        Number(document.getElementById("seconds").value);


    if (name === "") {
        alert("Enter class name");
        return;
    }


    if (minutes === 0 && seconds === 0) {
        alert("Enter timer duration");
        return;
    }


    let totalSeconds =
        minutes * 60 + seconds;


    timers.push({
        name: name,
        total: totalSeconds,
        remaining: totalSeconds
    });


    selectedTimer = timers.length - 1;


    document.getElementById("className").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";


    displayTimers();

    updateDisplay();
}


/* SELECT TIMER */

export function selectTimer(index) {

    pauseTimer();

    selectedTimer = index;

    updateDisplay();
}


/* START TIMER */

export function startTimer() {

    if (selectedTimer === -1) {

        alert("First add a timer");

        return;
    }


    if (interval !== null) {
        return;
    }


    interval = setInterval(function() {

        let timer =
            timers[selectedTimer];


        if (timer.remaining > 0) {

            timer.remaining--;

            updateDisplay();

        }


        if (timer.remaining === 0) {

            clearInterval(interval);

            interval = null;


            document.getElementById("timer")
                .innerHTML = "00:00";


            /*
               setTimeout() demonstration
            */

            timeout = setTimeout(function() {

                alert(
                    timer.name + " class has started!"
                );

            }, 1000);

        }

    }, 1000);
}


/* PAUSE TIMER */

export function pauseTimer() {

    clearInterval(interval);

    interval = null;
}


/* RESET TIMER */

export function resetTimer() {

    if (selectedTimer === -1) {
        return;
    }


    pauseTimer();


    timers[selectedTimer].remaining =
        timers[selectedTimer].total;


    updateDisplay();
}


/* UPDATE TIMER DISPLAY */

function updateDisplay() {

    if (selectedTimer === -1) {
        return;
    }


    let timer =
        timers[selectedTimer];


    let minutes =
        Math.floor(timer.remaining / 60);


    let seconds =
        timer.remaining % 60;


    document.getElementById("currentClass")
        .innerHTML = timer.name;


    document.getElementById("timer")
        .innerHTML =

        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0");
}


/* DISPLAY TIMER LIST */

function displayTimers() {

    let list =
        document.getElementById("timerList");


    list.innerHTML = "";


    timers.forEach(function(timer, index) {

        let div =
            document.createElement("div");


        div.className =
            "class-item";


        div.innerHTML = `

            <strong>
                ${timer.name}
            </strong>

            <br>

            Duration:
            ${formatTime(timer.total)}

            <br>

            <button
                class="select"
                data-index="${index}">
                Select
            </button>

        `;


        list.appendChild(div);

    });
}


/* FORMAT TIME */

function formatTime(totalSeconds) {

    let minutes =
        Math.floor(totalSeconds / 60);


    let seconds =
        totalSeconds % 60;


    return (
        String(minutes).padStart(2, "0")
        + ":" +
        String(seconds).padStart(2, "0")
    );
}
