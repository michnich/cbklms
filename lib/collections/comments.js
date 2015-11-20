Comments = new Mongo.Collection('comments');

Meteor.methods({
  commentInsert: function(commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      studentId: String,
      project_name: String,
      description: String
    });
    var user = Meteor.user();
    var student = Students.findOne(commentAttributes.studentId);
    if (!student)
      throw new Meteor.Error('invalid-comment', 'You must comment on a student');
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Comments.insert(comment);
  }
});