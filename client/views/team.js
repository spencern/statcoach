Template.team.helpers({
  updatedAt: function () {
    return moment(this.updatedAt).fromNow();
  },
  fullName: function () {
    return _.capitalize(this.fname) + " " + _.capitalize(this.lname);
  },
  editable: function () {
    if (this.userCreated) {
      return '';
    } else {
      return 'disabled';
    }
  },
  updateable: function () {
    if (this.userCreated) {
      return 'disabled';
    } else {
      return '';
    }
  }
});