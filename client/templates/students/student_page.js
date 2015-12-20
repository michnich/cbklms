Template.studentPage.helpers({
  projects: function() {
    return Projects.find({studentId: this._id});
  },
  studentattendance: function() {
  	Meteor.subscribe("studentattendance", {studentId: this._id});
  	return StudentAttendance.find({studentId: this._id}, {sort: {submitted: -1}, limit:4});
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
  },
  childStudent: function() {
    var child = false;
    if ((this.type === "Child Scholarship") || (this.type === "Child Paid")){
      child = true;
    }
    return child;
  },
  adultStudent: function() {
    var adult = false;
    if ((this.type === "Adult Scholarship") || (this.type === "Adult Paid")){
      adult = true;
    }
    return adult;
  }
});