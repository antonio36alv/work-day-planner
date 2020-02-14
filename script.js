$("document").ready(function() {

    var container = document.querySelector(".container");
    //when the page is open display the current day at the top of the calendaar
    
    //initilize an array responsible for timeblocks, will either be empty or will
    //come from previous local storage
    var timeblocks = JSON.parse(localStorage.getItem("timeblocks") || "[]");

    class timeblock {
        //https://www.youtube.com/watch?v=h33Srr5J9nY
        constructor(hour, event){
            this.hour = hour;
            this.event = event;
        }
        //TODO think of creating a function
        //for returning or controling the color indicator (past present future)
    }
    
    //will be color coded to indicate whether that timeblock is in the past, in the current hour, or the future

    //each loop building one div that contains the following
    //<div> <input> <button>
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
        let displayInput = document.createElement("input");
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

    //TODO complete save button event listener
    //loop through the containers children, which are the divs for timeblocks
    for(i = 0; i < container.childElementCount; i++) {
        //their second element child is the save button
        container.children[i].children[2].addEventListener("click", () => {
            //https://www.youtube.com/watch?v=h33Srr5J9nY
            let value = event.target.value;
            let instance = value.charAt(value.length - 1);
            //i can change back to ids
            let textInput = document.querySelector(("#displayInput" + instance));
            let eventLog = textInput.value;
            if(eventLog===""){
                //TODO user did not enter any text for the event, be assertive tell them so
            } else {
                timeblocks.push(new timeblock(instance, eventLog));
            }
        });//console.log(event.target.value));
        //each input has the an value of  of displayInputX
        //each save button has the an value of  of displayBtnX

        //user clicks the save button
        //check to see that there is text in displayInputX, we determine which X  based on the value of the event
        //save that text and the X
    }
    
});