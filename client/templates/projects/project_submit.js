Template.projectSubmit.onCreated(function() {
  Session.set('projectSubmitErrors', {});
  Session.set('checkedSkills', []);
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
  checkedSkills:function() {
    return Session.get('checkedSkills');
  },
  notSelected:function() {
    var checkedSkills = [];
    checkedSkills = Session.get('checkedSkills');
    var found = false;
    for (var i = 0; i < checkedSkills.length; i++){
      if (this._id === checkedSkills[i]._id) {
        found = true;
      }
    }
    return !found;
  }

});

Template.projectSubmit.events({
  'change .skill': function(e) {
    e.preventDefault();
    var checked = [];
    checked = Session.get('checkedSkills');
    checked[checked.length] = this;
    Session.set('checkedSkills', checked);
    var checkbox = document.getElementById(this._id); 
    checkbox.parentElement.style.display = 'none';
  },

  'submit form': function(e, template) {
    e.preventDefault();

    var checkedSkills = [];

    checkedSkills = Session.get('checkedSkills');

    var skillId = [];
    for (var i = 0; i < checkedSkills.length; i++){
      skillId[i] = checkedSkills[i]._id; 
    }

    var startDate = $(e.target).find('[name=project_start]').val();
    var endDate = $(e.target).find('[name=project_end_est]').val();

    var project = {
      project_name: $(e.target).find('[name=project_name]').val(),
      description: $(e.target).find('[name=description]').val(),
      project_lead: $(e.target).find('[name=project_lead]').val(),
      project_start: new Date(moment(startDate).toDate()),
      project_end_est: new Date(moment(endDate).toDate()),
      studentId: template.data._id,
      skills: skillId
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

    Session.set('checkedSkills', []);
    template.find("form").reset();
    $("input[type=date]").val("");
  },

  'click .skills': function(event){
    if (subscription) {
      subscription.stop();
    }

    //Keep checked skills
    var checkedSkills = [];
    $("input[name=skills]:checked").each(function(){
      var skill = $(this).val();
      checkedSkills.push(skill);
    });
    var checkedQry = {};
    checkedQry["_id"] = {$in: checkedSkills};

    //Change selected level/category
    var e = document.getElementById("level");
    var selectedLevel = e.options[e.selectedIndex].value;
    e = document.getElementById("category");
    var selectedCategory = e.options[e.selectedIndex].value;
    var selectedQry = {};

    if (selectedLevel != "All") {
      selectedQry["level"] = selectedLevel;
    }
    if (selectedCategory != "All"){
       selectedQry["category"] = selectedCategory;
    }

    var qry = {};

    if (checkedSkills[0]) {
      qry["$or"] = [checkedQry, selectedQry];
    }
    else {
      qry = selectedQry;
    }    
    subscription = Meteor.subscribe("projectSkills", qry);
    Session.set("otherQry",  qry);
  },

  'click .remove':function(e) {
      var clickedID = e.currentTarget.id;
      var checkedSkills = [];
      checkedSkills = Session.get('checkedSkills');
      var index = 0;
      for (var i = 0; i < checkedSkills.length; i++) {
        if (checkedSkills[i]._id === clickedID) {
          index = i;
          i = checkedSkills.length;
        }
      }
      if (index > -1) {
        checkedSkills.splice(index, 1);
      }

      Session.set('checkedSkills', checkedSkills);
  }
});