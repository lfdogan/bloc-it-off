//THIS IS A SERVICE SO IT SHOULD BE USED FOR ALL CODE THAT WILL BE USED ON MULTIPLE TEMPLATES



(function() {
    function Message($firebaseArray) {//Inject dependencies and the additional services into the this service. B

        // Firebase database references
        var rootRef = new Firebase("https://lfdoganblocitoff.firebaseio.com/");
        var allMessagesRef = rootRef.child('allMessages');
        
        
        var Messages = {
            all: function() {
                return $firebaseArray(allMessagesRef); 
            }
        };
        /*
        console.log(Messages);// an Object, but not our Firebase database
        console.log(allMessagesRef); // returns U {k: Yh, path: L, n: ae, lc: false}
        console.log($firebaseArray(allMessagesRef)); //returns an ARRAY of our database objects
        */
        
         


          //function calcDueDate receives a date in total number of milliseconds
         Messages.calcDueDate = function(dateEntered){
             // 1,000 ms in a second; 60s in a minute
             //var dueDate1s = dateEntered + 6000 //dueDate in 1 second
             //var dueDate = dateEntered + 60000 //dueDate in 1 minute
             //var dueDate = dateEntered + 3.6e+6 //dueDate in 1 hour
             //var dueDate = dateEntered + 8.64e+7 //dueDate in 1 day
             var dueDate = dateEntered + ((8.64e+7)*3) //dueDate in 3 days
             //var dueDate = dateEntered + 6.048e+8 //dueDate in 1 week
             return dueDate;
         };

         
         
         

         // function calcOverdue() takes in a date/time (a number in the form of milliseconds)
         // calculates the difference between the dueDate and current date/time
         //can't use Firebase.ServerValue.TIMESTAMP here because it only works when writing to Firebase via .set(), .push() etc
         // if the difference is positive the task is still current, if negative it has passed the deadline to be completed
         Messages.calcOverdue = function(dueDate){
             var difference = dueDate - new Date().getTime();
             if (difference > 0)
                 return false; //not yet due, active
             else
                 return true; //overdue, inactive
         };
         
        
        /* function checkOff()
        * @desc user clicks on a task and function marks task as complete (completed: true)
        * first console.log prints the information for the task that was clicked on
        * using startAt(), endAt(), and equalTo() allows us to choose arbitrary starting and ending points for our queries
        * in our database, query all children whose dateAdded is equal to task.dateAdded
        * print the unique ID (key)
        * create a new reference to that specific task
        * update the value of completed... i.e. change it from 'false' to 'true'
        * print new value of completed
        */
        Messages.checkOff = function(task){
            console.log('CHECK OFF', task.dateAdded, task.value, task.priority, task.completed);
            allMessagesRef.orderByChild("dateAdded").equalTo(task.dateAdded).on("child_added", function(snapshot) {
                console.log(snapshot.key());
                var curRef = allMessagesRef.child(  snapshot.key() );
                curRef.update({"completed": true});
                console.log('CHECK OFF', task.completed);
            });
        };
                    
        
        return Messages;
        

        
        
        
/*************************************************************************************/
    }
    
    angular
        .module('blocItOff')
        .factory('Message', Message);
})();