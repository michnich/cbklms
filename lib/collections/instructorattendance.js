InstructorAttendance = new Mongo.Collection('instructorattendance');

Meteor.methods({
  instructorattendanceInsert: function(instructorattendanceAttributes) {
    check(this.userId, String);
    check(instructorattendanceAttributes, {
      instructorId: String,
      attendancedate: String
    });
    var user = Meteor.user();
    var instructor = Instructors.findOne(instructorattendanceAttributes.instructorId);
    if (!instructor)
      throw new Meteor.Error('invalid-instructorattendance', 'You must add a date');
    instructorattendance = _.extend(instructorattendanceAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return InstructorAttendance.insert(instructorattendance);
  }
});