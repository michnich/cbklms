Template.addUser.onCreated(function() {
  Session.set('addUserErrors', {});
});
Template.addUser.helpers({
  errorMessage: function(field) {
    return Session.get('addUserErrors')[field];
  },
  errorClass: function(field) {
    return !!Session.get('addUserErrors')[field] ? 'has-error' : '';
  }
});

Template.addUser.events({
	'submit form': function(e) {
		e.preventDefault();
		var errors = {};
		
		var email = $(e.target).find('[name=email]').val();
		if (!email) {
			errors.email = "Please enter an email address";
		}
		else if (Meteor.users.findOne({"emails.address": email})) {
			errors.email = "This email is already registered";
		}

		var password = $(e.target).find('[name=password]').val();
		if (!password) {
			errors.password = "Please enter a password";
		}

		if (errors.email || errors.password) {
			return Session.set("addUserErrors", errors);
		}
		else {
			Accounts.createUser({
        		email: email,
        		password: password
      		});
      		alert("Account created");
		}
		

	}
});