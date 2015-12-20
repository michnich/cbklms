Template.studentEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentStudentId = this._id;

    var studentProperties = {
      status: $(e.target).find('[name=status]').val(),
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      level: $(e.target).find('[name=level]').val(),
      program: $(e.target).find('[name=program]').val(),
      type: $(e.target).find('[name=type]').val(),
      dob: $(e.target).find('[name=dob]').val(),
      elm_school: $(e.target).find('[name=elm_school]').val(),
      high_school: $(e.target).find('[name=high_school]').val(),
      parent_name: $(e.target).find('[name=parent_name]').val(),
      parent_phone: $(e.target).find('[name=parent_phone]').val(),
      parent_email: $(e.target).find('[name=parent_email]').val(),
      eme_contact: $(e.target).find('[name=eme_contact]').val(),
      eme_number: $(e.target).find('[name=eme_number]').val(),
      reg_packet: $(e.target).find('[name=reg_packet]').val(),
      last_aud: $(e.target).find('[name=last_aud]').val(),
      updated: moment().toDate() //added
    };

    Students.update(currentStudentId, {$set: studentProperties}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('studentPage', {_id: currentStudentId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentStudentId = this._id;
      Students.remove(currentStudentId);
      Router.go('studentList');
    }
  }
});