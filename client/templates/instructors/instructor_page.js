Template.instructorPage.helpers({
  instructorattendance: function() {
    return InstructorAttendance.find({instructorId: this._id}, {sort: {submitted: -1}});
  },
  missed4Weeks: function() {
   Meteor.subscribe("instructorattendance", {instructorId: this._id});
   var attendance = InstructorAttendance.find({instructorId: this._id}).fetch();
   var lastWeek = moment(attendance[attendance.length - 1].attendancedate);

   if ((moment().week() - lastWeek.week()) >= 4) {
    return true;
   }
   else {
    return false;
   }
  },
  needsBackgroundCheck: function() {
  	var park = moment(this.park_check_date);
  	if ((moment().year() - park.year()) >= 3){
  		return true;
  	}
  	var criminal = moment(this.pa_criminal_check_date);
  	if ((moment().year() - criminal.year()) >= 3){
  		return true;
  	}
  	var child = moment(this.pa_child_check_date);
  	if ((moment().year() - child.year()) >= 3){
  		return true;
  	}
  	var fbi = moment(this.fbi_check_date);
  	if ((moment().year() - fbi.year()) >= 3){
  		return true;
  	}
  	return false;
  }
});