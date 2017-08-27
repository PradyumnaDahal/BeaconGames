   
    //-----------------------------Var---------------

var c = document.getElementById("Game");
var ctx = c.getContext("2d");
var xPos = Game.width/2;
var yPos = 10;
var pWidth = 50;
var pHeight = 50;
var lock = 0;               
                
var keys =[];
                
var colUp;
var colDown;
var colLeft;
var colRight;

 
var startBox = Game.width;      
                
var enemy = [];
var enemyY = 0;
var enemyCount = [];
var enemyCol;             

 var endlessX = [];
  var endlessY = [];
var clickM;  
                
var endHeight = [];
var level = 98;

var death = 0;
var restart = false;                
 var highString = 0          
var imageA = [];                
var rKey                
var status
var menuV;
var times = 0;
 var high = 0;               
var mouseX
var mouseY
var mouseClick = false;               
// w 87 s 83 d 68 a 65                

         
                
// ---------------------- Var End
                //------------------------Function

             function startGame() {
interval();
menuV = true;
onerun()
};
                
    function interval() {
    
    
     setInterval(function(){ update(); }, 20);
};
                
  function player() { if(level < 90) { ctx.fillStyle = "green";
        ctx.drawImage(imageA[2], xPos, yPos, pWidth, pHeight)            
      
                     
     if (keys[32]){startBox=0;}; // Space bar remove start box
     if (keys[82]){restart = true}; // S
     if (keys[65] || keys[37]) {xPos -= 10}; // A
     if (keys[68] || keys[39]) {xPos += 10}; // D    
    
     if (yPos > Game.height/2 - 20) { yPos = Game.height/2 - 20}
     if (colDown == false || restart == true || (xPos == 0 && yPos > 80 && enemyY + yPos > 80)) {yPos += .405}
     if (xPos < 1 && colDown == false) {yPos += .605; enemyY += 5}
     if (level == 0 && colDown == false){yPos += 2}              
               
if (colDown == false || restart == true ||  (xPos == 0 && enemyY > 80)) {enemyY += 8}    


                                     }};
   
                
function wall () {if (xPos < 0){xPos = 0}; if (xPos > Game.width - pWidth){xPos = Game.width - pWidth};  }
                
                
 function box(x, y, width, height, color, levelN) {
     
     ctx.fillStyle = color;
     ctx.fillRect(x, y - yPos, width, height)
     
     

     if (xPos + 10 + pWidth > x && xPos - 10 < x + width && yPos - 10 < y + height && yPos + pHeight + 20 + 10 > y ) {colDown = true} // going up
     else {colDown = false}
     
     //------Col End
     
 }
                
function ebox(x, y, width, height, color, levelN, imageName) { 
  if (endHeight[level] - y > 8100 && endHeight[levelN] - y < 8600 ) {var asdsafds = 0} else {
    if ((endHeight[levelN] - y < 5700) || levelN == 37) {
    if (levelN == level ) { ctx.fillStyle = color;
     
    if (imageName != undefined){ctx.drawImage(imageA[imageName], x, y - enemyY, width, height) }
    if (imageName == undefined){ctx.fillRect(x, y - enemyY  + 50, width, height)}

     if (xPos + 5 + pWidth > x && xPos - 5  < x + width && enemyY + yPos < y  && enemyY + yPos + pHeight  > y ) {restart = true} }
   }
    else { if (levelN == level ) { ctx.fillStyle = color;
     
    if (imageName != undefined){ctx.drawImage(imageA[20], x, y - enemyY, width, height) }
    if (imageName == undefined){ctx.fillRect(x, y - enemyY  + 50, width, height)}

     if (xPos + 5 + pWidth > x && xPos - 5  < x + width && enemyY + yPos < y  && enemyY + yPos + pHeight  > y ) {restart = true} }
} } }
                
function reset() {if (restart == true) {yPos = 10; startBox = Game.width;  restart = false; rKey = false,enemyY = 0; death += 1; xPos = Game.width/2}}
               
function text(textS, xText, yText, color, font, levelNumber) {
ctx.fillStyle = color;
ctx.font=font;
if ((level == levelNumber )||( levelNumber == 99)) {ctx.fillText (textS, xText, yText)  }    }
                
    
function levelS() {
    
    if (enemyY > endHeight[level]) {level += 1; restart = true; death -= 1}  }
    
    
