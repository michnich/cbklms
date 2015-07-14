Template.studentEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentStudentId = this._id;

    var studentProperties = {
      status: $(e.target).find('[name=status]').val(),
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