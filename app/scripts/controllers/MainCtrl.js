 (function() {
     function MainCtrl($firebaseArray) { //services injected
         this.heroTitle = "All Tasks!!!";
         var rootRef = new Firebase("https://lfdoganblocitoff.firebaseio.com/");          
         
 
/*********************************************************************************************************************/
          /* top part of box */
    /*     
         
//
//         // download the data into a local array. 
//         //this.tasks (alternately: $scope.tasks) is going to be populated from the remote server. 
//         var tasksRef = rootRef.child('tasks');
//         this.tasks = $firebaseArray(tasksRef);
//         
//         
//         //<button ng-click="main.addTask(main.task)">Add New</button>
//         this.addTask = function(task) {
//             console.log(task);
//             this.tasks.$add(task).then(function(tasksRef) {
//                 console.log(tasksRef.key());
//             });
//         }

                  
         
       
         
         
         var listRef = rootRef.child('list');

         //instructions: Set the $scope array holding your tasks to a Firebase object that calls $firebaseArray()
         this.list = $firebaseArray(listRef); 
         var scope = this;
         var newItemAdded;
         this.addListItem = function(item) {
             // utilize the $add(), $remove(), and $save() methods provided by the service to change the structure of the array
             // To get the id of an item in a $firebaseArray within ng-repeat, call $id on that item.
             // add an item: list.$add( {key: "value" }).then(...);
             // make list available in DOM: $scope.list = list;
             newItemAdded = listRef.push(item.value);
             this.list.$add(item).then(function(listRef) {
                 //console.log('this is the item', item);
                 scope.newList = {};// clears saved item from the input box
             });
         };

         undoListItem = document.getElementById('undoListItem'), //undo button
         undoListItem.addEventListener('click', function(){
             console.log("newItemAdded");
             console.log(newItemAdded);
             newItemAdded.remove();
             console.log("key");
             console.log(newItemAdded.key());
//             var lastChildID = this.list.child(newItemAdded.key());
//             console.log("lastChildID");
//             console.log(lastChildID);
//             lastChildID.remove();//remove() is equivalent to calling set(null).
         });            
                      
//         this.removeListItem = function(item){
//             // var rec = list.$getRecord("foo"); // record with $id === "foo" or null
//             var removeResult = this.list.$getRecord("nom");
//             if (removeResult) {console.log("found");} else {console.log("key not found");};
//             this.list.$indexFor("alpha");
//             console.log('fail to remove the item', item);
//             this.list.$remove(item).then(function(listRef){ // remove an item: list.$remove(2).then(...);
//                 console.log('success on remove the item', item);
//             });
//         };
//      
      
     */    
/*********************************************************************************************************************/
                   /* bottom part of box */
         
         

         var lblCurrentMessage = document.getElementById('lblCurrentMessage'); //label on undo button shows latest message
         var txtNewMessage = document.getElementById('txtNewMessage'); //input text for new message
         var btnUpdateMessage = document.getElementById('btnUpdateMessage'); //update button for new messae
         var btnUndo = document.getElementById('btnUndo'); //undo button to remove latest message
         
         var postID;
         var newPostRef;
         
         var currentMessageRef = rootRef.child('currentMessage'); //location of database holding latest message
         var allMessagesRef = rootRef.child('allMessages'); //location of database holding all messages
         var simpleMessagesRef = rootRef.child('simpleMessages');



         
         
         this.allMessages = $firebaseArray(allMessagesRef); 
      

         
          //function calcDueDate receives a date in total number of milliseconds
         this.calcDueDate = function(dateEntered){
             // 1,000 ms in a second; 60s in a minute
             //var dueDate1s = dateEntered + 6000 //dueDate in 1 second
             //var dueDate9s = dateEntered + 6000*9) //dueDate in 9 seconds
             //var dueDate = dateEntered + 60000 //dueDate in 1 minute
             //var dueDate = dateEntered + (60000*10) //dueDate in 10 minutes
             //var dueDate = dateEntered + 3.6e+6 //dueDate in 1 hour
             var dueDate = dateEntered + ((3.6e+6)*20) //dueDate in 20 hours
             //var dueDate = dateEntered + 8.64e+7 //dueDate in 1 day
             //var dueDate = dateEntered + 6.048e+8 //dueDate in 1 week
             return dueDate;
         };
         
         // function calcOverdue() takes in a date/time (a number in the form of milliseconds)
         // calculates the difference between the dueDate and current date/time
         //can't use Firebase.ServerValue.TIMESTAMP here because it only works when writing to Firebase via .set(), .push() etc
         // if the difference is positive the task is still current, if negative it has passed the deadline to be completed
         this.calcOverdue = function(dueDate){
             var difference = dueDate - new Date().getTime();
             if (difference > 0)
                 return false; //not yet due, active
             else
                 return true; //overdue, inactive
         };
         

                  
         //changes text to show strike-through for all overdue and completed tasks
              this.getTextDeco = function(date, compl) {
                  if ( this.calcOverdue(this.calcDueDate(date)) || compl) {
                      return 'line-through'  // if overdue OR completed
                  } else {
                      return 'none'  // if not overdue and not completed
                  };
                };
        

         
         
         //when user clicks on update button... save to firebase:
         //.set() replaces previous value of 'currentMessage' child with new value from input box
         //.push() adds a new unique key and new value to 'allMessages' child. Generate a reference to a new location and add some data using push(). Calling push() will return a reference to the new data path, which you can use to get the value of its ID or set data to it. 
         // Get the unique ID generated by push(). Calling key() on our push() reference gives us the value of the unique ID.
         // Clear out value of input textbox to empty to prepare for next entry
         // updateUI(): Update the UI by showing newly added message
      btnUpdateMessage.addEventListener('click', function(){
          console.log("UPDATE");
          //check for value of radio button and assign to variable txtPriority
             if (document.getElementById('prLow').checked) {
                 var txtPriority = document.getElementById('prLow').value;
             } else if (document.getElementById('prHigh').checked) {
                 var txtPriority = document.getElementById('prHigh').value;
             } else {
                 var txtPriority = document.getElementById('prMed').value;
             };
          currentMessageRef.set(txtNewMessage.value);
          simpleMessagesRef.push(txtNewMessage.value);
          newPostRef = allMessagesRef.push();
          newPostRef.set({
              value: txtNewMessage.value, //the task entered by user
              priority: txtPriority, // user entered priority for task
              completed: false, //false for not completed
              dateAdded: Firebase.ServerValue.TIMESTAMP // record the time when task was entered
          });
          postID = newPostRef.key();        
          txtNewMessage.value = '';
          updateUI();
         });
         
        
         // when click on the ID table cell of the message object
        this.checkOff = function(message) {
            console.log("CHECK OFF");
            console.log(message); // ex: Object {$value: "kayak", $id: "-K..., $priority: null, $$hashKey: "object:7"}
            console.log(message.$id); //not the child key! $id saved within the value object
            console.log(parent.message); //undefined
            

            

            var currentItem = allMessagesRef.child("-K7YPLlrLnEubM-TY-TF"); //-K7YPLlrLnEubM-TY-TF: swimming
            
            console.log(currentItem);
            currentItem.update({     "completed": "true"      }); //removes the value swimming
            
         };
         

         
            // Attach an asynchronous callback to read all of the data at our allMessages reference. This function will be called anytime new data is added to our database reference, and we don't need to write any extra code to make this happen.
         // "value" parameter reads the entire contents of a Firebase database reference
/*
            allMessagesRef.on("value", function(snapshot) {
                console.log(snapshot.val());//shows Object {<uID>: "hunting", <uID>: fishing...}
            }, function (errorObject) {
                console.log("The read failed: " + errorObject.code);
            });
 */                    
         
         

         
         
         //when user clicks on the undo button... remove latest database entry
         // key() gets the unique ID from the most recent entry and adds it to the url of all messages database location
         // remove() removes the url of last entry of allMessages child. remove() is equivalent to calling set(null).
         // set() changes the value of currentMessage child to empty.
         // updateUI(): Update the UI by showing newly added message
         btnUndo.addEventListener('click', function(){
             console.log("UNDO");
             //console.log(newPostRef); //the object (ex: U {k: Yh, path: L, n: ae, lc: false})
             var lastMessage = allMessagesRef.child(newPostRef.key());
             lastMessage.remove();
             currentMessageRef.set(''); 
             updateUI();
         });
         
         // function updateUI() will sync data in user interface.
         // listen for a change in the current message value by using on() method on current message reference. whenever value changes the callback function fires with new snapshot from firebase. call val() function to get data from snapshot.
         //Calling val() on a snapshot returns the JavaScript object representation of the data. If no data exists at the reference's location, the snapshots value will be null.
         var updateUI = function(){
             currentMessageRef.on('value', function(snapshot){
                 lblCurrentMessage.innerText = snapshot.val();
             });
         };      

         


         
/*********************************************************************************************************************/         
     }
 
     angular
         .module('blocItOff')
         .controller('MainCtrl', MainCtrl); //array of dependencies contains services and lastly callback function. Inject $firebaseObject and other services into this controller
 })();

