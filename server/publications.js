Meteor.publish('students', function() {
  return Students.find();
});

Meteor.publish('projects', function(studentId) {
  check(studentId, String);
  return Projects.find({studentId: studentId});
});

Meteor.publish('inforequests', function() {
  return Inforequests.find();
<<<<<<< HEAD
});
=======
});

>>>>>>> students
