Pitch = {
  // *************************************** //
  // User Definable Colors
  // *************************************** //

  colors: {
    attack_endzone_color: 'rgba(0, 0, 0, 0.1)',  //'rgba(0,200,0,0.9)',
    defend_endzone_color: 'rgba(0, 0, 0, 0.1)',  //'rgba(200,0,0,0.9)',
    pitch_color:          'rgba(0, 200, 0, 0.3)',
    user_team_color:      'rgba(0,100,255,0.9)',
    opponent_team_color:  'rgba(255,0,0,0.6)',
    text_color:           'rgba(0,0,0,0.5)'
  },

  // *************************************** //
  // Game and Point Session Variables
  // *************************************** //

  // Initialize Game
  game:  {
    points: [],
    teams: [
      {name: "a", score: 0},
      {name: "b", score: 0}
    ]
  },

  // Direction user's team is attacking
  direction: true, // true = ltr, false = rtl

  // x,y coords of disc as of last play
  // Should we get this from the pass stack instead?
  currentDiscPosition: {x: null, y: null},

  offensiveTeam: false,

  userTeam: {},

  // Variables for the point
  point: {
    passes: [],             // Array of passes. Passes are objects that contain team, player, x, y, and additional detail (score, assist, drop, throwaway, defensed);
    receiver: false,        // true = received, false = pulled
    direction: true,        // true = Left to Right, false = Right to Left
    winner: null,           // Did user's team win the point
    turnovers: 0,           // Number of turnovers on the point (even number or 0 means receiving team won)
    pullResult: null,       // caught, uncaught, dropped, ob
    pullHangTime: null,     // In milliseconds
    offenseFormation: null, // Vert, Horizontal, Side, Split, No Dump Vert, etc
    defenseFormation: null, // Man, Clam, Zone (3-3-1), Zone (2-3-2), etc
    players: [
      {
        fname: 'Player',
        lname: '1',
        number: 1,
        initials: 'P1'
      },
      {
        fname: 'Player',
        lname: '2',
        number: 2,
        initials: 'P2'
      },
      {
        fname: 'Player',
        lname: '3',
        number: 3,
        initials: 'P3'
      },
      {
        fname: 'Player',
        lname: '4',
        number: 4,
        initials: 'P4'
      },
      {
        fname: 'Player',
        lname: '5',
        number: 5,
        initials: 'P5'
      },
      {
        fname: 'Player',
        lname: '6',
        number: 6,
        initials: 'P6'
      },
      {
        fname: 'Player',
        lname: '7',
        number: 7,
        initials: 'P7'
      }
    ]
  },

  pass: {
    player: {_id: 'unknownPlayer', fname: 'Unknown', lname: 'Player', number: -1, initials: 'UP'},
    user_team: true,
    team_id: null,
    result: null,
    position: {x: null, y: null}
  },

  getLeftEndzoneColor: function() {
    if(this.getDirection())
      return this.colors.defend_endzone_color;
    else
      return this.colors.attack_endzone_color;
  },

  getRightEndzoneColor: function() {
    if(this.getDirection())
      return this.colors.attack_endzone_color;
    else
      return this.colors.defend_endzone_color;
  },

  setDirection: function(dir) {
    this.point.direction = dir;
  },

  getDirection: function() {
    return this.point.direction;
  },

  setCurrentDiscPosition: function(x,y) {
    this.currentDiscPosition.x = x;
    this.currentDiscPosition.y = y;
  },

  resetCurrentDiscPosition: function() {
    this.currentDiscPosition.x = null;
    this.currentDiscPosition.y = null;
  },

  // newPoint: function(rec) {
  //   this.point.passes = [];
  //   this.point.winner = null;
  //   this.point.receiver = rec;
  //   this.setDirection(!this.getDirection());
  // },

  newPoint: function(rec, dir) {
    this.point = {
      passes: [],             // Array of passes. Passes are objects that contain team, player, x, y, and additional detail (score, assist, drop, throwaway, defensed);
      receiver: rec,        // true = received, false = pulled
      direction: dir,        // true = Left to Right, false = Right to Left
      turnovers: 0,           // Number of turnovers on the point (even number or 0 means receiving team won)
      pullResult: null,       // caught, uncaught, dropped, ob
      pullHangTime: null,     // In milliseconds
      offenseFormation: null, // Vert, Horizontal, Side, Split, No Dump Vert, etc
      defenseFormation: null, // Man, Clam, Zone (3-3-1), Zone (2-3-2), etc
      players: []
    };
    this.offensiveTeam = rec;
  },

  setPointWinner: function(winner) {
    this.point.winner = winner;
  },

  turnover: function() {
    this.offensiveTeam = !this.offensiveTeam;
  },

  getCurrentDiscPosition: function() {
    return {x: this.currentDiscPosition.x, y: this.currentDiscPosition.y};
  },

  startedOffenseOrDefense: function() {
    return this.point.receiver === true ? 'Offensive Point' : 'Defensive Point';
  }
};