function endBox(x, y, width, height, color, levelN, imgR) {  
   if (levelN = level) { ctx.fillStyle = color;
     ctx.drawImage(imageA[imgR], x, y - enemyY + yPos, width, height) 

     if (xPos + 5 + pWidth > x && xPos - 5  < x + width && enemyY  < y  && enemyY +  pHeight  > y ) { } }
    }   

                
                
function men(x, y, width, height, imageName) {      
    ctx.drawImage(imageA[imageName], x, y, width, height) 


}
  
function levelButton(x, y, width, height, levelN, levelSelect, pad) {

if (mouseX>x && mouseX<x+width && mouseY>y && mouseY<y+height) {
if (levelSelect - 1 <= lock) {ctx.fillStyle = "#00ce97";} else {ctx.fillStyle = "#ff6666";ctx.strokeStyle = "#ff6666";}
ctx.fillRect(x,y,width,height);
ctx.fillStyle = "white";
ctx.font = "30px Arial";
ctx.fillText(levelN, x + (width/2)-pad, y + (height/2)+10); 

} else {
ctx.strokeStyle = "#00ce97";
ctx.fillStyle = "#00ce97";
ctx.font = "30px Arial";
ctx.fillText(levelN, x + (width/2)-pad, y + (height/2)+10);
ctx.rect(x, y, width, height);
ctx.stroke();
};
if ((mouseX>x && mouseX<x+width && mouseY>y && mouseY<y+height) && mouseClick == true ) { if (levelSelect - 1 <= lock) {
level = levelSelect - 1;  mouseClick = false;
};
}; 
};
function imgButton(x, y, width, height, levelN, levelSelect, imgA, imgB, name) {
if (mouseX>x && mouseX<x+width && mouseY>y && mouseY<y+height) {
 ctx.drawImage(imageA[imgB], x, y, width, height)
} else {
 ctx.drawImage(imageA[imgA], x, y, width, height)
};
if ((mouseX>x && mouseX<x+width && mouseY>y && mouseY<y+height) && mouseClick == true) {
level = levelSelect - 1;  mouseClick = false; clickM =name
};
}; 
   function ran(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}             
 function menuF(){  
    
     if (menuV == false) {
     
imgButton(640, 1, 150, 60, 96, 98, 17, 18, "ls")
 if (clickM =="ls") {menuV = true; clickM = ""}
     
     }
     
if (menuV === true){ restart = true
    level = 98
    
    men(Game.width/2 - 160, 5, 330, 90, 13);
    
imgButton(295, 120, 200, 80, 96, 1, 12, 14, "play")

if (clickM =="play") {menuV = false; clickM = ""}
        

 
 imgButton(295, 220, 200, 80, 96, 98, 15, 16, "menu")
 if (clickM =="menu") {menuV = false; clickM = ""}
    }
 
 }               
 function lockF() {
     
     if (endHeight[level] < enemyY) { lock = level}
      if (level - 1 > lock && level < 90) {level = 98}
     
 }            
     
function highscore() {
    
    if ((high < enemyY) && level == 37){ high = enemyY;}
 highString = high.toString()                     
if (level < 90) {text('High Score: ' + high, Game.width - (180 + (highString.length * 17)), Game.height - 20, "#00ce97", "30px Arial", 37)}
    
}
function backgroundF() {
    
    if (80 > level > 0) {
        
   ctx.drawImage(imageA[19], 0, endHeight[level] - enemyY - 10000 + 387 + yPos, 800, 10000)     
        
        
    } }
    

function levels(){
level3()
level4()                        
level5()
level6()
level7()
level8()
endless()
}
    
    







 //----------------------------------------------Function End ----------               
                
                
