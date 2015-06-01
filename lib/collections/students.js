Students = new Mongo.Collection('students');

Students.allow({
  update: function(userId, student) {
    return !! userId
  },
  remove: function(userId, student) {
    return !! userId
  }
});

validateStudent = function(student) {
  var errors = {};
  if (!student.first_name)
    errors.first_name = "Please enter the student's first name";
  if (!student.last_name)
    errors.last_name = "Please enter the student's last name";
  if (!student.level)
    errors.level = "Please enter the student's level";
  if (!student.program)
    errors.program = "Please enter the student's program";
  if (!student.dob)
    errors.dob = "Please enter the student's date of birth";
  if (!student.elm_school)
    errors.elm_school = "Please enter the student's elementary school";
  if (!student.high_school)
    errors.high_school = "Please enter the student's high school";  
  if (!student.reg_packet)
    errors.reg_packet = "Is the registration packet complete"; 
  return errors; 
}

Meteor.methods({
  studentInsert: function(studentAttributes) {
    check(Meteor.userId(), String);

    var errors = validateStudent(studentAttributes);
    if (errors.first_name || errors.last_name || errors.level || errors.dob)
      throw new Meteor.Error('invalid-post', "All information was not entered");

    var studentWithSameDob = Students.findOne({dob: studentAttributes.dob});
    var studentWithSameFirstName = Students.findOne({first_name: studentAttributes.first_name});

    if (studentWithSameDob && studentWithSameFirstName) {
      return {
        studentExists: true,
        _id: studentWithSameDob._id && studentWithSameFirstName._id
      }
    }

    var user = Meteor.user();
    var student = _.extend(studentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var studentId = Students.insert(student);
    return {
      _id: studentId
    };
  }
});