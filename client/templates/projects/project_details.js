Template.projectDetails.helpers({
  projects: function() {
    return Projects.find();
  },
	students: function() {
		return Students.find({studentId: this._id});
	}
});