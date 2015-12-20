Template.applicantSubmit.onCreated(function() {
  Session.set('studentSubmitErrors', {});
});
Template.applicantSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('studentSubmitErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('studentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.applicantSubmit.events({
  'submit form': function(e){
    e.preventDefault();

    var student = {
      status: $(e.target).find('[name=status]').val(),
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      level: $(e.target).find('[name=level]').val(),
      education: $(e.target).find('[name=education]').val(),
      program: $(e.target).find('[name=program]').val(),
      type: $(e.target).find('[name=type]').val(),  
      dob: $(e.target).find('[name=dob]').val(),
      elm_school: $(e.target).find('[name=elm_school]').val(),
      high_school: $(e.target).find('[name=high_school]').val(),
      college: $(e.target).find('[name=college]').val(),
      employer: $(e.target).find('[name=employer]').val(),
      position: $(e.target).find('[name=position]').val(),
      sex: $(e.target).find('[name=sex]').val(),
      ethnicity: $(e.target).find('[name=ethnicity]').val(),
      race: $(e.target).find('[name=race]').val(),
      income: $(e.target).find('[name=income]').val(),
      ta: $(e.target).find('[name=ta]').val(),
      grade: $(e.target).find('[name=grade]').val(),
      reg_packet: $(e.target).find('[name=reg_packet]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      address1: $(e.target).find('[name=address1]').val(),
      address2: $(e.target).find('[name=address2]').val(),
      city: $(e.target).find('[name=city]').val(),
      state: $(e.target).find('[name=state]').val(),
      zip: $(e.target).find('[name=zip]').val(),
      country: $(e.target).find('[name=country]').val(),
      github: $(e.target).find('[name=github]').val(),
      parent_name: $(e.target).find('[name=parent_name]').val(),
      parent_phone: $(e.target).find('[name=parent_phone]').val(),
      parent_email: $(e.target).find('[name=parent_email]').val(),
      job_duties: $(e.target).find('[name=job_duties]').val(),
      volunteer: $(e.target).find('[name=volunteer]').val(),
      goal: $(e.target).find('[name=goal]').val(),
      community: $(e.target).find('[name=community]').val(),
      eme_contact: $(e.target).find('[name=eme_contact]').val(),
      eme_number: $(e.target).find('[name=eme_number]').val(),
      app_essay: $(e.target).find('[name=app_essay]').val(),
      dev_exp: $(e.target).find('[name=dev_exp]').val(),
    };

    var errors = validateStudent(student);
    if (errors.first_name || errors.last_name || errors.level || errors.dob)
        return Session.set('studentSubmitErrors', errors);

    Meteor.call('studentInsert', student, function(error, result) {
      if (error)
        return throwError(error.reason);

      if (result.studentExists)
        throwError('This Student Already Exists');

      Router.go('inforequestConfirm');
    });
  }
});