 (function() {
     function CompletedCtrl(Message) { //services injected

//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "Completed Tasks";
         this.allMessages = Message.all(); // the ARRAY of objects from the allMessages Firebase database
         this.Message = Message; // allows html to access functions in Message service
         
     }
 
     angular
         .module('blocItOff')
         .controller('CompletedCtrl', ['Message', CompletedCtrl]); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();
                                       
/* 1/12/16 when moving functions out of AllCtrl.js into Message.js you must have:
function CompletedCtrl(Message)
this.Message = Message;
.controller('CompletedCtrl', ['Message', CompletedCtrl]);
along with the correct path in the html ( {{ completed.Message.labelPriority(message.priority) }} )
*/