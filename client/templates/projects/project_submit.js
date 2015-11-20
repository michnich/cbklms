Template.projectSubmit.onCreated(function() {
  Session.set('projectSubmitErrors', {});
});

var subscription;

Template.projectSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('projectSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('projectSubmitErrors')[field] ? 'has-error' : '';
  },
  projectSkills:function() {
    return Skills.find(Session.get("otherQry"));
  },

});

Template.projectSubmit.rendered = function () {
    var e = document.getElementById("level");
    var selectedLevel = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    var selectedCategory = e.options[e.selectedIndex].value;
    var qry = {};
    if (selectedLevel != "All") {
      qry["level"] = selectedLevel;
    }
    if (selectedCategory != "All"){
      qry["category"] = selectedCategory;
    }
    subscription = Meteor.subscribe("projectSkills", qry);
    return subscription;
}

Template.projectSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var checkedSkills = [];

    $("input[name=skills]:checked").each(function(){
      var skill = $(this).val();
      checkedSkills.push(skill);
    });

    var project = {
      project_name: $(e.target).find('[name=project_name]').val(),
      description: $(e.target).find('[name=description]').val(),
      studentId: template.data._id,
      skills: checkedSkills
    };

    var errors = {};
    if (! project.project_name) {
      errors.project_name = "Please write some content";
      return Session.set('projectSubmitErrors', errors);
    }

    Meteor.call('projectInsert', project, function(error, projectId) {
      if (error){
        throwError(error.reason);
      } else {
        $project.val('');
      }
    });
  },

  'click .skills': function(event){
    if (subscription) {
      subscription.stop();
    }
    var e = document.getElementById("level");
    var selectedLevel = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    var selectedCategory = e.options[e.selectedIndex].value;
    var qry = {};
    if (selectedLevel != "All") {
      qry["level"] = selectedLevel;
    }
    if (selectedCategory != "All"){
      qry["category"] = selectedCategory;
    }
    subscription = Meteor.subscribe("projectSkills", qry);
    Session.set("otherQry", qry);

  }
});