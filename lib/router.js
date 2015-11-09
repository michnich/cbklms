Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('students');
  }
});

Router.route('/', {name: 'home'});

Router.route('/management', {name: 'management'});

/*Students*/
Router.route('/studentList', {name: 'studentList'});

Router.route('/students/:_id', {
  name: 'studentPage',
  waitOn: function() {
    return Meteor.subscribe('projects', this.params._id);
  },
  data: function() {return Students.findOne(this.params._id);}
});

Router.route('/students/:_id/edit', {
  name: 'studentEdit',
  data: function() {return Students.findOne(this.params._id);}
});

Router.route('/registerStudent', {name: 'studentRegister'});

Router.route('/studentEnrolled', {name: 'studentEnrolled'});

Router.route('/submit', {name: 'studentSubmit'});

/*Instructors*/

Router.route('/instructorList', {name: 'instructorList'});

Router.route('/instructors/:_id', {
  name: 'instructorPage',
  waitOn: function() {
    return Meteor.subscribe('instructors', this.params._id);
  },
  waitOn: function() {
    return Meteor.subscribe('instructorattendance', this.params._id);
  },
  data: function() {return Instructors.findOne(this.params._id);}
});

Router.route('/instructors/:_id/edit', {
  name: 'instructorEdit',
  data: function() { return Instructors.findOne(this.params._id); }
});

Router.route('/submitInstructor', {name: 'instructorSubmit'});

Router.route('/instructorApply', {name: 'instructorApply'});

Router.route('/instructorThanks', {name: 'instructorThanks'});

/*Projects*/

Router.route('/project', {name: 'projectList'});

Router.route('/projects/:_id', {
  name: 'projectPage',
  waitOn: function() {
    return Meteor.subscribe('projects', this.params._id);
  },
  data: function() {return Projects.findOne(this.params._id);}
});

Router.route('/projects/:_id/edit', {
  name: 'projectEdit',
  data: function() {return Projects.findOne(this.params._id);}
});

Router.route('/submitProjects', {name: 'projectSubmit'});

/*Info Requests*/

Router.route('/inforequestsList', {
  name: 'inforequestsList',
  waitOn: function() { 
    return Meteor.subscribe('inforequests'); 
  }
});
Router.route('/inforequests/:_id', {
  name: 'inforequestPage',
  waitOn: function() {
    return Meteor.subscribe('inforequests', this.params._id);
  },
  data: function() { return Inforequests.findOne(this.params._id); }
});

Router.route('/submitInforequests', {name: 'inforequestSubmit'});
Router.route('/inforequestConfirm', {name: 'inforequestConfirm'});

Router.route('/register', {name: 'register'});
Router.route('/login', {name: 'login'});
Router.route('/registerSuccessful', {name: 'registerSuccessful'});

Router.route('/submitApplicant', {name: 'applicantSubmit'});

var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate)
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'studentPage'});
Router.onBeforeAction(requireLogin, {only:'studentList'});
Router.onBeforeAction(requireLogin, {only:'studentSubmit'});
Router.onBeforeAction(requireLogin, {only:'inforequestsList'});
Router.onBeforeAction(requireLogin, {only:'management'});
Router.onBeforeAction('dataNotFound', {only: 'instructorPage'});
Router.onBeforeAction(requireLogin, {only: 'instructorSubmit'});
Router.onBeforeAction(requireLogin, {only: 'instructorList'});
