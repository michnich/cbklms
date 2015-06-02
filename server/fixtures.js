if (Students.find().count() === 0) {
  var now = new Date().getTime();

  var sianiId = Students.insert({
    first_name: 'Siani',
    last_name: 'Mobley',
    level: 0,
    dob: '9/11/2005',
    reg_packet: 'Yes',
    registered: new Date(now - 7 * 3600 * 1000)    
  });

  Projects.insert({
    studentId: sianiId,
    name: 'My Fairy Website',
    description: 'I am building a basic html and css website about faires',
    duration: '4',
    lead: 'Sylvester Mobley',
    objective: 'To learn how to add images'
  });

  Students.insert({
    first_name: 'Danae',
    last_name: 'Tilghman',
    level: 1,
    dob: '7/13/1984',
    reg_packet: 'No'
  });

  var jasonId = Students.insert({
    first_name: 'Jason',
    last_name: 'Nunn',
    level: 3,
    dob: '12/25/1984',
    reg_packet: 'No',
    registered: new Date(now - 7 * 3600 * 1000)    
  });

  Projects.insert({
    studentId: jasonId,
    name: 'Super Website',
    description: 'This is the best website ever',
    duration: '2',
    lead: 'Sylvester Mobley',
    objective: 'To learn how to add links'
  });
}