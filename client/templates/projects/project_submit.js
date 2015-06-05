Template.projectSubmit.onCreated(function() {
  Session.set('projectSubmitErrors', {});
});

Template.projectSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('projectSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('projectSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.projectSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var project = {
      project_name: $(e.target).find('[name=project_name]').val(),
      description: $(e.target).find('[name=description]').val(),
      studentId: template.data._id
    };

    var errors = {};
    if (! project.project_name) {
      errors.project_name = "Please write some content";
      return Session.set('projectSubmitErrors', errors);
    }

    Meteor.call('projectInsert', project, function(error, projectId) {
      if (error){
        throwError(error.reason);
      } else {
        $project.val('');
      }
    });
  }
});