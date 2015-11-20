Template.studentPage.helpers({
  projects: function() {
    return Projects.find({studentId: this._id});
  },
  studentattendance: function() {
  	Meteor.subscribe("studentattendance", {studentId: this._id});
  	return StudentAttendance.find({studentId: this._id}, {sort: {submitted: -1}});
  }, 
  missed4Weeks: function() {
   Meteor.subscribe("studentattendance", {studentId: this._id});
   var attendance = StudentAttendance.find({studentId: this._id}).fetch();
   var lastWeek = moment(attendance[attendance.length - 1].attendancedate);
   

   if ((moment().week() - lastWeek.week()) >= 4) {
    return true;
   }
   else {
    return false;
   }
  }
});