Meteor.startup(function () {
  // Init Club Mixed
  if (Teams.find({league: 'Club', division: 'Mixed'}).count() === 0) {
    for(var i = 0; i < clubMixed.length; i++) {
      Teams.insert({
        name: clubMixed[i].name,
        usauId: clubMixed[i].usauId,
        usauHref: clubMixed[i].usauHref,
        league: 'Club',
        division: 'Mixed'
      });
    }
  }

  // Init Club Men
  if (Teams.find({league: 'Club', division: 'Men'}).count() === 0) {
    for(var j = 0; j < clubMen.length; j++) {
      Teams.insert({
        name: clubMen[j].name,
        usauId: clubMen[j].usauId,
        usauHref: clubMen[j].usauHref,
        league: 'Club',
        division: 'Men'
      });
    }
  }

  // Init Club Women
  if (Teams.find({league: 'Club', division: 'Women'}).count() === 0) {
    for(var k = 0; k < clubWomen.length; k++) {
      Teams.insert({
        name: clubWomen[k].name,
        usauId: clubWomen[k].usauId,
        usauHref: clubWomen[k].usauHref,
        league: 'Club',
        division: 'Women'
      });
    }
  }

  // Init Club Men
  if (Teams.find({league: 'College', division: 'Men'}).count() === 0) {
    for(var l = 0; l < collegeMen.length; l++) {
      Teams.insert({
        name: collegeMen[l].name,
        usauId: collegeMen[l].usauId,
        usauHref: collegeMen[l].usauHref,
        league: 'College',
        division: 'Men'
      });
    }
  }

  // Init Club Women
  if (Teams.find({league: 'College', division: 'Women'}).count() === 0) {
    for(var m = 0; m < collegeWomen.length; m++) {
      Teams.insert({
        name: collegeWomen[m].name,
        usauId: collegeWomen[m].usauId,
        usauHref: collegeWomen[m].usauHref,
        league: 'College',
        division: 'Women'
      });
    }
  }
});