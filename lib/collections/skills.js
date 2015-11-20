Skills = new Mongo.Collection('skills');

//skill name
//skill level
//skill category

Skills.allow({
  update: function(userId, instructor) {
    return !! userId
  },
  remove: function(userId, skill) { 
    return userId
  }
});

if (Meteor.isServer) {
  
  Meteor.publish("skills", function () {
    return Skills.find();
  });
  Meteor.publish("projectSkills", function(qry) {
  	return Skills.find(qry);
  });
  Meteor.publish("projectCardSkills", function(qry){
  	return Skills.find(qry);
  })
}

Meteor.methods({
	addSkill: function(skillAttributes) {
		check(Meteor.userId(), String);

		var errors = {};

		if (!skillAttributes.name)
			errors.name = "Please enter a skill name";
		if (!skillAttributes.level)
			errors.level = "Please enter a level";
		if (!skillAttributes.category)
			errors.category = "Please enter a category"
		if (Skills.findOne({name: skillAttributes.name})) {
			errors.repeat = "This skill already exists";
		}

		if (errors.name || errors.level || errors.repeat || errors.category) {
			throw new Meteor.error('invalid-post', "All information was not entered");
		}

		var user = Meteor.user();
	    /*var skill = _.extend(skillAttributes, {
	      submitted: new Date()
	    });*/

    	var skillId = Skills.insert(skillAttributes);
		return {
      		_id: skillId
		};
	}
});