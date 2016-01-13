 (function() {
     function AllCtrl($firebaseArray, Message) { //services injected

//variables accessed by the html page as completed.<variable> where it is defined here as this.<variable>         
         this.title = "All Tasks";
         this.allMessages = Message.all(); // the ARRAY of objects from the allMessages Firebase database
         this.Message = Message; // allows html to access functions in Message service

         
         
               
         /*
         * function getTextDeco() called in html for ngRepeat to change text decoration for overdue/completed tasks displayed with strike-through
         * accepts the value 'dateAdded' (number of milliseconds) and the value 'completed'
         * run calcDueDate() for the dateAdded then run calcOverdue() on the result to determine if task is overdue
         * if overdue=true or completed=true then change text-decoration to line-through (strike-through) otherwise no text decoration
         * used only for ALL. won't occur in ACTIVE and all of the COMPLETED will be strike-through so I can set that static
         */
         //this.getTextDeco called in html as all.getTextDeco
         this.getTextDeco = function(date, compl) {
             if ( Message.calcOverdue(Message.calcDueDate(date)) || compl) {
                 return 'line-through'  // if overdue OR completed
             } else {
                 return 'none'  // if not overdue and not completed
             };
         };
        

         


         
         

         
/*********************************************************************************************************************/         
     }
 
     angular
         .module('blocItOff')
         .controller('AllCtrl', AllCtrl); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();



/* 1/12/16 when moving functions out of AllCtrl.js into Message.js you must have:
function ActiveCtrl(Message)
this.Message = Message;
.controller('ActiveCtrl', ['Message', ActiveCtrl]);
along with the correct path in the html ( {{ active.Message.labelPriority(message.priority) }} )
*/