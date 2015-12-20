Template.studentattendanceItem.helpers({
  submittedText: function() {
    return moment(this.attendancedate).format("MM-DD-YYYY");
  }
});