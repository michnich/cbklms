Template.projectEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentProjectId = this._id;

    var projectProperties = {
      project_name: $(e.target).find('[name=project_name]').val(),
      description: $(e.target).find('[name=description]').val(),
      project_lead: $(e.target).find('[name=project_lead]').val(),
      project_start: $(e.target).find('[name=project_start]').val(),
      project_end: $(e.target).find('[name=project_end]').val(),
      project_end_est: $(e.target).find('[name=project_end_est]').val(),
      project_end_act: $(e.target).find('[name=project_end_act]').val()
    }

    Projects.update(currentProjectId, {$set: projectProperties}, function(error) {
      if (error) {
        // display the error to the user
        alert(error.reason);
      } else {
        Router.go('projectPage', {_id: currentProjectId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this project?")) {
      var currentProjectId = this._id;
      Projects.remove(currentProjectId);
      Router.go('projectsList');
    }
  }
});
