Template.studentDetails.helpers({
  students: function() {
    return Students.find();
  }
});