//windolisteners                
                
                window.addEventListener("keydown", function(event) {
                    keys[event.keyCode] = true;
                    
                }  ) 
                
                window.addEventListener("keyup", function(event) {
                    keys[event.keyCode] = false;
                    
                })
                
                
                
                ctx.canvas.addEventListener('mousemove', function(event){
        var rect = Game.getBoundingClientRect();
        mouseX = Math.round((event.clientX - rect.left) / (rect.right - rect.left) * Game.width);
        mouseY = Math.round((event.clientY - rect.top) / (rect.bottom - rect.top) * Game.height);
        status = mouseX + " , " + mouseY;
    });
    ctx.canvas.addEventListener('click', function(event){
        mouseClick = true
    });

                 //windo listeners end
            
                //----------Update--------------------
     
             function update() { ctx.clearRect(0,0, Game.width, Game.height);
           
		   
    if (level >= 50 && level < 80) {menuV = true}
                
                                
        
		
  // level                                  
endHeight[-1]=0;
endHeight[0]= 300;   
endHeight[1]= 1000;                    
endHeight[2]= 2000;                    
endHeight[3]= 2500;                    
endHeight[4]= 2700;                    
endHeight[5]= 4000;                   
endHeight[6]= 4000;  
endHeight[7]= 8500;  
endHeight[38]= 9999;  
endHeight[98]= 99999999999;
imageA[0]=document.getElementById("triangle");
imageA[1]=document.getElementById("earth");
imageA[2]=document.getElementById("player");
imageA[3]=document.getElementById("ground");
imageA[4]=document.getElementById("ground2");
imageA[5]=document.getElementById("cloud");
imageA[6]=document.getElementById("1");
imageA[7]=document.getElementById("1");
imageA[8]=document.getElementById("1");
imageA[9]=document.getElementById("1");
imageA[10]=document.getElementById("1");
imageA[11]=document.getElementById("1");
imageA[12]=document.getElementById("play");
imageA[13]=document.getElementById("dropper");
imageA[14]=document.getElementById("play2");
imageA[15]=document.getElementById("sl");
imageA[16]=document.getElementById("sl2");
imageA[17]=document.getElementById("menu");
imageA[18]=document.getElementById("menu2");
imageA[19]=document.getElementById("background");
imageA[20]=document.getElementById("star");
imageA[21]=document.getElementById("1");
if (level == 97) {  
levelButton(100,150,100,50,1,1,10);
levelButton(225,150,100,50,2,2,10);
levelButton(350,150,100,50,3,3,10);
levelButton(475,150,100,50,4,4,10);
levelButton(600,150,100,50,5,5,10);
levelButton(100,225,100,50,6,6,10);
levelButton(225,225,100,50,7,7,10);
levelButton(350,225,100,50,8,8,10);
levelButton(300,400,200,50,"Endless",38,50);

                               }
// level end                    

enemyCount[0]= 1;                                
enemyCount[1]= 2;
enemyCount[2]= 8;
enemyCount[3]= 1;
enemyCount[4]= 1;
enemyCount[5]= 1;
enemyCount[6]= 1;
enemyCount[7]= 1;
enemyCount[8]= 1;
enemyCount[9]= 1;
enemyCount[10]= 1;
enemyCount[11]= 1;
enemyCount[12]= 1;
                                
                                
                    
if (restart == true) {yPos = 10; startBox = Game.width};                    
    backgroundF()     
    lockF();
    levelS()   
    wall();  
    reset();    
    menuF()    
                  
//-----------neeeded each level
                    
endBox(0, endHeight[level], 0, 0, "green", 99, 4)
if(level < 90) {box(0, 70, startBox, 10, "black", 99)} ;// start box                    


ebox(600, 300, 64, 64, "blue", 1, 5); 
ebox(Game.width/2, 300, 128, 128, "blue", 1, 5);                               
                                
levels()
highscore()
 
  
  
 


//--------------------------------------------
  lock = 70                   
//------------------------end                                   
          
     var abc;
abc = lock 
abc += " , "
abc += level 
abc += " , "
abc += enemyY
abc += " , "
abc += endHeight[level]                           

       player();
text('Press  "A or ←" to move left and "D or →" to move right.', 160, Game.height -30, "black", "20px Arial", 0)
text('Press "Space bar to start', Game.width/2 - 100, Game.height -10, "black", "20px Arial", 0)
if (level < 90) {text('Level: ' + (level + 1), 10, 40, "#00ce97", "30px Arial", 99)}
// text(abc, Game.width/2 - 130, Game.height -50, "black", "20px Arial", 99)
text('Avoid clouds and get to the ground', Game.width/2 - 170, Game.height -10, "black", "20px Arial", 1)

if (level < 90) {text('Score: ' +enemyY, 10, Game.height - 20, "#00ce97", "30px Arial", 99)}


                               
// text('', 20, Game.height -30, "black", "20px Arial", 0)
              
 mouseClick = false
                              							  } //----------Update End ----------------- 



	function onerun(){						   
           
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;}
 
for (i = 0; i < 9999999; i++) {
 endlessX[i] =  getRndInteger(0, 700);                                   
 endlessY[i] = getRndInteger(80, 1200);
}}
