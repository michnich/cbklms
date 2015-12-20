
Template.studentStats.helpers({
	ready: function() {
          var ready = Meteor.subscribe('studentattendance').ready();
          var ready2 = Meteor.subscribe('students').ready();
          console.log(ready);

          return (ready && ready2);

    },

	weeklyAttendance:function(field) {
		Meteor.subscribe("studentattendance");
		Meteor.subscribe("students");
		var lastSunday = moment().day(-7);
		var thisSunday = moment().day(0);
		var startDate = new Date(moment(lastSunday).toDate());
		var endDate = new Date(moment(thisSunday).toDate());
		var attendance = [];
		attendance = StudentAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var studentId = [];
		var duplicate = 0;
		for (var i = 0; i < attendance.length; i++) {
			var currentId = attendance[i].studentId;
			var found = false;
				for (var j = 0; j < studentId.length; j++) {
					if (studentId[j] === currentId) {
						found = true;
					}
				}
			if (found) {
				duplicate++;
			}
			else {
				studentId[studentId.length] = currentId;
			}
		}
    	return attendance.length - duplicate;
    	
	},
	lostMonth:function(field) {
		var lastMonth = moment().month(moment().get('month') - 1).date(1).toDate();
		var thisMonth = moment().date(1).toDate();
		var updated = [];
		updated = Students.find({updated: {$gte: lastMonth, $lt: thisMonth}}).fetch();
		if (!updated[0]) {
			return 0;
		}
		var lostCount = 0;
		for (var i = 0; i < updated.length; i++){
			var status = updated[i].status;
			if (status === "Inactive") {
				lostCount++;
			}
		}
		return lostCount;
	},
	thursdayAttendance: function() {
    	var lastSunday = moment().day(-7);
		var thisSunday = moment().day(0);
		var startDate = new Date(moment(lastSunday).toDate());
		var endDate = new Date(moment(thisSunday).toDate());
		var attendance = [];
		attendance = StudentAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var count = 0;
		if (attendance[0]) {
			for (var i = 0; i < attendance.length; i++){
				var dayOfWeek = moment(attendance[i].attendancedate);
				if (dayOfWeek.day() === 4) {
					count++;
				}
			}
		}
		return count;
	},
	saturdayAttendance: function(field){
		var lastSunday = moment().day(-7);
		var thisSunday = moment().day(0);
		var startDate = new Date(moment(lastSunday).toDate());
		var endDate = new Date(moment(thisSunday).toDate());
		var attendance = [];
		attendance = StudentAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var count = 0;
		if (attendance[0]) {
			for (var i = 0; i < attendance.length; i++){
				var dayOfWeek = moment(attendance[i].attendancedate);
				if (dayOfWeek.day() === 6) {
					count++;
				}
			}
		}
		return count;
	}
});