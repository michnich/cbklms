Template.skillList.onCreated(function() {
  Session.set('showSkills', {});
});

var qry = {};

Template.skillList.helpers({
  skills: function() {
  	Meteor.subscribe("skills");
    return Skills.find(Session.get("showSkills"), {sort: {level: 1}});
  },
});

Template.skillList.events({
	'change #level':function(event){
		var e = document.getElementById("level");
		qry["level"] = e.options[e.selectedIndex].value;
		if (qry["level"] == "All") {
			qry["level"] = null;
		}
		Session.set("showSkills", qry);	
	},

	'change #category':function(event){	
		var e = document.getElementById("category");
		qry["category"] = e.options[e.selectedIndex].value;
		Session.set("showSkills", qry);	
	}
});