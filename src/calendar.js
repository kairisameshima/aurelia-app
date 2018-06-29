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

      this.numOfEvents = 2;

      this.currentEvent = {
        eventName: '',
        eventDate: 1,
        eventId: -1
      };

      // for (var i = 0; i<28; i++){
      //   let event = events.[i];
      //   document.getElementById(i).classList.add("selected")
      // }
      for (let[index, value] of this.events.entries()){
        let date = value.eventDate.toString();
        // document.getElementById(2).classList.add("selected");
        document.getElementsByClassName("dateElement");
      }


      //add events of the date selected
      this.selectedDate = 0;
      this.createdName = '';
      this.dateEvents = []
  }

  dateSelected(date) {
    console.log(date);
    this.showCurrent();
    this.selectedDate = Number(date);
    console.log(this.selectedDate);
    this.fillOutForm();
    this.showList();
    this.fillOutForm();

  }


  showList(){
    console.log('showList() date: ');
    this.promptHeading = 'Events for ' + this.selectedDate;
    // Fetch all events for this date from the main list
    this.dateEvents = this.events.filter(event=> event.eventDate === this.selectedDate );
    console.log(this.dateEvents);
    // Show the event prompts at the bottom of the page
    document.getElementById("prompt").classList.toggle("show");
    // clear any previous events and prevent duplicate events appearing
    this.clearList();
    // A  ``
    document.getElementById('eventList').appendChild(this.makeUl(this.dateEvents));
    document.getElementById("eventDate").value = this.selectedDate;

  }

  clearList(){
    document.getElementById("eventList").innerHTML= '';
  }


  //renders the list of events
  makeUl(events) {
    console.log('makeUl()');
    var list = document.createElement('ul');

    for(var i = 0; i < events.length; i++) {
      let event = events[i];
      let eventId = event.eventId;
      var item = document.createElement('li');
      // console.log(event);
      let e = document.createTextNode(event.eventName);
      let s = document.createElement('span');
      let id = 'eventNum' + i;
      // console.log(id);
      // let b = document.createElement("button");
      // b.innerHTML = 'Edit Event';
      // b.addEventListener("click", this.editEvent(function(){alert('test')}));
      // b.innerHTML = '<button id = id  onclick="this.editEvent(' + event+')"> Delete</button>';
      item.appendChild(e);
      // item.appendChild(b);

      list.appendChild(item);
    }

    return list;
  }

  selectEvent() {
    this.currentEvent = this.events.find(x => x.eventId == event.target.value);
    this.showCurrent();
    console.log('select()');

    // let popup = document.getElementById("myPopup");
    // popup.classList.toggle("show");

      // console.log(document.getElementsByClassName("dateElement"));
      // var items = document.getElementsByClassName("dateElement");
      // for (var i = 0; i<items.length; i++){
      //   items[i].classList.add("selectable");
      // }
    // this.clearForm();
  }

  fillOutForm() {
    console.log('filloutform');
    console.log(this.currentEvent.eventDate);
    document.getElementById("eventName").value = this.currentEvent.eventName;
    document.getElementById("eventDate").value = this.selectedDate;
  }

  clearForm(){
    document.getElementById("eventName").value = '';
    // document.getElementById('');
    document.getElementById("eventDate").value = 0;
  }

  deleteEvent(name, date) {
    console.log('hello');
    console.log(name + date);
  }

  findIndex(id){
    for(let i = 0; i < this.events.length; i++){
      if(this.events[i].eventId == id){
        return i;
      }
    }
    return -1;
  }
  updateEvent(){
    if(!this.checkInputs()){return;}

    console.log('updateEvent()');
    this.showCurrent();

    this.events.find(x=> x.eventId === this.currentEvent.eventId).eventName = this.currentEvent.eventName;
    this.events.find(x=> x.eventId === this.currentEvent.eventId).eventDate = Number(this.selectedDate);
    this.clearList();
    this.showList(Number(this.selectedDate));
    this.clearForm();
    this.updateForm();

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

  createEvent(){
    this.currentEvent.eventDate = this.selectedDate;
    console.log('createEvent()');
    this.showCurrent();
    console.log('====');
    console.log(this.currentEvent.eventName);
    if(!this.checkInputs()){return;}

    // this.currentEvent.eventName = document.getElementById("eventName").value;

    this.numOfEvents++;
    this.currentEvent.eventId = this.numOfEvents;
    this.currentEvent.eventDate = this.selectedDate;

    console.log(this.currentEvent.eventId);

    let newEvent = Object.assign({}, this.currentEvent);
    console.log(newEvent);
    this.events.push(newEvent);



    this.showList(this.selectedDate);
    this.clearForm();
    this.resetCurrentEvent();


  }

  checkInputs(){
    if(this.currentEvent.eventName === '' ||
      this.currentEvent.eventDate === '')
    {
      return false;
    }
    return true;
  }
  updateForm(){
    this.clearForm();
    this.fillOutForm();
  }

  deleteEvent(){
    console.log('eventId()');
    console.log(this.currentEvent.eventId);

    if(this.currentEvent.eventId === -1){ return false;}
    let eventIndex=0;
    for (let i = 0; i < this.events.length; i++){
      if(this.currentEvent.eventId === this.events[i].eventId){
        eventIndex = i;
      }
    }
    console.log('event index: ' + eventIndex);
    this.events.splice(eventIndex, 1);
    this.showCurrent();
    this.clearForm();
    this.clearList();
    this.showList(Number(this.selectedDate));
    this.resetCurrentEvent();
  }

  resetCurrentEvent(){
    this.currentEvent.eventName = '';
    this.currentEvent.eventId = -1;
    this.currentEvent.eventDate = 0;

  }

}
