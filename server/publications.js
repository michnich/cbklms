Meteor.publish('students', function() {
  return Students.find();
});

Meteor.publish('projects', function(studentId) {
  return Projects.find();
});

Meteor.publish('inforequests', function() {
  return Inforequests.find();
});

