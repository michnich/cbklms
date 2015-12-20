StudentAttendance = new Mongo.Collection('studentattendance');

if (Meteor.isServer) {
  Meteor.publish("studentattendance", function(){ //added
    return StudentAttendance.find();
  }), 

  Meteor.publish("studentattendance", function(qry){
    return StudentAttendance.find(qry);
  })
}

Meteor.methods({
  studentattendanceInsert: function(studentattendanceAttributes) {
    check(this.userId, String);
    check(studentattendanceAttributes, {
      studentId: String,
      attendancedate: Date //changed from string
    });
    var user = Meteor.user();
    var student = Students.findOne(studentattendanceAttributes.studentId);
    if (!student)
      throw new Meteor.Error('invalid-studentattendance', 'You must add a date');
    studentattendance = _.extend(studentattendanceAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return StudentAttendance.insert(studentattendance);
  }
});