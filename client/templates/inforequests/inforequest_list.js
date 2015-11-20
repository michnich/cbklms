Template.inforequestsList.helpers({
  inforequests: function() {
    if (Session.get("hideCompleted")) {
       return Inforequests.find({status: "Incomplete"});
    } 
    else {
        return Inforequests.find({});
    }
  },
  hideCompleted: function () {
      return Session.get("hideCompleted");
    }
});

Template.inforequestsList.events({
	"change .hide-completed input": function (event) {
      Session.set("hideCompleted", event.target.checked);
    }
});