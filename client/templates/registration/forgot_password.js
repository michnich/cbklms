Template.forgotPassword.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = event.target.loginEmail.value;
        console.log(email);
        Accounts.forgotPassword({email: email}, function(err) {
        if (err) {
          if (err.message === 'User not found [403]') {
            alert('This email does not exist.');
          } else {
            alert('Error');
          }
        } else {
          alert('Email Sent');
        }
      });
    }
});