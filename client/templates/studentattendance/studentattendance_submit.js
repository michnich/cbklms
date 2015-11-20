Template.studentattendanceSubmit.onCreated(function() {
  Session.set('studentattendanceSubmitErrors', {});
});

Template.studentattendanceSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('studentattendanceSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('studentattendanceSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.studentattendanceSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var studentattendance = {
      attendancedate: $(e.target).find('[name=attendancedate]').val(),
      studentId: template.data._id
    };
    var errors = {};
    if (! studentattendance.attendancedate) {
      errors.attendancedate = "Please select a date";
      return Session.set('studentattendanceSubmitErrors', errors);
    }

    Meteor.call('studentattendanceInsert', studentattendance, function(error, studentattendanceId) {
      if (error){
        throwError(error.reason);
      } else {
        $studentattendance.val('');
      }
    });
  }
});