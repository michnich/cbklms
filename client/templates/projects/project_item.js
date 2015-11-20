Template.projectItem.helpers({
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  },
  projectCardSkills:function() {
  	Meteor.subscribe("projectCardSkills", {'_id': { $in: this.skills}});
    return Skills.find({'_id': { $in: this.skills}});
  }
});