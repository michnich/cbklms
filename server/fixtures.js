if (Students.find().count() === 0) {
  var now = new Date().getTime();

  var tomId = Meteor.users.insert({
    profile: { name: 'Tom Coleman' }
  });
  var tom = Meteor.users.findOne(tomId);

  var sianiId = Students.insert({
    first_name: 'Siani',
    last_name: 'Mobley',
    level: 0,
    dob: '9/11/2005',
    reg_packet: 'Yes',
    registered: new Date(now - 7 * 3600 * 1000),    
    submitted: new Date(now - 7 * 3600 * 1000),
    projectsCount: 2  
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
    reg_packet: 'No',
    registered: new Date(now - 7 * 3600 * 1000),
    submitted: new Date(now - 10 * 3600 * 1000),
  });

  var jasonId = Students.insert({
    first_name: 'Jason',
    last_name: 'Nunn',
    level: 3,
    dob: '12/25/1984',
    reg_packet: 'No',
    registered: new Date(now - 7 * 3600 * 1000), 
    submitted: new Date(now - 12 * 3600 * 1000),   
  });

  Projects.insert({
    studentId: jasonId,
    name: 'Super Website',
    description: 'This is the best website ever',
    duration: '2',
    lead: 'Sylvester Mobley',
    objective: 'To learn how to add links'
  });
<<<<<<< HEAD
}

if (Inforequests.find().count() === 0) {
  Inforequests.insert({
    name: 'John Doe',
    email: 'jdoe@testemail.com',
    subject: 'Other',
    message: 'This is a test message'
  });

  Inforequests.insert({
    name: 'Sean Strong',
    email: 'ss@testemail.com',
    subject: 'Other',
    message: 'This is another test message'
=======

  Inforequests.insert({
    name: 'Jim Dough',
    email: 'jdough@dough.com',
    phone: '215-555-1212',
    subject: 'need information',
    message: 'I need some information about this class'
  });

  Inforequests.insert({
    name: 'Steve Tinked',
    email: 'st@st.com',
    phone: '215-555-2424',
    subject: 'looking for information',
    message: 'I would linke some info about this class'
  });

  Inforequests.insert({
    name: 'Kristen Sherman',
    email: 'ksherman@sherman.com',
    phone: '215-555-3636',
    subject: 'some information',
    message: 'Can you answer a question'
>>>>>>> students
  });
}