Players = new Meteor.Collection('players');

Points = new Meteor.Collection('points');
//   passes: [],
//   receiver: null, //true or false
//   winner: null,
//   turnovers: 0,
//   pullResult: null, //caught, uncaught, dropped, ob
//   pullHangTime: null,
//   offenseFormation: null, // Vert, Horizontal, Side, Split, No Dump Vert, etc
//   defenseFormation: null, // Man, Clam, Zone (3-3-1), Zone (2-3-2), etc
//   players: [
//     {
//       fname: 'Unknown',
//       lname: 'Unknown',
//       number: -1,
//       initials: '??'
//     }
//   ]


Games = new Meteor.Collection('games');
//   points: [],
//   teams: [
//     {_id: "idstring", name: "Spikes", score: 0},
//     {_id: "idstring", name: "Peak", score: 0}    
//   ]