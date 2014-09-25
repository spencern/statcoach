Template.header.userTeam = function () {
  if (!Session.get('userTeam')) {
    if (!localStorage.userTeam)
      return 'unset';
    else
      Session.set('userTeam', JSON.parse(localStorage.userTeam));
  }
  return Session.get('userTeam');
};