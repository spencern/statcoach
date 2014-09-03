Teams = new Meteor.Collection('teams');
if (Meteor.isServer) {
  Meteor.methods({
    'updateRoster': function (teamName) {
      var team = Teams.findOne({name: teamName});
      force = false; // Future update allow users to force team update.
      if ((moment().diff(team.updatedAt, 'days') < 7) || force || !team.updatedAt) {
        var Cheerio = Meteor.npmRequire('cheerio');
        this.unblock();
        
        try {
          var page = Meteor.http.get(team.usauHref);
          $ = Cheerio.load(page.content);
          var playerArray = [];
          var players = $('#CT_Main_0_gvList tr');
          // This could definitely be optimised better
          for (var i = 1; i < players.length; i++) {
            var player = {};
            for (var j = 0; j < 4; j++) {
              switch (j) {
                case 0:
                  player.number = players.eq(i).children().eq(j).text().replace(/(\t|\r\n|\n|\r)/gm,'').trim();
                  break;
                case 1:
                  var name = players.eq(i).children().eq(j).text().replace(/(\t|\r\n|\n|\r)/gm,'').trim().split(' ');
                  switch (name.length) {
                    case 0:
                      break;
                    case 1:
                      player.fname = name[0];
                      break;
                    case 2:
                      player.fname = name[0];
                      player.lname = name[1];
                      break;
                    case 3:
                      player.fname = name[0];
                      player.nname = name[1].replace(/\(|\)/g, '');
                      player.lname = name[2];
                      break;
                    default:
                      break;
                  }
                  break;
                case 2:
                  player.position = players.eq(i).children().eq(j).text().replace(/(\t|\r\n|\n|\r)/gm,'').trim();
                  break;
                case 3:
                  player.height = players.eq(i).children().eq(j).text().replace(/(\t|\r\n|\n|\r)/gm,'').trim();
                  break;
                default:
                  break;
              }
            }
            playerArray.push(player);
          }

          Teams.update(team._id, { $set: {
            updatedAt: Date.now(),
            players: playerArray
          }});
          return 'Team: ' + team.name + ' Updated.';
        } catch (e) {
          return 'Error: ' + e;
        }

      } else {
        // Last Updated within a week = don't update again.      
        // Grab player and team info and update correct team.
        return 'Team:' + team.name + ' already up to date';
      }
    }
  });
}