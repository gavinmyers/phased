Zaps = {};
Zaps.db = function() {
  return {
          'fire_interval':300,
          'last_fire':0
         };
}

Zaps.preload = function(game) {
  for(i in Zaps.types) {
    Zaps.types[i].preload(game);
  }
}

Zaps.create = function(k,game,soul) {
  return Zaps.types[k].create(game,soul);
} 

Zaps.zap = function(game,zap,soul,dir) {
  Zaps.zap.common[dir](game,zap,soul,dir);
}

Zaps.zap.common = {};

Zaps.zap.common['right'] = function(game,zap,soul,dir) {

  if(zap.db.last_fire + zap.db.fire_interval > game.time.now) {
    return;
  }
  zap.db.last_fire = game.time.now;

  var vx = 500; 
  if(dir == 'left') vx = vx * -1; 
  var bullet = zap.zap(game,soul); 
  bullet.body.velocity.x = vx; 
  bullet.checkWorldBounds = true;
  bullet.outOfBoundsKill = true;
  game.zaps.add(bullet);
   
  soul.animations.play('cast');
  if(dir == 'left') {
    //soul.animations.play('cast-left');
  } else if(dir == 'right') {
    //soul.animations.play('cast-right');
  } else {
    //soul.animations.play('cast');
  }
}

Zaps.zap.common['left'] = Zaps.zap.common['right']; 



Zaps.types = {};

Zaps.types['missile'] = {
  preload:function(game) {
    game.load.spritesheet('spell', 'debug/spell.png', 12, 12);
  },
  create:function(game,soul) {
    var m = {};
    m.soul = soul;
    m.db = Zaps.db();
    m.zap = function(game,soul) {
      var bullet = game.add.sprite(soul.x, soul.y, 'spell');
      bullet.zap = m;
      game.physics.arcade.enable(bullet);
      bullet.body.gravity.y = -700;
      return bullet;
    }
    m.impact = function(game,soul,bullet) {
      if(soul.kill) {
        //soul.kill();
      }
      if(bullet.kill) {
        //bullet.kill();
      }
    }
    return m;
  }
}


