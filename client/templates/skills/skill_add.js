Template.skillAdd.events({
	'submit form': function(e){
		e.preventDefault();

		var skill = {
			name: $(e.target).find('[name=name]').val(),
			category: $(e.target).find('[name=category]').val(),
			level: $(e.target).find('[name=level]').val(),
		}

		console.log(skill.name, skill.category, skill.level);

		Meteor.call('addSkill', skill, function(error, result) {
			if (error) {
				return alert(error.reason);
			}
			Router.go('skillList', {_id: result._id});
		});

	}
})