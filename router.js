Router.configure({
  layoutTemplate: 'root',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('pitch');
  this.route('addTeam');
  this.route('selectTeam');
  this.route('team', {
    path: '/team/:_id',
    waitOn: function() { return Meteor.subscribe('team', this.params._id); },
    data: function () { return {team: Teams.findOne({_id: this.params._id }) }; }
  });
});