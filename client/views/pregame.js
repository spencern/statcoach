Template.pregame.settings = function () {
  return {
    position: 'bottom',
    limit: 5,
    rules: [
      {
        collection: Teams,
        field: 'name',
        template: Template.selectTeam,
        callback: function (doc, element) {
          Meteor.call('updateRoster', doc.name);
          Session.set('userTeam', doc);
        }
      }
    ]
  };
};

Template.pregame.events({
  'click #select_team_button': function () {
    localStorage.userTeam = JSON.stringify(Session.get('userTeam'));
    console.log('Select Team Button clicked');
    Meteor.call('setUserTeam', Session.get('userTeam')._id);
    // var userTeam = Teams.findOne(Session.get('userTeam'));
    // Pitch.userTeam = userTeam;
  }
});

Template.pregame.team = function () {
  if (!Session.get('userTeam')) {
    if (!localStorage.userTeam)
      Session.set('userTeam', {players: []});
    else
      Session.set('userTeam', JSON.parse(localStorage.userTeam));
  }
  return Session.get('userTeam');
};