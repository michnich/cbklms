Projects = new Mongo.Collection('projects');

Projects.allow({
  update: function(userId, project) { 
    return userId 
  },
  remove: function(userId, project) { 
    return userId
  },
});

Meteor.methods({
  projectInsert: function(projectAttributes) {
    check(this.userId, String);
    check(projectAttributes, {
      studentId: String,
      project_name: String,
      description: String,
      skills: [String],
      project_lead: String,
      project_start: Date,
      project_end_est: Date
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