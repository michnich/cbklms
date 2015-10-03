Instructors = new Mongo.Collection('instructors');

Instructors.allow({
  insert: function(userId, doc) {
    // only allow posting if you are logged in
    return !! userId;
  }
});