// Let 10px equal one yard.
// Pitch is 1200 px long
//  by 400px wide
Template.pitch.helpers({
  userScore: function () {
    return Pitch.teams[0].score;
  },
  opponentScore: function () {
    return Pitch.teams[1].score;
  }
});

var mousePos = {};

// Add players to the menu
var passMenu = [{
        name: 'complete',
        title: 'complete pass',
        fun: function () {
          completePass(mousePos.x, mousePos.y);
        }
    }, {
        name: 'incomplete',
        title: 'incomplete pass',
        fun: function () {
          incompletePass(mousePos.x, mousePos.y);
        }
    }, {
        name: 'score',
        title: 'score',
        fun: function () {
          scoringPass(mousePos.x, mousePos.y);
        }
    }];

Template.pitch.events({
  'click #new_game_button': function () {
    // increment the counter when button is clicked
    resetPitch();
    drawPitch();
  },

  'click #pitch': function (evt) {
    mousePos = getMousePos(evt);
    $('#pitch').contextMenu(passMenu);
  },

  // 'mousedown #pitch': function (evt) {
  //   pressTimer = window.setTimeout( function (evt) {
  //     longPress = true;
  //   }, 400);
  // },

  // 'mouseup #pitch': function (evt) {
  //   var mousePos = getMousePos(evt);
  //   if(longPress) {
  //     incompletePass(mousePos.x, mousePos.y);
  //   } else {
  //     completePass(mousePos.x, mousePos.y);
  //   }

  //   longPress = false;
  //   clearTimeout(pressTimer);
  // },
  // 'mouseup #pitch': function (evt) {
  //   longPress = false;
  //   clearTimeout(pressTimer);
  // },

  'click #new_point_button': function () {
    newPoint();
  },

  'click #print_game_button': function () {
    console.log(Pitch.game);
  },

  // 'click #won_point_button': function () {
  //   Pitch.setPointWinner(true);
  // },

  // 'click #lost_point_button': function () {
  //   Pitch.setPointWinner(false);
  // },

  // 'click #turnover_button': function () {
  //   Pitch.turnover();
  // },

  'click #dir_ltr': function () {
    resetPitch();
    Pitch.resetCurrentDiscPosition();
    Pitch.setDirection(true);
    drawPitch();
  },

  'click #dir_rtl': function () {
    resetPitch();
    Pitch.resetCurrentDiscPosition();
    Pitch.setDirection(false);
    drawPitch();
  }
});

Template.pitch.rendered = function() {
  drawPitch();
  $('#pitch').contextMenu(passMenu);
};

function passDistance(x,y) {
  var xDistance = x - Pitch.currentDiscPosition.x;
  var yDistance = y - Pitch.currentDiscPosition.y;

  return Math.floor(Math.sqrt(xDistance * xDistance + yDistance * yDistance)/10);
}

function completePass(x, y) {
  var dist = passDistance(x, y);
  drawPass(x, y, 'complete', dist);
  //extract to completedPass
  Pitch.point.passes.push({
    result: {complete: true, detail: 'catch'},
    position: {x: x, y: y},
    userTeam: Pitch.offensiveTeam,
    distance: dist
  });
  Pitch.currentDiscPosition = {x: x, y: y};
}

function incompletePass(x, y) {
  var dist = passDistance(x, y);
  drawPass(x, y, 'incomplete', dist);
  //extract to completedPass
  Pitch.point.passes.push({
    result: { complete: false, detail: 'incomplete' },
    position: { x: x, y: y },
    userTeam: Pitch.offensiveTeam,
    distance: dist
  });
  Pitch.turnover();
  Pitch.currentDiscPosition = {x: x, y: y};
}

function scoringPass(x, y) {
  var dist = passDistance(x, y);
  drawPass(x,y, 'scoring', dist);
  Pitch.point.passes.push({
    result: { complete: true, detail: 'score'},
    position: {x: x, y: y},
    userTeam: Pitch.offensiveTeam,
    distance: dist
  });
  Pitch.setPointWinner(Pitch.offensiveTeam);
  endPoint();
  // Show point review
  // Offer option to reset lineup
  // Offer option to start new point
  // Offer option to end game
}

// find middle point of line (x, y)
// use context.rotate(angleInRadians)
// use atan2(y - oldY, x - oldX) to find radians
// use context.save and context.restore to not jack up the pass points
// 

