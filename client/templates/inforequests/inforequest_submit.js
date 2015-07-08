Template.inforequestSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var inforequest = {
      name: $(e.target).find('[name=name]').val(),
      email: $(e.target).find('[name=email]').val(),
      subject: $(e.target).find('[name=subject]').val(),
      message: $(e.target).find('[name=message]').val()
    };

    inforequest._id = Inforequests.insert(inforequest);
    Router.go('inforequestConfirm', inforequest);
  }
});