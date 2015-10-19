Meteor.publish('students', function() {
  return Students.find();
});

Meteor.publish('projects', function(studentId) {
  return Projects.find();
});

Meteor.publish('inforequests', function() {
  return Inforequests.find();
});

Meteor.publish('instructors', function() {
  return Instructors.find();
});

Meteor.publish('instructorattendance', function() {
  return InstructorAttendance.find();
});