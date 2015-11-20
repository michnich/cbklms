Template.skillItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});

Template.skillItem.events({
  	'click .delete': function(e){
    	e.preventDefault();
    	if (confirm("Delete this skill?")) {
	        var skillId = this._id;
	        Skills.remove(skillId);
	        Router.go('skillList');
	    }
	}
});