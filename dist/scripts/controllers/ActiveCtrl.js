 (function() {
     function ActiveCtrl(Message) { //services injected

//variables accessed by the html page as active.<variable> where it is defined here as this.<variable>
         this.title = "Active Tasks";
         this.allMessages = Message.all(); // the ARRAY of objects from the allMessages Firebase database
         this.Message = Message;
         

         
         

         
         
     }
 
     angular
         .module('blocItOff')
         .controller('ActiveCtrl', ['Message', ActiveCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();

/* 1/12/16 when moving functions out of AllCtrl.js into Message.js you must have:
function ActiveCtrl(Message)
this.Message = Message;
.controller('ActiveCtrl', ['Message', ActiveCtrl]);
along with the correct path in the html ( {{ active.Message.labelPriority(message.priority) }} )
*/