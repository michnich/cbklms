Template.studentPage.helpers({
  projects: function() {
    return Projects.find({studentId: this._id});
  }
});