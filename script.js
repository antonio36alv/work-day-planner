$("document").ready(function() {
    //TODO delete line under
    // localStorage.clear();
    var container = document.querySelector(".container");
    //TODO when the page is open display the current day at the top of the calendaar
    
    //initilize an array responsible for timeblocks, will either be empty or will
    //come from previous local storage
    var timeblocks = JSON.parse(localStorage.getItem("timeblocks") || "[]");
    console.log(timeblocks);

    class timeblock {
        //https://www.youtube.com/watch?v=h33Srr5J9nY
        constructor(hour, eventLog){
            this.hour = hour;
            this.eventLog = eventLog;
            this.condense();
        }
        //function condenses timeblocks array. if a previous timeblock represents the same hour
        //will take old eventlog and add it to this one. then splice the old array.
        condense = () => {
                //go through timeblocks array
                for(i = 0; i < timeblocks.length; i++) {
                    //if this objects hour matches another objects hour
                    if(this.hour==timeblocks[i].hour) {
                        //set our eventlog to the end of the previous logs.
                        this.eventLog = timeblocks[i].eventLog.concat(this.eventLog);
                        //get rid of the previous array
                        timeblocks.splice(i, 1);
                    }
                }
        }
        //TODO think of creating a function
        //for returning or controling the color indicator (past present future)
    }
    //will be color coded to indicate whether that timeblock is in the past, in the current hour, or the future

    //each loop building one div that contains the following
    // <div>     <input>    <button>
    //hour div,event input, save btn.
    for(i = 1; i < 25; i++) {
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
        if(i > 12) {
            p.textContent = (i - 12) + "pm";
        } else {
            //under 12 print am
            p.textContent = i + "am";
        }
        //timeblock is appeneded to container
        container.appendChild(displayBlock);
    }
    //when saved it is saved to the local storage
    //when the page is refreshed the local storage will have the events load up

    function update(){
        //we can either have this function have the if statement determine to loop through

        //figure out which one is the current our, everything before that is now grayed out - past,
        //everything after...

        //index 0 is 1 so 
        //time = currentHour + 1;
        //eg you want 1am, since it is the first hour, 0 will get it
        let currentHour = 0;
        console.log(container.children[0]);
        
        //up untill the current hour we will change the divs to our past color
        for(i = 0; i < currentHour; i++) {
            let div = container.children[i];
            div.style.backgroundColor = "gray";
            div.style.color = "gray";
            div.style.border = "gray solid thick";
        }
        let present = container.children[currentHour];
        present.style.backgroundColor = "red";
        present.style.color = "red";
        present.style.border = "green solid thick";

        for(i = 0; i < timeblocks.length; i++) {
            //to update our logs, we must loop through the saved logs and get that eventlog
            
            //we have to set the appropiate displayinputs to those event logs

            let hour = timeblocks[i].hour - 1;
            console.log(hour);
            container.children[hour].children[1].textContent = timeblocks[i].eventLog;
        }
        // console.log(container.children[currentHour].style.color = "red");
        // for(i = 0; container.children[i])
    }
    update();
    //TODO complete save button event listener
    //TODO add update displayInput text
    //loop through the containers children, which are the divs for timeblocks
    for(i = 0; i < container.childElementCount; i++) {
        //their second element child is the save button
        container.children[i].children[2].addEventListener("click", () => {
            //https://www.youtube.com/watch?v=h33Srr5J9nY

            //TODO see if i can condense this
            let value = event.target.value;
            let instance = value.charAt(value.length - 1);
            let textInput = document.querySelector(("#displayInput" + instance));
            let eventLog = textInput.value;
            if(eventLog===""){
                //TODO user did not enter any text for the event, be assertive tell them so
            } else {
                timeblocks.push(tb = new timeblock(instance, eventLog));
                localStorage.setItem("timeblocks", JSON.stringify(timeblocks));
                // tb.condense();
            }
        });
        //each input has the an value of  of displayInputX
        //each save button has the an value of  of displayBtnX

        //user clicks the save button
        //check to see that there is text in displayInputX, we determine which X  based on the value of the event
        //save that text and the X
    }    
});