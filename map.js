Map = {};
Map.preload = function(game) {
  for(i in Map.types) {
    Map.types[i].preload(game);
  }
}
Map.create = function(k,state) {
  return Map.types[k].create(state);
}


Map.types = [];

Map.types['tile'] = {
  preload: function(game) {
    game.load.spritesheet('red', 'debug/red.png?r='+Math.random(), 32, 32);
    game.load.spritesheet('tile', 'debug/tile.png?r='+Math.random(), 32, 32);
    game.load.tilemap('level1', 'debug/level1.json?r='+Math.random(), null, Phaser.Tilemap.TILED_JSON);

  },
  create: function(game) {
    var map = game.add.tilemap('level1');
    map.addTilesetImage('tile', 'tile');

    var layer = map.createLayer('platform');

    map.createLayer('background');

    map.setCollisionByExclusion([],true,layer);

    var interactionLayer = map.createLayer('interactions');
    game.interactions.push(interactionLayer);

    map.createLayer('foreground');
    
    game.map = map;
    game.layer = layer;
    game.physics.arcade.enable(map);

    game.ladders = game.add.group();
    for(var i in map.objects.ladders) {
      var l1 = map.objects.ladders[i];
      var ldr = game.add.sprite(l1.x, l1.y, 'red');
      game.physics.arcade.enable(ldr);
      ldr.body.allowGravity = false;
      ldr.alpha = 0.0;
      ldr.body.immovable = true;
      ldr.body.setSize(l1.width, l1.height);
      ldr.width = l1.width;
      ldr.height = l1.height;
      game.ladders.add(ldr);
    }

    game.events = game.add.group();
    for(var i in map.objects.events) {
      var l1 = map.objects.events[i];
      var action = l1.properties.action;
      var evt = game.add.sprite(l1.x, l1.y, 'red');
      evt.gameAction = action;
      evt.gameAction = function(game) {
        for(k = 0; k < 100; k++) {
          return;
          var s = game.add.sprite(Math.random() * 100, Math.random() * 100, 'red');
          game.physics.arcade.enable(s);
          s.alpha = 1;
          s.body.allowGravity = false;
          s.body.immovable = true;
          s.tint = "#ffffff";
          s.body.setSize(Math.random() * 100, Math.random() * 100);
          s.width = Math.random() * 100; 
          s.height = Math.random() * 100; 
        }
        evt.gameAction = function(game) {}
      };
      console.log(l1);
      console.log(evt);
      game.physics.arcade.enable(evt);
      evt.body.allowGravity = false;
      evt.alpha = 0.0;
      evt.body.immovable = true;
      evt.body.setSize(l1.width, l1.height);
      evt.width = l1.width;
      evt.height = l1.height;
      game.events.add(evt);

    }
  }
};

Map.types['sky'] = {
  preload: function(game) {
    game.load.spritesheet('sky', 'debug/sky.png?r='+Math.random(), 32, 32);
    game.load.tilemap('sky', 'debug/sky.json?r='+Math.random(), null, Phaser.Tilemap.TILED_JSON);

  },
  create: function(game) {

    var map = game.add.tilemap('sky');
    map.addTilesetImage('sky', 'sky');
    var layer = map.createLayer('sky');
    layer.scrollFactorX= 0.25;
    layer.resizeWorld();
    game.skymap = map;
    game.skylayer = layer;
  }
};
Map.types['background'] = {
  preload: function(game) {
    game.load.spritesheet('background', 'debug/background.png?r='+Math.random(), 32, 96);
    game.load.tilemap('background', 'debug/background.json?='+Math.random(), null, Phaser.Tilemap.TILED_JSON);

  },
  create: function(game) {

    var map = game.add.tilemap('background');
    map.addTilesetImage('background', 'background');
    var layer = map.createLayer(0);
    layer.scrollFactorX= 0.75;
    layer.resizeWorld();
    game.backgroundmap = map;
    game.backgroundlayer = layer;
  }
};
