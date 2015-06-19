Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
    return Meteor.subscribe('students');
  }
});

Router.route('/', {name: 'home'});

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

Router.route('/submit', {name: 'studentSubmit'});

/*Projects*/
Router.route('/projects/:_id', {
  name: 'projectPage',
  waitOn: function() {
    return Meteor.subscribe('projects', this.params._id);
  },
  data: function() {return Projects.findOne(this.params._id);}
});

Router.route('/submitProjects', {name: 'projectSubmit'});

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