function drawPass(x,y, result, dist) {
  var canvas = document.getElementById('pitch');
  var context = canvas.getContext('2d');
  
  var prevPos = Pitch.currentDiscPosition.x === null ? {x: x, y: y} : Pitch.currentDiscPosition;
  var activeColor = Pitch.offensiveTeam ? Pitch.colors.user_team_color : Pitch.colors.opponent_team_color;
  var inactiveColor = Pitch.offensiveTeam ? Pitch.colors.opponent_team_color : Pitch.colors.user_team_color;

  context.beginPath();
  context.moveTo(prevPos.x, prevPos.y);
  context.fillStyle = activeColor;
  context.strokeStyle = activeColor;
  context.lineTo(x, y);
  context.stroke();
  context.closePath();
  context.beginPath();

  if(result === 'incomplete') {
    context.lineWidth = 5;
    context.strokeStyle = inactiveColor;
  } else if (result === 'scoring') {
    context.lineWidth = 15;
    context.strokeStyle = 'green';
  }

  context.arc(x, y, 7, 0, 2 * Math.PI, false);
  context.stroke();
  context.fill();
  
  if(result === 'incomplete' || result === 'scoring') {
    context.lineWidth = 1; // Reset linewidth after turnover
    context.strokeStyle = 'black';
  }
    

  context.closePath();
}

function endPoint() {
  // Should be an accessor method
  Pitch.game.points.push(Pitch.point);
  
  if(Pitch.point.winner)
    Pitch.game.teams[0].score++; // Should be an incremental method
  else
    Pitch.game.teams[1].score++; // Should be an incremental method
}

function newPoint() {
    var previousPointId = Pitch.game.points.length-1;
    
    // Start new point
    // Set new point receiver to team that lost previous point
    // Flip Direction
    Pitch.newPoint(!Pitch.game.points[previousPointId].winner,
      !Pitch.game.points[previousPointId].direction);
    
    // Reset the canvas
    resetPitch();

    // Reset the disc position
    Pitch.resetCurrentDiscPosition();
    // Between Point hooks go here.

    // Redraw the pitch w/ new variables.
    drawPitch();
}

function drawPitch() {
  var canvas = document.getElementById('pitch');
  var context = canvas.getContext('2d');
  // Outline Pitch

  // Set Pitch Points
  var leftEndzoneLine = canvas.width*2.5/12;
  var rightEndzoneLine = canvas.width*9.5/12;

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(canvas.width, 0);
  context.lineTo(canvas.width, canvas.height);
  context.lineTo(0, canvas.height);
  context.lineTo(0,0);
  context.stroke();
  context.fillStyle = Pitch.colors.pitch_color;
  context.fill();
  context.closePath();
  
  // Create Left Endzone
  context.beginPath();
  context.fillStyle = Pitch.getLeftEndzoneColor();
  context.moveTo(0,0);
  context.lineTo(leftEndzoneLine,0);
  context.lineTo(leftEndzoneLine,canvas.height);
  context.lineTo(0,canvas.height);
  context.lineTo(0,0);
  context.fill();
  context.stroke();
  context.closePath();
  
  // Create Right Endzone
  context.beginPath();
  context.fillStyle = Pitch.getRightEndzoneColor();
  context.moveTo(rightEndzoneLine,0);
  context.lineTo(canvas.width,0);
  context.lineTo(canvas.width,canvas.height);
  context.lineTo(rightEndzoneLine,canvas.height);
  context.lineTo(rightEndzoneLine,0);
  context.fill();
  context.stroke();
  context.closePath();
  
  // Indicate Started Offense or Defense
  context.beginPath();
  context.textAlign = 'center';
  context.fillStyle = Pitch.colors.text_color;
  context.font = "bold 16px Arial";
  context.fillText(Pitch.startedOffenseOrDefense(), canvas.width/2, canvas.height/2);
  
  // Indicate Score
  context.fillText(Pitch.game.teams[0].name + ": " + Pitch.game.teams[0].score, canvas.width/2, canvas.height/2 + 25);
  context.fillText(Pitch.game.teams[1].name + ": " + Pitch.game.teams[1].score, canvas.width/2, canvas.height/2 + 50);
  context.closePath();
}

function getMousePos(evt) {
  var canvas = document.getElementById('pitch');
  var rect = canvas.getBoundingClientRect();
  return {
    x: (evt.clientX - rect.left) * 900 / rect.width,
    y: (evt.clientY - rect.top) * 300 / rect.height
  };
}

function resetPitch() {
  var canvas = document.getElementById('pitch');
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, canvas.width, canvas.height);
}