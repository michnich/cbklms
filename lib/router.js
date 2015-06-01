Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {return Meteor.subscribe('students');}
});

Router.route('/', {name: 'home'});
Router.route('/studentList', {name: 'studentList'});

Router.route('/students/:_id', {
  name: 'studentPage',
  data: function() {return Students.findOne(this.params._id);}
});

Router.route('/students/:_id/edit', {
  name: 'studentEdit',
  data: function() {return Students.findOne(this.params._id);}
});

Router.route('/submit', {name: 'studentSubmit'});

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
