Inforequests = new Mongo.Collection('inforequests');
Inforequests.allow({
  insert: function(userID, inforequest){
    return inforequest.createdBy !== userID
  }
})