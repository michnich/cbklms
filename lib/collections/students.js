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
    errors.first_name = "Please enter a first name";
  if (!student.last_name)
    errors.last_name = "Please enter a last name";
  if (!student.level)
    errors.level = "Please enter the student's level";
  if (!student.program)
    errors.program = "Please select a student program";
  if (!student.type)
    errors.type = "Please select a student type";
  if (!student.dob)
    errors.dob = "Please enter a date of birth";
  if (!student.email)
    errors.email = "Please enter an email address";
  if (!student.phone)
    errors.phone = "Please enter a phone number";  
  if (!student.address1)
    errors.address1 = "Please enter an address";
  if (!student.city)
    errors.city = "Please enter a city";
  if (!student.state)
    errors.state = "Please enter a state";
  if (!student.zip)
    errors.zip = "Please enter a zip code";
  if (!student.country)
    errors.country = "Please enter a country";
  if (!student.reg_packet)
    errors.reg_packet = "Is the registration packet complete"; 
  return errors; 
}

Meteor.methods({
  studentInsert: function(studentAttributes) {


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


    var student = _.extend(studentAttributes, {

      submitted: new Date()
    });
    var studentId = Students.insert(student);
    return {
      _id: studentId
    };
  }
});