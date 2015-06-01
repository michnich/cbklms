Template.studentSubmit.onCreated(function() {
  Session.set('studentSubmitErrors', {});
});
Template.studentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('studentSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('studentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.studentSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var student = {
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      level: $(e.target).find('[name=level]').val(),
      program: $(e.target).find('[name=program]').val(),
      type: $(e.target).find('[name=type]').val(),  
      dob: $(e.target).find('[name=dob]').val(),
      elm_school: $(e.target).find('[name=elm_school]').val(),
      high_school: $(e.target).find('[name=high_school]').val(),
      reg_packet: $(e.target).find('[name=reg_packet]').val()
    };

    var errors = validateStudent(student);
    if (errors.first_name || errors.last_name || errors.level || errors.dob)
        return Session.set('studentSubmitErrors', errors);

    Meteor.call('studentInsert', student, function(error, result) {
      if (error)
        return throwError(error.reason);

      if (result.studentExists)
        throwError('This Student Already Exists');

      Router.go('studentPage', {_id: result._id});
    });
  }
});