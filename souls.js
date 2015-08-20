Soul = {};

Soul.gamedb = function() {
  return {
          'velocityX':100,
          'velocityY':-300, 
          'jump':500,
          'jump_max':300,
         };
}

Soul.drawdb = function() {
  return {
          'direction':false, 
          'inflight':false, 
          'inmotion':false,
          'last_jump':0, 
          'jump_counter':0
         };
}

Soul.preload = function(game) {
  for(i in Soul.types) {
    Soul.types[i].preload(game);
  }
}

Soul.create = function(k,state,x,y) {
  return Soul.types[k].create(state,x,y);
}


Soul.go = function(soul,dir) {
  Soul.go.common[dir](soul,dir);
}


Soul.go.common = {};

Soul.go.common['update'] = function(soul,dir) {
  soul.drawdb.inmotion = Math.abs(soul.body.velocity.x) > 1;
  soul.drawdb.inflight = Math.abs(soul.body.velocity.y) > 1;
  if(!soul.drawdb.inmotion && !soul.drawdb.inflight && soul.drawdb.direction != 'stop') {
    Soul.go(soul,'stop');
  }
}

Soul.go.common['stop'] = function(soul,dir) {
  if(soul.drawdb.direction == 'left') {
    soul.drawdb.direction = 'stop-left';
    soul.animations.play('stop-left');
  } else if(soul.drawdb.direction == 'right') {
    soul.drawdb.direction = 'stop-right';
    soul.animations.play('stop-right');
  } else {
    soul.drawdb.direction = 'stop';
    soul.animations.play('stop');
  }
}
Soul.go.common['right'] = function(soul,dir) {
  soul.drawdb.inmotion = true;
  var vx = soul.gamedb.velocityX;
  if(dir == 'left') vx = vx * -1; 
  soul.body.velocity.x = vx; 
  if(soul.drawdb.direction != dir && soul.drawdb.inflight == false) {
    soul.drawdb.direction = dir;
    soul.animations.play(dir);
  }
}

Soul.go.common['left'] = Soul.go.common['right']; 

Soul.go.common['duck'] = function(soul,dir) {
  if(soul.drawdb.direction != dir && soul.drawdb.inflight == false) {
    soul.drawdb.direction = dir;
    soul.animations.play(dir);
  }
}


Soul.go.common['jump'] = function(soul,dir) {
  soul.drawdb.inflight = true;
  if(soul.drawdb.last_jump + soul.gamedb.jump > game.time.now) {
    return;
  }
  if(soul.drawdb.direction == 'left') {
    soul.animations.play('jump-left');
  } else if (soul.drawdb.direction == 'right') {
    soul.animations.play('jump-right');
  } else {
    soul.animations.play('jump-up');
  }
  soul.drawdb.direction = dir;
  var vy = soul.gamedb.velocityY;
  soul.drawdb.last_jump = game.time.now;
  soul.body.velocity.y = vy; 
};

Soul.go.common['jump-right'] = function(soul,dir) {
};

Soul.go.common['jump-left'] = Soul.go.common['jump-right']; 

Soul.types = {};

Soul.types['mage'] = {
  preload: function(game) {
    game.load.spritesheet('mage', 'debug/character.png?r='+Math.random(), 32, 48);
  },
  create: function(game,x,y) {
      var m = game.add.sprite(x,y,'mage');
      m.animations.add('stop',[0,1,2,3,4,5,6,7],2,true); 
      m.animations.add('stop-right',[8],12,true); 
      m.animations.add('right',[8,9,10,11,12,13,14,15],6,true); 
      m.animations.add('stop-left',[16],12,true); 
      m.animations.add('left',[16,17,18,19,20,21,22,23],6,true); 
      m.animations.add('jump-right',[24,25,26,27],4,true); 
      m.animations.add('jump-left',[28,29,30,31],4,true); 
      m.animations.add('jump-up',[32,33,34,35],4,true);
      m.animations.add('duck',[36],12,true);
      m.animations.add('duck-right',[37],12,true);
      m.animations.add('duck-left',[38],12,true);
      m.animations.add('duck-back',[39],12,true);
      m.animations.add('climb-up',[40,41,42,43],12,true);
      m.animations.add('open-right',[44,45],12,true);
      m.animations.add('open-left',[46,47],12,true);
      m.animations.add('cast',[48,49,50,51],12,true);
      m.animations.add('cast-right',[52,53,54,55],12,true);
      m.animations.add('cast-left',[56,57,58,59],12,true);
      game.physics.arcade.enable(m);
      m.body.collideWorldBounds = true;
      m.gamedb = Soul.gamedb();
      m.drawdb = Soul.drawdb();
      return m;
  } 
};

