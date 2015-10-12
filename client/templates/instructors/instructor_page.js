Template.instructorPage.helpers({
  instructorattendance: function() {
    return InstructorAttendance.find({instructorId: this._id});
  }
});