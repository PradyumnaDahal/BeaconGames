var express = require ('express');
var app = express();
var serv = require('http').Server (app);

app.get ('/',function(reg,res) {
	console.log('index.html');
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 2005);

var SOCKET_LIST = []; // List of connections to all players
var respawnList = []; // List of npcs that need to respawn 

var GAMEWIDTH = 1400;
var GAMEHEIGHT = 1500;

var playerWidth = 50;
var playerHeight = 50;
var gameLost = false;

var collisionTimer = 0;

function millis() { 
   var d = new Date();
   return d.getTime();         
}
function npcCollision(x,y) {        
   var collision;
   for (var i=0; i<npcs.length; i++) {
      if (!npcs[i].dead) { 
         if ((x > npcs[i].x) && (x < (npcs[i].x + npcs[i].width)) && 
             (y > npcs[i].y) && (y < (npcs[i].y + npcs[i].height))) { 
            collision = npcs[i];
            break;
         }                
      }
   }    
   return collision;            
}
function playerCollision(x,y) {
   var collision;
   for (var i=0; i<SOCKET_LIST.length; i++) {
      if (!SOCKET_LIST[i].dead) { 
         if ((x > SOCKET_LIST[i].x) && (x < (SOCKET_LIST[i].x + 100)) && 
             (y > SOCKET_LIST[i].y) && (y < (SOCKET_LIST[i].y + 100))) { 
            collision = SOCKET_LIST[i];
            break;
         }                
      }
   }    
   return collision;            
}
function randomLocation () {
   var x = Math.random () * (GAMEWIDTH - 100);
   var y = Math.random () * (GAMEHEIGHT - 100);
   location = {};
   location.x = Math.floor(x);
   location.y = Math.floor(y);
   return location;
} 
function randomSpawn() {
   var location;
   while (true) { 
      location = randomLocation ();
      if (npcCollision(location.x,location.y)==undefined) { 
         if (playerCollision (location.x,location.y) == undefined) {
            break;
         }  
      } 
   }
   return location;
}

var io = require ('socket.io') (serv,{});

io.sockets.on('connection',function(socket){
   console.log ('connect');
   // location                = randomSpawn();   
   socket.x                = 600;
   socket.y                = 10;
   socket.id               = SOCKET_LIST.length;
   socket.speed            = 25;
   socket.dead     = false;
   SOCKET_LIST.push (socket);
   console.log('connection request added for socket: ' + socket.id + 
               ' spawning to: [' + socket.x + ',' + socket.y + ']');
   socket.emit('socketId',socket.id);	   
   
   socket.on('keyPress', function (data) {
      console.log ( 'Got a keypress: ' + data.key );

      if (data.key == 'A') { // left 
         var speed = SOCKET_LIST[socket.id].speed;
         if ((SOCKET_LIST[socket.id].x - speed) > 0) { 
            SOCKET_LIST[socket.id].x = SOCKET_LIST[socket.id].x - speed;
         }   
      }   
      if (data.key == 'D') { // right
         var speed = SOCKET_LIST[socket.id].speed;
         if ((SOCKET_LIST[socket.id].x + speed + playerWidth) < GAMEWIDTH) { 
            SOCKET_LIST[socket.id].x = SOCKET_LIST[socket.id].x + speed;			
         }   
      }   
      if (data.key == 'W') { // up (should be limited) 
         var speed = SOCKET_LIST[socket.id].speed;
         if ((SOCKET_LIST[socket.id].y - speed) > 0) { 
            SOCKET_LIST[socket.id].y = SOCKET_LIST[socket.id].y - speed;	
         }   
      }   
      if (data.key == 'S') { // down
         var speed = SOCKET_LIST[socket.id].speed;
         if ((SOCKET_LIST[socket.id].y + speed + playerHeight) < GAMEHEIGHT) { 
            SOCKET_LIST[socket.id].y = SOCKET_LIST[socket.id].y + speed;
         }   
      } 
   });
   
   socket.on('disconnect', function () {
      SOCKET_LIST[socket.id].dead = true;
   });
   
   socket.on('collision', function () {
      SOCKET_LIST[socket.id].dead = true;
      console.log ( 'Got a collision, socket [' + socket.id + '] has died' );
      var x = SOCKET_LIST[socket.id].x-100;
      var y = SOCKET_LIST[socket.id].y-100;
      explosions.push (createNPC (x,y,200,200,0,'explosion',25));      
   });
   
   socket.on('balloon', function () {
      console.log ( 'Player ' + socket.id + ' just got an upgrade' );
      npcs[1].dead = true; // disappear the balloon
      setTimeout (function() {npcs[1].dead=false;}, 4000); 
   });
   
   
   socket.on('fire', function(data) {
      console.log ( 'fire: ' + (data.angle * 180 / Math.PI) + ' ' + data.gunValue);
      bulletsPush (createBullet (data.x, data.y, data.angle, socket.id, data.gunValue ));
   });
   
   socket.on('explosion', function(data) {
      console.log ( 'destroy explosion: ' + data.id );
      explosions[data.id].dead = true;
   });
   
   socket.on ('hue', function(data) {
      console.log ( 'Got a player color index: ' + data.imageIndex );
      SOCKET_LIST[socket.id].imageIndex = data.imageIndex;
   });
   
   socket.on('chat', function(data) {
      console.log ( 'Got a message: ' + data.message );
      SOCKET_LIST[socket.id].chatVisibility = 'visible';
      SOCKET_LIST[socket.id].chatMessage = data.message;
      setTimeout ( function () {SOCKET_LIST[socket.id].chatVisibility='hidden';}, 10000 );
   });
   socket.emit('Board Size', {width:GAMEWIDTH, height:GAMEHEIGHT});
});

function bulletsPush (bullet) {
   var found = false;
   // Look for a dead bullet that can be reused.
   for (var i=0; i<bullets.length; i++) {
      if (bullets[i].dead) { 
         found = true;
         console.log ( 'Reusing bullet: ' + i );
         bullets[i] = bullet;
         break;
      }
   }
   if (!found) { 
      bullets.push (bullet);
   }
}

// Create a bullet
function createBullet (x,y,moveAngle,owner,gun) {
   bullet = new Object();
   bullet.dead = false;
   bullet.filename = 'bullet.png';
   bullet.width = 3;
   bullet.height = 4;
   bullet.speed = 10;
   console.log ( 'createBullet, gun: ' + gun + ' moveAngle: ' + moveAngle );
   if (gun == "Sniper") {
      bullet.speed = 50;
   }      
   bullet.moveAngle = moveAngle;
   bullet.dx = bullet.speed * Math.cos(bullet.moveAngle);
   bullet.dy = bullet.speed * Math.sin(bullet.moveAngle);
   bullet.x = x;
   bullet.y = y;
   bullet.owner = owner;
   bullet.numImages = 1;
   return bullet;
}
var bullets = [];

// Create a non-player character
function createNPC (x,y,width,height,speed,filename,numImages) {
   npc = new Object();
   npc.coolOffTimer = 0;
   npc.health = 100;
   npc.x = x;
   npc.y = y;
   npc.dead = false;
   npc.filename = filename;
   npc.width = width;
   npc.height = height;
   npc.direction = 1;
   npc.speed = speed;
   npc.numImages = numImages;
   npc.target = -1; // No target
   return npc;
}
function createStar (width,height,speed,filename,numImages) {
   npc = new Object();
   location = randomSpawn();
   npc.coolOffTimer = 0;
   npc.health = 100;
   npc.x = location.x;
   npc.y = location.y;
   npc.dead = false;
   npc.filename = filename;
   npc.width = width;
   npc.height = height;
   npc.direction = 1;
   npc.speed = speed;
   npc.numImages = numImages;
   npc.target = -1; // No target
   return npc;
}
var npcs = [];
var explosions = [];

// Main server loop 
function mainLoop () { 
   var bulletList = []; 
   var owner;
   var pack = []; // create an empty list  
   var chaseTarget; // Variable used to point to player npc is chasing
   var stepValue; 
   // All dynamic objects should be added at the end
   // Pack the bullets
   for (var i=0; i<bullets.length; i++) {
      owner = bullets[i].owner;
      if (!bullets[i].dead) { // bullet has struck a player or hit the board boundary
         if (SOCKET_LIST[owner].dead) { // Owner has died
            bullets[i].dead = true; // Kill the bullet as well
         } else if ((bullets[i].x > GAMEWIDTH) || (bullets[i].x <= 0) || (bullets[i].y >= GAMEHEIGHT ) || (bullets[i].y <= 0)) {
            bullets[i].dead = true; // bullet has reached edge of board
         } else { 
            bullets[i].x = bullets[i].x + bullets[i].dx;
            bullets[i].y = bullets[i].y + bullets[i].dy;
         }          
      }   
      // All information (including dead) must be sent to client 
      bulletList.push (bullets[i]);              
   }    
     
   // Pack Non-player characters
   for (var i =0; i<npcs.length; i++) {
      if (
          ((npcs[i].x + npcs[i].width + npcs[i].direction) >= GAMEWIDTH) ||
          ((npcs[i].x + npcs[i].direction) <= 0)
         ) {
        npcs[i].direction = -1 * npcs[i].direction;
      }  
      chaseTarget = -1;      
      if ((npcs[i].target != -1) && !npcs[i].dead) {
         chaseTarget = npcs[i].target;
         if (SOCKET_LIST[chaseTarget].dead) { // This player has died
            chaseTarget = -1; // ignore the dead player
         }           
      }        
      // Check if npcs is not following anyone
      if ((chaseTarget == -1) || (millis() > npcs[i].coolOffTimer)) {  
        npcs[i].x = npcs[i].x + npcs[i].direction*npcs[i].speed; 
      } else { // npc is following someone
        // Determine the x change
        stepValue = 1;
        if (SOCKET_LIST[chaseTarget].x < npcs[i].x) { // decrement x
           stepValue = -1;
        } 
        npcs[i].x = npcs[i].x + (stepValue * 7);
        npcs[i].direction = stepValue;
        // Determine the y change
        stepValue = 1;
        if (SOCKET_LIST[chaseTarget].y < npcs[i].y) { // decrement y
           stepValue = -1;
        } 
        npcs[i].y = npcs[i].y + (stepValue * 7);
      }      
   }
   
   for(var i in SOCKET_LIST) {        
      var socket = SOCKET_LIST[i];

      // parachute is falling
      //if ((socket.y + playerHeight ) < GAMEHEIGHT) {
      //   socket.y  = socket.y + 1;
      //}   
      pack.push({
           filename         : 'player.png', 
           x                : socket.x,
           y                : socket.y,
           id               : socket.id,
           width            : 50,
           height           : 50, 
           dead             : socket.dead, // Tell the client a player is disconnect so it will disappear
           speed            : socket.speed           
      });
      //SOCKET_LIST[i].firing = false;   
   }
    
   // Send all positions to all players
   for (var i in SOCKET_LIST){
      var socket = SOCKET_LIST[i];
        socket.emit('positions',pack);
      //socket.emit('bullets',bulletList);
      //socket.emit('explosions', explosions);
      //socket.emit('npcs',npcs);
      //if (!gameLost) { // Game has not been lost yet 
        // if (npcs[0].dead) { // Boss Monster has been killed 
       //     socket.emit ('Game Over', [] );
   //      }
     // }
   }
  // if (npcs[0].dead) {
  //    gameLost = true;
//}
         
   // Check for bullet collisions with Npcs (twice a second)
   if (millis() > (collisionTimer = 500)) { // 0.5 seconds have elapsed
     // Check each bullet for a collision with an npc
     for (var i=0; i<bullets.length; i++) {
        owner = bullets[i].owner;
        if (!bullets[i].dead) { // bullet has not struck a player or hit the board boundary
           // Check each npc
           for (var j =0; j<npcs.length; j++) {  
              if (!npcs[j].dead &&
                  (bullets[i].x >= npcs[j].x) && (bullets[i].x <= (npcs[j].x + npcs[j].width)) && 
                  (bullets[i].y >= npcs[j].y) && (bullets[i].y <= (npcs[j].y + npcs[j].height))) {
                  console.log ( "Bullet struck an npc" );
                  bullets[i].dead = true; // No longer show the bullet
                  if (j != 1) { // Upgrade balloon does not chase player
                     npcs[j].target = bullets[i].owner; // set the npc to track the player
                     // non-player character stops chasing player after 10 seconds 
                     npcs[j].coolOffTimer = millis() + 10000;
                  }   
                  // Reduce the health of the npc
                  if (npcs[j].health > 0) { 
                     if (j == 0) { // Boss Monster
       //                 npcs[0].health = npcs[j].health - 1; // It takes longer to kill boss monster
                     } else { // Other npcs
                        npcs[j].health = npcs[j].health - 20; // 5 shots to kill it 
                     }
                     if (npcs[j].health == 0) { // npc has died
                        // create an explosion 
                        explosions.push (createNPC (npcs[j].x-100,npcs[j].y-100,400,400,0,'explosion',25));   
                        npcs[j].dead = true; // No longer display npc
                        npcs[j].target = -1; // Don't chase anymore
                        npcs[j].health = 100; 
                        respawnList.push (j); // Save j for later
                        setTimeout (function () {
                          npcs[respawnList.shift()].dead = false;
                        },20000);                           
                     }
                  }                  
              }
           }                        
        }   
     }   
     collisionTimer = millis();
   }
}
setInterval (mainLoop, 1000/20); // 20 times a second
		
// Create the list of non-player characters

console.log ( 'Parachute Drop Ready' );
	