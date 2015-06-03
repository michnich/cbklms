Meteor.publish('students', function() {
  return Students.find();
});

Meteor.publish('projects', function() {
	return Projects.find();
});