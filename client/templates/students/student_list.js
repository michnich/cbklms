Template.studentList.helpers({
  students: function() {
    return Students.find();
  }
});