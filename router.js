Router.configure({
  layoutTemplate: 'root',
  loadingTemplate: 'loading'
});

Router.map(function() {
  this.route('pregame', {path: '/'});
  this.route('pitch');
  this.route('addTeam');
  this.route('selectTeam');
});