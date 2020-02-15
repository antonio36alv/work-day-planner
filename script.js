$("document").ready(function () {
    var container = document.querySelector(".container");
    var displayCurrentDay = document.getElementById("currentDay");
    displayCurrentDay.textContent = moment().format("dddd");

    //initilize an array responsible for timeblocks, will either be empty or will
    //come from previous local storage
    var timeblocks = JSON.parse(localStorage.getItem("timeblocks") || "[]");

    class timeblock {
        //https://www.youtube.com/watch?v=h33Srr5J9nY
        constructor(hour, eventLog) {
            this.hour = hour;
            this.eventLog = eventLog;
            this.condense();
        }
        //function condenses timeblocks array. if a previous timeblock represents the same hour
        //will take old eventlog and add it to this one. then splice the old array.
        condense = () => {
            //go through timeblocks array
            for (i = 0; i < timeblocks.length; i++) {
                //if this objects hour matches another objects hour
                if (this.hour == timeblocks[i].hour) {
                    timeblocks.splice(i, 1);
                }
            }
        }
    }
    //generate timeblocks
    generateTimeblocks();
    //add event listeners to save buttons and tie a function to them
    saveButtonsAddEvents();
    //initial update, update is also called within the save buttons event handlers
    update();

    function generateTimeblocks() {
        //each loop building one div that contains the following
        // <div>     <input>    <button>
        //hour div,event input, save btn.
        for (i = 1; i < 25; i++) {
            //div for the whole timeblock
            let displayBlock = document.createElement("div");
            displayBlock.setAttribute("class", "timeblock");
            //make a div for hour, edit text, save button
            let displayHour = document.createElement("div");
            let p = document.createElement("p");
            displayHour.appendChild(p);
            displayHour.setAttribute("class", "displayHour");
            //make a input for event
            let displayInput = document.createElement("textarea");
            displayInput.setAttribute("class", "displayInput");
            displayInput.setAttribute("id", ("displayInput" + i))
            //make a button for saving the event
            let displayBtn = document.createElement("button");
            displayBtn.setAttribute("class", "displayBtn");
            displayBtn.setAttribute("value", ("displayBtn" + i))
            displayBtn.textContent = "Saved";
            //append hour div, event input, and button to the timeblock
            displayBlock.appendChild(displayHour);
            displayBlock.appendChild(displayInput);
            displayBlock.appendChild(displayBtn);

            //if greater than 12, start at 1 again and print pm
            if (i > 12) {
                p.textContent = (i - 12) + "pm";
            } else {
                //under 12 print am
                p.textContent = i + "am";
            }
            //timeblock is appeneded to container
            container.appendChild(displayBlock);
        }
    }
    //when saved it is saved to the local storage
    //when the page is refreshed the local storage will have the events load up
    function update() {
        //we can either have this function have the if statement determine to loop through
        localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
        //figure out which one is the current our, everything before that is now grayed out - past,
        //everything after...

        //index 0 is 1 so 
        //time = currentHour + 1;
        //eg you want 1am, since it is the first hour, 0 will get it
        let currentHour = moment().format("HH") - 1;

        for (i = 0; i < container.childElementCount; i++) {
            let div = container.children[i];

            if (i < currentHour) {
                div.style.backgroundColor = "gray";
                div.style.border = "gray solid thick";
                container.children[i].children[2].style.backgroundColor = "gray";
            } else if (i > currentHour) {
                div.style.backgroundColor = "blue";
                div.style.border = "blue solid thick";
                container.children[i].children[2].style.backgroundColor = "blue";
            } else {
                div.style.backgroundColor = "green";
                div.style.border = "green solid thick";
                container.children[currentHour].children[2].style.backgroundColor = "green";
            }
        }

        for (i = 0; i < timeblocks.length; i++) {
            //to update our logs, we must loop through the saved logs and get that eventlog
            //we have to set the appropiate displayinputs to those event logs
            let hour = timeblocks[i].hour - 1;
            container.children[hour].children[1].textContent = timeblocks[i].eventLog;
        }
    }

    function saveButtonsAddEvents() {
        //loop through the containers children, which are the divs for timeblocks
        for (i = 0; i < container.childElementCount; i++) {
            //their second element child is the save button
            container.children[i].children[2].addEventListener("click", () => {
                //https://www.youtube.com/watch?v=h33Srr5J9nY
                let value = event.target.value;
                let instance = value.substring(10);
                let textInput = document.querySelector(("#displayInput" + instance));
                let eventLog = textInput.value;
                if (eventLog !== "") {
                    //create timeblock instance with the hour being logged and the event
                    timeblocks.push(new timeblock(instance, eventLog));
                    update();
                } else {
                    if (findTimeblock(instance) > 0) {
                        let matchIndex = findTimeblock(instance);
                        timeblocks.push(new timeblock(matchIndex, eventLog))
                    }
                    update();
                }
            });
        }
    }
    //find out if there is a timeblock already stored
    //that matches the hour we pass in
    function findTimeblock(hour) {
        for (i = 0; i < timeblocks.length; i++) {
            if (timeblocks[i].hour == hour) {
                //found it so return it
                return timeblocks[i].hour;
            }
        }
        return -1;
    }
});