
Template.instructorStats.helpers({
	ready: function() {
          var ready = Meteor.subscribe('instructorattendance').ready();
          var ready2 = Meteor.subscribe('instructors').ready();

          return (ready && ready2);

    },

	weeklyAttendance:function(field) {
		Meteor.subscribe("instructorattendance");
		Meteor.subscribe("instructors");
		var lastSunday = moment().day(-7);
		var thisSunday = moment().day(0);
		var startDate = new Date(moment(lastSunday).toDate());
		var endDate = new Date(moment(thisSunday).toDate());
		var attendance = [];
		attendance = InstructorAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var instructorId = [];
		var duplicate = 0;
		for (var i = 0; i < attendance.length; i++) {
			var currentId = attendance[i].instructorId;
			var found = false;
				for (var j = 0; j < instructorId.length; j++) {
					if (instructorId[j] === currentId) {
						found = true;
					}
				}
			if (found) {
				duplicate++;
			}
			else {
				instructorId[instructorId.length] = currentId;
			}
		}
    	return attendance.length - duplicate;
	},
	lostMonth:function(field) {
		var lastMonth = moment().month(moment().get('month') - 1).date(1).toDate();
		var thisMonth = moment().date(1).toDate();
		var updated = [];
		updated = Instructors.find({updated: {$gte: lastMonth, $lt: thisMonth}}).fetch();
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
		attendance = InstructorAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var count = 0;
		if (attendance[0]) {
			for (var i = 0; i < attendance.length; i++){
				var dayOfWeek = moment(attendance[i].attendancedate);
				console.log("to string %s", dayOfWeek.toString());
				console.log("day of week %d", dayOfWeek.day());
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
		attendance = InstructorAttendance.find({ attendancedate : { $gte : startDate, $lt: endDate  }}).fetch();
		var count = 0;
		if (attendance[0]) {
			for (var i = 0; i < attendance.length; i++){
				var dayOfWeek = moment(attendance[i].attendancedate);
				console.log("to string %s", dayOfWeek.toString());
				console.log("day of week %d", dayOfWeek.day());
				if (dayOfWeek.day() === 6) {
					count++;
				}
			}
		}
		return count;
	}
});