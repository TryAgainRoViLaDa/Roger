var config = {
    type: Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:'arcade',
        arcade:{
            debug: true,
            gravity:{y:0}
        }
    },
    scene:{
        preload:preload,
        create:create,
        update:update
    }
};

var game = new Phaser.Game(config);

var dinero=0;
var comida=0;

var direccion1=1;
var direccion2=1;

var cd=0;
var cd2=100;
var mensaje=0;
var scorecd=0;
var final=20;
var inicio=0;
var cd3=0;
var cd4=0;

var dirfle=1;

var finalconversacion=true;


//Funcion de cargar imagenes y el
function preload() {

    this.load.image('gameTiles', 'tileset/NatureTileset.png');

    this.load.tilemapTiledJSON('tilemap', 'maps/mapafinal.json');

    this.load.atlas('attack','assets/attack.png', 'assets/attack_atlas.json');

    this.load.image('moneda', 'assets/monedas.png');

    this.load.image('cerdo', 'assets/cerdo.png');

    this.load.image('inventario', 'assets/inventario.png');

    this.load.image('chuleta', 'assets/chuleta.png');  

    this.load.image('boss', 'assets/boss.png');

    this.load.image('disparo', 'assets/flecha.png');

    this.load.image('texto', 'assets/bafarada1.png');

    this.load.image('texto2', 'assets/bafarada2.png');

    this.load.image('ayudante', 'assets/ayudante.png');

    this.load.image('toma', 'assets/toma.png');



}
   
function create() 
{


  //Colisiones de mapa //
  map = this.make.tilemap({key:'tilemap'});
  tileset = map.addTilesetImage('nature','gameTiles');
  capa = map.createDynamicLayer(0, tileset);


  //Creando jugador//
  player = this.physics.add.sprite(100,100, 'attack').setScale(0.08);
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  

  //Colisiones de obstaculos//
  obstaculos = map.createDynamicLayer(1, tileset);
  obstaculos.setCollisionByProperty({colisiones: true});
  this.physics.add.collider(player, obstaculos);
  

  //Creando animaciones del jugador//
  this.anims.create(
  {
    key:'attack',
    frames: this.anims.generateFrameNames('attack', 
    {
      prefix: 'attack',
            star: 0,
            end: 10,
    }),
    repeat:0,
    frameRate:15
  });

    this.anims.create(
  {
    key:'toma',
    frames: this.anims.generateFrameNames('toma', 
    {
      prefix: 'toma',
            star: 0,
            end: 10,
    }),
    repeat:0,
    frameRate:15
  });


  //Teclas usadas//
  KeyA=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  KeyD=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  KeyW=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  KeyS=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  ATTACK=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  KeyE=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
  DISPARAR=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);


  //Creando grupos//
  monedaList = this.physics.add.group();


  //Creando sprites//
  cartera = this.add.sprite(40,50,'moneda').setScale(0.1);
  cerdo1 = this.physics.add.sprite(420,100,'cerdo').setScale(0.2);
  cerdo2 = this.physics.add.sprite(420,170,'cerdo').setScale(0.1);
  boss = this.physics.add.sprite(1300,2000,'boss').setScale(0.8);
  inventario = this.add.sprite(700,80, 'inventario').setScale(0.3);
  chuleta = this.add.sprite(595,40, 'chuleta').setScale(0.3);
  ayudante = this.physics.add.sprite(1800,1800, 'ayudante').setScale(0.2);



  //Creando overlaps//
  this.physics.add.overlap(player, monedaList, recolectar, null, this);
  this.physics.add.overlap(player, cerdo1, ataque1, null, this);
  this.physics.add.overlap(player, cerdo2, ataque2, null, this);
  this.physics.add.overlap(player, boss, ataque1, null, this);
  this.physics.add.overlap(player, ayudante, interaccion, null, this);
  this.physics.add.overlap(player, ayudante, hablar, null, this);
  this.physics.add.overlap(player, ayudante, pasar, null, this);



  //Creando textos//
  scoreText = this.add.text(70, 50,+ dinero, { fontSize: '20px', fill: 'white' });
  scoreText1 = this.add.text(605, 45,+ chuleta, { fontSize: '20px', fill: 'white' });


    
  //Configuracion de la camara//
  this.cameras.main.setBounds(0, 0, 1280 * 2, 1280 * 2);
  this.physics.world.setBounds(0, 0, 1280 * 2, 1280 * 2);
  this.cameras.main.startFollow(player, true, 0.05, 0.05);

   
}

