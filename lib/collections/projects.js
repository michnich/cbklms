Projects = new Mongo.Collection('projects');

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(this.userId, String);
    check(projectAttributes, {
      studentId: String,
      project_name: String,
      description: String
    });
    var user = Meteor.user();
    var student = Students.findOne(projectAttributes.studentId);
    if (!student)
      throw new Meteor.Error('invalid-project', 'You must add a project');
    project = _.extend(projectAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Projects.insert(project);
  }
});