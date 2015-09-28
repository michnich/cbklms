Template.management.helpers({
  studentsCountAct: function() {
    return Students.find({status: "Active"}).count();
  },
  studentsCountChildAct: function() {
    return Students.find({status: "Active", program: "Kids Weekly"}).count();
  },
  studentsCountAdultAct: function() {
    return Students.find({status: "Active", program: "Dev Training"}).count();
  },
  studentsCountAllApplicant: function() {
    return Students.find({status: "Applicant"}).count();
  },
  studentsCountKidsApplicant: function() {
    return Students.find({status: "Applicant", program: "Kids Weekly"}).count();
  },
  studentsCountAdultApplicant: function() {
    return Students.find({status: "Applicant", program: "Dev Training"}).count();
  },
  infoRequestCountNew: function() {
    return Inforequests.find().count();
  }
});