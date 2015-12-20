Template.projectDetails.helpers({
  projects: function() {
    return Projects.find();
  },
  projectStart: function() {
  	return moment(this.project_start).format("MM-DD-YYYY");
  },
  projectEndEst: function() {
  	return moment(this.project_end_est).format("MM-DD-YYYY");
  },
  projectEnd: function() {
  	if (this.project_end_act){
  		return moment(this.project_end_act).format("MM-DD-YYYY");
  	}
  	else {
  		return "Incomplete"
  	}
  }
});