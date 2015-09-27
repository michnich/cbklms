Template.projectList.helpers({
  posts: function() {
    return Projects.find();
  }
});