Instructors = new Mongo.Collection('instructors');

Instructors.allow({
  update: function(userId, instructor) {
    return !! userId
  },
  remove: function(userId, instructor) {
    return !! userId
  }
});

Meteor.methods({
  instructorInsert: function(instructorAttributes) {


    var instructorWithSameDob = Instructors.findOne({dob: instructorAttributes.dob});
    var instructorWithSameFirstName = Instructors.findOne({first_name: instructorAttributes.first_name});

    if (instructorWithSameDob && instructorWithSameFirstName) {
      return {
        instructorExists: true,
        _id: instructorWithSameDob._id && instructorWithSameFirstName._id
      }
    }

    
    var instructor = _.extend(instructorAttributes, {

      submitted: new Date()
    });

    var instructorId = Instructors.insert(instructor);

    return {
      _id: instructorId
    };
  }
});
