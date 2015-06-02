Template.studentDetails.helpers({
  students: function() {
    return Students.find();
  },
  projectsCount: function() {
  	return Projects.find({studentId: this._id}).count();
  }
});