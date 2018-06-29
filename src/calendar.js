import './calendar.scss';

export class Calendar {
  constructor() {
    this.heading = 'Calendar App';
    this.promptHeading = '';

    this.events = [
      {
        eventName: "meeting",
        eventDate: 2,
        eventId: 0,
      },
      {
        eventName: 'meeting2',
        eventDate: 2,
        eventId: 1,
      }
    ];

    // Holds values for the event to be created or edited
    this.currentEvent = {
      eventName: '',
      eventDate: 1,
      eventId: -1
    };

    // keeps track of the selected date
    this.selectedDate = 0;

    // keeps track of the event name
    this.selectedName = '';

    // keeps track of the selected id;
    this.selectedId = -1;

    // Keeping track of the events on the selected day
    this.dateEvents = [];
    // counter of the events for creating new eventId's
    this.numOfEvents = 2;

    this.selection = false;


  }


  //======= Display & Select =======//
  // action when a date is selected from the calendar
  dateSelected(date) {
    this.resetSelection();
    this.selectedDate = Number(date);
    this.fillOutForm();
    this.clearList();
    this.showList();
  }

  // creates header for the events list
  showList(){
    this.promptHeading = 'Events for ' + this.selectedDate;

    // Fetch all events for this date from the main list
    this.dateEvents = this.events.filter(event => event.eventDate === Number(this.selectedDate));

    // Show the event prompts at the bottom of the page
    // document.getElementById("prompt").classList.toggle("show");


    // fill a ul events for the selected date
    document.getElementById('eventList').appendChild(this.makeUl(this.dateEvents));
  }

  // makes the event selected from the list the current event
  selectEvent() {
    this.selection = true;
    console.log(event.target.value);
    if(event.target.value !== "ADD"){
      this.currentEvent = this.events.find(x => x.eventId == event.target.value);
      this.selectedDate = Number(this.currentEvent.eventDate);
      this.selectedId = this. currentEvent.eventId;
      this.selectedName = this.currentEvent.eventName;

    }
    else{this.selection = false;}
  }


  //renders the list of events
  makeUl(events) {
    var list = document.createElement('ul');

    for(var i = 0; i < events.length; i++) {
      let event = events[i];
      var item = document.createElement('li');
      let e = document.createTextNode(event.eventName);
      item.appendChild(e);
      list.appendChild(item);
    }
    return list;
  }


  //====== Create =====//
  createEvent(){
    this.showCurrent();
    if(this.selection){return false;}


    // if(!this.checkInputs()){return;}

    // increment the counter and make it the eventId
    this.numOfEvents++;
    this.selectedId = this.numOfEvents;

    this.currentEvent = {};
    // create a copy of currentEvent and push to events
    this.currentEvent.eventDate = Number(document.getElementById("eventDate").value);
    this.currentEvent.eventName = document.getElementById("eventName").value;
    this.currentEvent.eventId = this.selectedId;

    var newEvent = {
      eventName:this.currentEvent.eventName,
      eventDate:this.currentEvent.eventDate,
      eventId:this.currentEvent.eventId,
    };

    if(this.checkInputs(newEvent)){
      this.events.push(newEvent);
      // this.resetCurrentEvent();
      this.clearList();
      // show the list for the date the event was created for
      this.showList();
      this.clearForm();
    }
  }


  //====== Edit =====//
  // updates the event with the same eventId as currentEvent
  updateEvent(){
    console.log('==***==');

    let date = Number(document.getElementById("eventDate").value);
    let name = document.getElementById("eventName").value;
    // finds the event in events and changes the name and date
    this.events.find(x=> x.eventId === this.selectedId).eventDate = Number(date);
    this.events.find(x=> x.eventId === this.selectedId).eventName = name;

    //
    this.clearList();
    this.showList(Number(this.selectedDate));
    this.clearForm();
    this.selection = false;
  }

  //===== Delete =====//
  deleteEvent(){

    // catch trying to delete with no event selected
    if(this.selectedId === -1){ return false;}

    // get index of event with matching eventId
    let eventIndex=0;
    for (let i = 0; i < this.events.length; i++){
      if(this.selectedId === this.events[i].eventId){
        eventIndex = i;
      }
    }

    // splice out event from events
    this.events.splice(eventIndex, 1);
    this.clearForm();
    this.clearList();
    this.showList(this.selectedDate);
    this.selection = false;
  }

  //===== Utilities =====/
  // fills out the form with the information from the current Event
  fillOutForm() {
    document.getElementById("eventName").value = this.selectedName;
    document.getElementById("eventDate").value = this.selectedDate;
  }

  // clears out the form
  clearForm(){
    document.getElementById("eventName").value = '';
    // document.getElementById("eventDate").value = 0;
  }

  // checks for an event with proper date and name
  checkInputs(event){
    if(event.eventName === '' ||
      event.eventDate === '') {
      return false;
    }
    return true;
  }

  // clears the ul of events
  clearList(){
    document.getElementById("eventList").innerHTML= '';
  }

  updateForm(){
    this.clearForm();
    this.fillOutForm();
  }

  showCurrent(){
    console.log('====');
    console.log('date: ' + this.currentEvent.eventDate);
    console.log('name: ' + this.currentEvent.eventName);
    console.log('id: ' +this.currentEvent.eventId);
    console.log('current event');
    console.log(this.currentEvent);
    console.log('selected date: '+ this.selectedDate);
    console.log(this.events);
    console.log('====');


  };

  // for resetting the current event
  resetCurrentEvent(){
    this.currentEvent.eventName = '';
    this.currentEvent.eventId = -1;
    this.currentEvent.eventDate = 0;

  }

  resetSelection(){
    this.selectedDate = 0;
    this.selectedName = '';
    this.selectedId = -1;
  }
}
