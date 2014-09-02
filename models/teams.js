Teams = new Meteor.Collection('teams');
if (Meteor.isServer) {
  Meteor.methods({
    'getRoster': function getRoster(teamId) {
      var team = Meteor.teams.findOne({_id: teamId});
      var Cheerio = Meteor.npmRequire('cheerio');
      // Grab player and team info and update correct team.
    }
  });
}