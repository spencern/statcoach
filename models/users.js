if (Meteor.isServer) {
  Meteor.methods({
    'setUserTeam': function(teamId) {
      var team = Teams.findOne(teamId);
      Meteor.users.update({_id: Meteor.user()._id}, {$set: {'profile.team': team}});
    }
  });
}