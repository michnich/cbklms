Template.instructorattendanceSubmit.onCreated(function() {
  Session.set('instructorattendanceSubmitErrors', {});
});

Template.instructorattendanceSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('instructorattendanceSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('instructorattendanceSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.instructorattendanceSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var date = $(e.target).find('[name=attendancedate]').val();
    var instructorattendance = {
      attendancedate: new Date(moment(date).toDate()), //changed from what "date" is up above
      instructorId: template.data._id
    };

    var errors = {};
    if (! instructorattendance.attendancedate) {
      errors.attendancedate = "Please select a date";
      return Session.set('instructorattendanceSubmitErrors', errors);
    }

    Meteor.call('instructorattendanceInsert', instructorattendance, function(error, instructorattendanceId) {
      if (error){
        throwError(error.reason);
      } else {
        $instructorattendance.val('');
      }
    });
  }
});