Template.instructorSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var instructor = {
      status: $(e.target).find('[name=status]').val(),
      first_name: $(e.target).find('[name=first_name]').val(),
      last_name: $(e.target).find('[name=last_name]').val(),
      dob: $(e.target).find('[name=dob]').val(),
      email: $(e.target).find('[name=email]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      park_check: $(e.target).find('[name=park_check]').val(),
      park_check_date: $(e.target).find('[name=park_check_date]').val(),
      pa_criminal_check: $(e.target).find('[name=pa_criminal_check]').val(),
      pa_criminal_check_date: $(e.target).find('[name=pa_criminal_check_date]').val(),
      pa_child_check: $(e.target).find('[name=pa_child_check]').val(),
      pa_child_check_date: $(e.target).find('[name=pa_child_check_date]').val(),
      fbi_check: $(e.target).find('[name=fbi_check]').val(),
      fbi_check_date: $(e.target).find('[name=fbi_check_date]').val(),
      orientation: $(e.target).find('[name=orientation]').val(),
      abuse: $(e.target).find('[name=abuse]').val(),
      classroom: $(e.target).find('[name=classroom]').val(),
      employer: $(e.target).find('[name=employer]').val(),
      position: $(e.target).find('[name=position]').val(),
      annual: $(e.target).find('[name=annual]').val(),
      type: $(e.target).find('[name=type]').val(),
      address1: $(e.target).find('[name=address1]').val(),
      address2: $(e.target).find('[name=address2]').val(),
      city: $(e.target).find('[name=city]').val(),
      state: $(e.target).find('[name=state]').val(),
      zip: $(e.target).find('[name=zip]').val(),
      country: $(e.target).find('[name=country]').val(),
      submitted: new Date() //moved this here from the collection method
    };

    Meteor.call('instructorInsert', instructor, function(error, result) {
      // display the error to the user and abort
      if (error)
        return alert(error.reason);

      if (result.instructorExists)
        alert('This instructor already exists');

      Router.go('instructorPage', {_id: result._id});  
    });    
  }
});