function update()
{
    if(cd4>0)
    {
      cd4=cd4-1;
    }
  
    if (KeyA.isDown)
    {
        player.setVelocityX(-200);
    }
    else if(KeyD.isDown)
    {
        player.setVelocityX(200);
    }
    else
    {
        player.setVelocityX(0);
    }

    if (KeyW.isDown)
    {
        player.setVelocityY(-200);
    }
    else if (KeyS.isDown)
    {
        player.setVelocityY(200);
    }
    else
    {
        player.setVelocityY(0);
    }


    if (ATTACK.isDown)
    {
        player.play('attack');
    }

    if (ATTACK.isDown && finalconversacion==false)
    {
        final=final-1;
        if (ATTACK.isDown && final<=0 )
        {
            destruir();
            final=10;
        }
    } 

    
    if (DISPARAR.isDown)
    {
        player.play('toma');
    }

	/*if (DISPARAR.isDown & cd4==0)
	{
    

     if (KeyA.isDown )
    {
       toma=this.physics.add.sprite(player.x,player.y,'toma').setScale(0.05)
       toma.angle=230;
       toma.setVelocityX(-400);
       cd4=150;
    }
    else if(KeyD.isDown)
    {
      toma=this.physics.add.sprite(player.x,player.y,'toma').setScale(0.05)
      toma.angle=50;
        toma.setVelocityX(400);
        cd4=150;
    }
  
   else if (KeyW.isDown)
    {
      toma=this.physics.add.sprite(player.x,player.y,'toma').setScale(0.05)
        toma.setVelocityY(-400);
        cd4=150;
    }
    else if (KeyS.isDown)
    {
      toma=this.physics.add.sprite(player.x,player.y,'toma').setScale(0.05)
        toma.setVelocityY(400);
        cd4=150;
    }/*

  }

    

    /*movercerdo();
    girar();
    movercerdo2();
    girar2();*/
}

function hablar()
{
    if(KeyE.isDown && cd==0 && mensaje==0 && inicio==0)
    {
        texto = this.physics.add.sprite(ayudante.x+50, ayudante.y-100, 'texto');
        texto.setScale(0.3);
        cd=100;
        mensaje=1;
        inicio=1;
    }
}

function pasar()    
{
    if(ATTACK.isDown && mensaje==1)
    {
        texto.destroy();
        scoreText.destroy();
        texto2 = this.physics.add.sprite(ayudante.x+50, ayudante.y-100, 'texto2');
        texto2.setScale(0.3);
        cd2=200;
        mensaje=0;
        finalconversacion=false;
    }   
}

function interaccion()
{
    if(scorecd<=0)
    {
        scoreText = this.add.text(ayudante.x-220, ayudante.y + 50, 'Pulsa E para hablar y SPACE para continuar', { fontSize: '20px', fill: 'white' });
        scorecd=100;
        cd3=0;
    }
}

function destruir()
{
    scoreText.destroy();
    texto2.destroy();
    inicio=0;
    cd3=1;
    finalconversacion=true;
} 


function recolectar(objeto1, objeto2)
{
    objeto2.destroy();
    var aleatorio = Phaser.Math.Between(1, 10);
    dinero=dinero+aleatorio;
    scoreText = scoreText.setText(+ dinero);
    comida=comida+1;
    scoreText1 = scoreText1.setText(+ comida);
}


function recolectar2(objeto1, objeto2)
{
    objeto2.destroy();
    var aleatorio = Phaser.Math.Between(1, 10);
    dinero=dinero+aleatorio;
    scoreText = scoreText.setText(+ dinero);
    comida=comida+1;
    scoreText1 = scoreText1.setText(+ comida);
}




function ataque1(objeto1, objeto2)
{
    if(ATTACK.isDown)
    {
        objeto2.destroy();
        var moneda2 = monedaList.create(cerdo1.x,boss.y,'moneda').setScale(0.1);
    }
}



function ataque2(objeto1, objeto2)
{
    if(ATTACK.isDown)
    {
        objeto2.destroy();
        var moneda2 = monedaList.create(cerdo2.x,cerdo2.y,'moneda').setScale(0.1);
    }
}



function ataque3(objeto1, objeto2)
{
    if(ATTACK.isDown)
    {
        objeto2.destroy();
        var moneda2 = monedaList.create(boss.x,boss.y,'moneda').setScale(0.1);
    }
}



/*function movercerdo()
{  
    if(direccion1==1)
    {
        cerdo1.y=cerdo1.y-1;

        if(cerdo1.y==100)
        {
            direccion1=0;
        }
    }
}

function girar()
{
    if(direccion1==0)
    {
        cerdo1.y=cerdo1.y+1;

        if(cerdo1.y==450)
        { 
            
            direccion1=1;
        }
    }
}

function movercerdo2()
{  
    if(direccion2==1)
    {
        cerdo2.y=cerdo2.y-1;

        if(cerdo2.y==100)
        {
            direccion2=0;
        }
    }
}

function girar2()
{
    if(direccion2==0)
    {
        cerdo2.y=cerdo2.y+1;

        if(cerdo2.y==450)
        { 
            
            direccion2=1;
        }
    }
}*/



