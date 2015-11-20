Template.inforequestEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentId = this._id;

    var infoChanges = {
      status: $(e.target).find('[name=status]').val(),
      comments: $(e.target).find('[name=comments]').val(),
    };

    Inforequests.update(currentId, {$set: infoChanges}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('inforequests', {_id: currentId});
      }
    });
  },
});