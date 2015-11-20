Template.skillEdit.events({
  'submit form': function(e){
    e.preventDefault();

    var currentId = this._id;

    var skillChanges = {
      name: $(e.target).find('[name=name]').val(),
      category: $(e.target).find('[name=category]').val(),
      level: $(e.target).find('[name=level]').val()
    };

    Skills.update(currentId, {$set: skillChanges}, function(error) {
      if (error) {
        throwError(error.reason);
      } else {
        Router.go('skillEdit', {_id: currentId});
      }
    });
  },
});