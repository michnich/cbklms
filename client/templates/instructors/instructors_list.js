Template.instructorList.helpers({
  instructors: function() {
    return Instructors.find({}, {sort: {submitted: -1}});
  }
});