Soul.types['spider'] = {
  preload: function(game) {
    game.load.spritesheet('spider', 'debug/spider.png', 32, 24);
  },
  create: function(game,x,y) {
      var m = game.add.sprite(x,y,'spider');
      m.animations.add('stop',[0],10,true); 
      m.animations.add('stop-right',[1],12,true); 
      m.animations.add('right',[1,2,3,4,5,6,7,8],12,true); 
      m.animations.add('stop-left',[9],12,true); 
      m.animations.add('left',[9,10,11,12,13,14,15,16],12,true); 
      m.animations.add('jump-right',[17,18,19,20],12,true); 
      m.animations.add('jump-left',[21,22,23,24],12,true); 
      m.animations.add('jump-up',[25,26,27,28],12,true);
      m.animations.add('duck',[29],12,true);
      m.animations.add('duck-right',[30],12,true);
      m.animations.add('duck-left',[31],12,true);
      m.animations.add('climb-up',[32,33,34,35],12,true);
      game.physics.arcade.enable(m);
      m.body.collideWorldBounds = true;
      m.gamedb = Soul.gamedb();
      m.drawdb = Soul.drawdb();
      return m;
  } 
};

Soul.types['bat'] = {
  preload: function(game) {
    game.load.spritesheet('bat', 'debug/bat.png', 32, 24);
  },
  create: function(game,x,y) {
      var m = game.add.sprite(x,y,'bat');
      m.animations.add('stop',[0],10,true); 
      m.animations.add('stop-right',[1],12,true); 
      m.animations.add('right',[1,2,3,4,5,6,7,8],12,true); 
      m.animations.add('stop-left',[9],12,true); 
      m.animations.add('left',[9,10,11,12,13,14,15,16],12,true); 
      m.animations.add('jump-right',[1,2,3,4,5,6,7,8],12,true); 
      m.animations.add('jump-left',[9,10,11,12,13,14,15,16],12,true); 
      m.animations.add('jump-up',[0],12,true);
      m.animations.add('duck',[29],12,true);
      m.animations.add('duck-right',[30],12,true);
      m.animations.add('duck-left',[31],12,true);
      m.animations.add('climb-up',[32,33,34,35],12,true);
      game.physics.arcade.enable(m);
      m.body.collideWorldBounds = true;
      m.gamedb = Soul.gamedb();
      m.drawdb = Soul.drawdb();
      return m;
  } 
};


Soul.types['mindflayer'] = {
  preload: function(game) {
    game.load.spritesheet('mindflayer', 'debug/mindflayer.png', 32, 48);
  },
  create: function(game,x,y) {
      var m = game.add.sprite(x,y,'mindflayer');
      m.animations.add('stop',[0],10,true); 
      m.animations.add('stop-right',[1],12,true); 
      m.animations.add('right',[1,2,3,4,5,6,7,8],12,true); 
      m.animations.add('stop-left',[9],12,true); 
      m.animations.add('left',[9,10,11,12,13,14,15,16],12,true); 
      m.animations.add('jump-right',[17,18,19,20],12,true); 
      m.animations.add('jump-left',[21,22,23,24],12,true); 
      m.animations.add('jump-up',[25,26,27,28],12,true);
      m.animations.add('duck',[29],12,true);
      m.animations.add('duck-right',[30],12,true);
      m.animations.add('duck-left',[31],12,true);
      m.animations.add('climb-up',[32,33,34,35],12,true);
      game.physics.arcade.enable(m);
      m.body.collideWorldBounds = true;
      m.gamedb = Soul.gamedb();
      m.drawdb = Soul.drawdb();
      return m;
  } 
};

