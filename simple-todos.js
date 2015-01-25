// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({},{sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(event){
      var text = event.target.text.value; // event.target represents our form element
      Tasks.insert({
        text: text,
        createdAt: new Date() // current time
      });

      console.log(event);

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit (ip/?text="")
      return false;
    }
  });

  Template.task.events({
    "click .toogle-checked": function(){
      Tasks.update(this._id, {$set: {checked: ! this.checked}});
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
