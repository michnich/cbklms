if (Students.find().count() === 0) {
  Students.insert({
    first_name: 'Siani',
    last_name: 'Mobley',
    level: 0,
    dob: '9/11/2005',
    reg_packet: 'Yes'
  });

  Students.insert({
    first_name: 'Danae',
    last_name: 'Tilghman',
    level: 1,
    dob: '7/13/1984',
    reg_packet: 'No'
  });
}