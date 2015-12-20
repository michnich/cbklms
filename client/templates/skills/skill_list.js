Template.skillList.onCreated(function() {
  Session.set('showSkills', {});
});


Template.skillList.helpers({
  skills: function() {
  	Meteor.subscribe("skills");
    return Skills.find(Session.get("showSkills"), {sort: {level: 1}});
  },
});

Template.skillList.events({
	'change #level':function(event){
		var qry = {};
		var e = document.getElementById("level");
		var selectedLevel = e.options[e.selectedIndex].value;
		e = document.getElementById("category");
		var selectedCategory = e.options[e.selectedIndex].value;
		if (selectedLevel != "All") {
      		qry["level"] = selectedLevel;
    	}
	    if (selectedCategory != "All"){
	       qry["category"] = selectedCategory;
	    }
		Session.set("showSkills", qry);	
	},

	'change #category':function(event){	
		var qry = {};
		var e = document.getElementById("level");
		var selectedLevel = e.options[e.selectedIndex].value;
		e = document.getElementById("category");
		var selectedCategory = e.options[e.selectedIndex].value;
		if (selectedLevel != "All") {
      		qry["level"] = selectedLevel;
    	}
	    if (selectedCategory != "All"){
	       qry["category"] = selectedCategory;
	    }
		Session.set("showSkills", qry);	 
	}
});