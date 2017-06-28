   
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


var clickM;  
                
var endHeight = [];
var level = 98;

var death = 0;
var restart = false;                

var imageA = [];                
var rKey                
var status
var menuV;

                
var mouseX
var mouseY
var mouseClick = false;               
// w 87 s 83 d 68 a 65                

         
                
// ---------------------- Var End
                //------------------------Function

             function startGame() {
interval();
menuV = true;
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
   if (levelN == level ) { ctx.fillStyle = color;
     
    if (imageName != undefined){ctx.drawImage(imageA[imageName], x, y - enemyY, width, height) }
    if (imageName == undefined){ctx.fillRect(x, y - enemyY  + 50, width, height)}

     if (xPos + 5 + pWidth > x && xPos - 5  < x + width && enemyY + yPos < y  && enemyY + yPos + pHeight  > y ) {restart = true} }
    
    }
                
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
ctx.fillText(levelSelect, x + (width/2)-pad, y + (height/2)+10); 

} else {
ctx.strokeStyle = "#00ce97";
ctx.fillStyle = "#00ce97";
ctx.font = "30px Arial";
ctx.fillText(levelSelect, x + (width/2)-pad, y + (height/2)+10);
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
     
     if (endHeight[level] < enemyY) { lock = level   
   
     }
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
        mouseX = event.clientX - ctx.canvas.offsetLeft;
        mouseY = event.clientY - ctx.canvas.offsetTop;
        status = mouseX + " , " + mouseY;
    });
    ctx.canvas.addEventListener('click', function(event){
        mouseClick = true
    });

                 //windo listeners end
            
                //----------Update--------------------
     
             function update() { ctx.clearRect(0,0, Game.width, Game.height);
           
    if (level >= 5 && level < 80) {menuV = true}
                
                                    
                                
  // level                                  
endHeight[-1]=0;
endHeight[0]= 300;   
endHeight[1]= 1000;                    
endHeight[2]= 2000;                    
endHeight[3]= 2500;                    
endHeight[4]= 2700;                    
endHeight[5]= 500;                   
endHeight[6]= 500;  
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
imageA[19]=document.getElementById("1");
imageA[10]=document.getElementById("1");
imageA[21]=document.getElementById("1");
if (level == 97) {  
levelButton(100,150,100,50,1,1,10);
levelButton(225,150,100,50,2,2,10);
levelButton(350,150,100,50,3,3,10);
levelButton(475,150,100,50,4,4,10);
levelButton(600,150,100,50,5,5,10);
// levelButton(100,225,100,50,6,6,10);
// levelButton(225,225,100,50,7,7,10);
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
                
    lockF();
    levelS()   
    wall();  
    reset();    
    menuF()    
                  
//-----------neeeded each level
                    
endBox(0, endHeight[level]+120, Game.width, Game.height, "green", 99, 4)
endBox(0, endHeight[level]-30, 900.6, 151.1, "green", 99, 3) //end box
if(level < 90) {box(0, 70, startBox, 10, "black", 99)} ;// start box                    


ebox(600, 300, 64, 64, "blue", 1, 5); 
ebox(Game.width/2, 300, 128, 128, "blue", 1, 5);                               
                                
        // 3333333333333333333333333333 (2)
 if (level == 2) {                               
ebox(600, 300, 64, 64, "blue", 2, 5);                     
ebox(615, 320, 64, 64, "blue", 2, 5);       
ebox(580, 350, 64, 64, "blue", 2, 5);
ebox(120, 310, 64, 64, "blue", 2, 5);   
ebox(610, 396, 64, 64, "blue", 2, 5);
ebox(120, 358, 64, 64, "blue", 2, 5);
ebox(180, 372, 64, 64, "blue", 2, 5);                                
ebox(700, 391, 64, 64, "blue", 2, 5);                                
ebox(430, 1310, 64, 64, "blue", 2, 5);                       
ebox(421, 531, 64, 64, "blue", 2, 5);                     
ebox(21, 123, 64, 64, "blue", 2, 5);       
ebox(142, 654, 64, 64, "blue", 2, 5);
ebox(183, 435, 64, 64, "blue", 2, 5);   
ebox(353, 543, 64, 64, "blue", 2, 5);
ebox(376, 456, 64, 64, "blue", 2, 5);
ebox(687, 352, 64, 64, "blue", 2, 5);                                
ebox(243, 456, 64, 64, "blue", 2, 5);                                
ebox(465, 134, 64, 64, "blue", 2, 5);                       
ebox(615, 657, 64, 64, "blue", 2, 5);       
ebox(580, 769, 64, 64, "blue", 2, 5);
ebox(120, 809, 64, 64, "blue", 2, 5);   
ebox(610, 1870, 64, 64, "blue", 2, 5);
ebox(120, 768, 64, 64, "blue", 2, 5);
ebox(180, 789, 64, 64, "blue", 2, 5);                                
ebox(700, 1857, 64, 64, "blue", 2, 5);                                                 
ebox(21, 984, 64, 64, "blue", 2, 5);                     
ebox(21, 865, 64, 64, "blue", 2, 5);       
ebox(142, 546, 64, 64, "blue", 2, 5);
ebox(183, 875, 64, 64, "blue", 2, 5);   
ebox(353, 486, 64, 64, "blue", 2, 5);
ebox(376, 975, 64, 64, "blue", 2, 5);
ebox(687, 754, 64, 64, "blue", 2, 5);                                
ebox(243, 464, 64, 64, "blue", 2, 5);                                
ebox(65, 456, 64, 64, "blue", 2, 5);     
ebox(120, 809, 64, 64, "blue", 2, 5);   
ebox(610, 870, 64, 64, "blue", 2, 5);
ebox(120, 768, 64, 64, "blue", 2, 5);
ebox(180, 1789, 64, 64, "blue", 2, 5);                                
ebox(700, 1857, 64, 64, "blue", 2, 5);                                
ebox(30, 1567, 64, 64, "blue", 2, 5);                       
ebox(421, 1984, 64, 64, "blue", 2, 5);                     
ebox(421, 1865, 64, 64, "blue", 2, 5);       
ebox(142, 1546, 64, 64, "blue", 2, 5);
ebox(183, 1875, 64, 64, "blue", 2, 5);   
ebox(353, 1486, 64, 64, "blue", 2, 5);
ebox(376, 1975, 64, 64, "blue", 2, 5);
ebox(687, 1754, 64, 64, "blue", 2, 5);                                
ebox(243, 1464, 64, 64, "blue", 2, 5);                                
ebox(465, 1456, 64, 64, "blue", 2, 5); 
ebox(421, 165, 64, 64, "blue", 2, 5);       
ebox(142, 416, 64, 64, "blue", 2, 5);
ebox(183, 875, 64, 64, "blue", 2, 5);   
ebox(153, 486, 64, 64, "blue", 2, 5);
ebox(176, 975, 64, 64, "blue", 2, 5);
ebox(187, 754, 64, 64, "blue", 2, 5);                                
ebox(143, 964, 64, 64, "blue", 2, 5);                                
ebox(165, 956, 64, 64, "blue", 2, 5);     
ebox(120, 1009, 64, 64, "blue", 2, 5);   
ebox(110, 1570, 64, 64, "blue", 2, 5);
ebox(220, 1168, 64, 64, "blue", 2, 5);
ebox(280, 1189, 64, 64, "blue", 2, 5);                                
ebox(200, 8757, 64, 64, "blue", 2, 5);                                
ebox(230, 1167, 64, 64, "blue", 2, 5);                       
ebox(221, 7984, 64, 64, "blue", 2, 5);                     
ebox(221, 8865, 64, 64, "blue", 2, 5);       
ebox(142, 1546, 64, 64, "blue", 2, 5);
ebox(183, 1875, 64, 64, "blue", 2, 5);   
ebox(353, 1486, 64, 64, "blue", 2, 5);
ebox(376, 1975, 64, 64, "blue", 2, 5);
ebox(687, 1754, 64, 64, "blue", 2, 5);                                
ebox(243, 1464, 64, 64, "blue", 2, 5);                                
ebox(465, 1456, 64, 64, "blue", 2, 5); 
 
 
 
 }
        //444444444444444444444444444 (3)

 if (level == 3) {                               
ebox(337, 884, 64, 64, "blue", 3, 5);
ebox(270, 518, 64, 64, "blue", 3, 5);
ebox(332, 1752, 64, 64, "blue", 3, 5);
ebox(156, 1993, 64, 64, "blue", 3, 5);
ebox(117, 1361, 64, 64, "blue", 3, 5);
ebox(459, 544, 64, 64, "blue", 3, 5);
ebox(489, 2054, 64, 64, "blue", 3, 5);
ebox(270, 1181, 64, 64, "blue", 3, 5);
ebox(441, 2107, 64, 64, "blue", 3, 5);
ebox(66, 1367, 64, 64, "blue", 3, 5);
ebox(16, 1112, 64, 64, "blue", 3, 5);
ebox(461, 324, 64, 64, "blue", 3, 5);
ebox(419, 843, 64, 64, "blue", 3, 5);
ebox(477, 771, 64, 64, "blue", 3, 5);
ebox(401, 1079, 64, 64, "blue", 3, 5);
ebox(467, 1422, 64, 64, "blue", 3, 5);
ebox(297, 1801, 64, 64, "blue", 3, 5);
ebox(589, 339, 64, 64, "blue", 3, 5);
ebox(709, 743, 64, 64, "blue", 3, 5);
ebox(51, 966, 64, 64, "blue", 3, 5);
ebox(264, 2098, 64, 64, "blue", 3, 5);
ebox(14, 1164, 64, 64, "blue", 3, 5);
ebox(499, 2204, 64, 64, "blue", 3, 5);
ebox(243, 1164, 64, 64, "blue", 3, 5);
ebox(80, 793, 64, 64, "blue", 3, 5);
ebox(730, 1828, 64, 64, "blue", 3, 5);
ebox(177, 1854, 64, 64, "blue", 3, 5);
ebox(719, 1160, 64, 64, "blue", 3, 5);
ebox(642, 1719, 64, 64, "blue", 3, 5);
ebox(681, 1053, 64, 64, "blue", 3, 5);
ebox(569, 1426, 64, 64, "blue", 3, 5);
ebox(686, 1877, 64, 64, "blue", 3, 5);
ebox(562, 899, 64, 64, "blue", 3, 5);
ebox(634, 1241, 64, 64, "blue", 3, 5);
ebox(604, 611, 64, 64, "blue", 3, 5);
ebox(685, 176, 64, 64, "blue", 3, 5);
ebox(315, 1146, 64, 64, "blue", 3, 5);
ebox(635, 1227, 64, 64, "blue", 3, 5);
ebox(179, 219, 64, 64, "blue", 3, 5);
ebox(432, 807, 64, 64, "blue", 3, 5);
ebox(258, 236, 64, 64, "blue", 3, 5);
ebox(733, 2185, 64, 64, "blue", 3, 5);
ebox(585, 629, 64, 64, "blue", 3, 5);
ebox(258, 442, 64, 64, "blue", 3, 5);
ebox(563, 883, 64, 64, "blue", 3, 5);
ebox(183, 1761, 64, 64, "blue", 3, 5);
ebox(488, 619, 64, 64, "blue", 3, 5);
ebox(634, 183, 64, 64, "blue", 3, 5);
ebox(280, 917, 64, 64, "blue", 3, 5);
ebox(2, 1028, 64, 64, "blue", 3, 5);
ebox(559, 369, 64, 64, "blue", 3, 5);
ebox(313, 713, 64, 64, "blue", 3, 5);
ebox(681, 877, 64, 64, "blue", 3, 5);
ebox(372, 617, 64, 64, "blue", 3, 5);
ebox(452, 612, 64, 64, "blue", 3, 5);
ebox(24, 975, 64, 64, "blue", 3, 5);
ebox(734, 1494, 64, 64, "blue", 3, 5);
ebox(659, 1059, 64, 64, "blue", 3, 5);
ebox(101, 751, 64, 64, "blue", 3, 5);
ebox(330, 307, 64, 64, "blue", 3, 5);
ebox(656, 2268, 64, 64, "blue", 3, 5);
ebox(625, 2100, 64, 64, "blue", 3, 5);
ebox(273, 1181, 64, 64, "blue", 3, 5);
ebox(455, 1816, 64, 64, "blue", 3, 5);
ebox(535, 1277, 64, 64, "blue", 3, 5);
ebox(79, 2197, 64, 64, "blue", 3, 5);
ebox(16, 2161, 64, 64, "blue", 3, 5);
ebox(06, 2326, 64, 64, "blue", 3, 5);
ebox(82, 2284, 64, 64, "blue", 3, 5);
 }                          
                            
//            5555555555555555555555555555 (4)
                                
 ebox(184, 252, 64, 64, "blue", 4, 5);
ebox(651, 549, 64, 64, "blue", 4, 5);
ebox(40, 2190, 64, 64, "blue", 4, 5);
ebox(640, 2306, 64, 64, "blue", 4, 5);
ebox(261, 692, 64, 64, "blue", 4, 5);
ebox(667, 683, 64, 64, "blue", 4, 5);
ebox(287, 1187, 64, 64, "blue", 4, 5);
ebox(297, 881, 64, 64, "blue", 4, 5);
ebox(281, 270, 64, 64, "blue", 4, 5);
ebox(734, 1974, 64, 64, "blue", 4, 5);
ebox(69, 2113, 64, 64, "blue", 4, 5);
ebox(240, 1280, 64, 64, "blue", 4, 5);
ebox(302, 707, 64, 64, "blue", 4, 5);
ebox(407, 1649, 64, 64, "blue", 4, 5);
ebox(404, 2127, 64, 64, "blue", 4, 5);
ebox(193, 866, 64, 64, "blue", 4, 5);
ebox(553, 293, 64, 64, "blue", 4, 5);
ebox(425, 214, 64, 64, "blue", 4, 5);
ebox(76, 280, 64, 64, "blue", 4, 5);
ebox(553, 1648, 64, 64, "blue", 4, 5);
ebox(168, 2510, 64, 64, "blue", 4, 5);
ebox(356, 2572, 64, 64, "blue", 4, 5);
ebox(439, 2301, 64, 64, "blue", 4, 5);
ebox(63, 2595, 64, 64, "blue", 4, 5);
ebox(350, 1902, 64, 64, "blue", 4, 5);
ebox(663, 988, 64, 64, "blue", 4, 5);
ebox(655, 2565, 64, 64, "blue", 4, 5);
ebox(156, 2129, 64, 64, "blue", 4, 5);
ebox(161, 320, 64, 64, "blue", 4, 5);
ebox(198, 767, 64, 64, "blue", 4, 5);
ebox(548, 2296, 64, 64, "blue", 4, 5);
ebox(613, 2397, 64, 64, "blue", 4, 5);
ebox(249, 1670, 64, 64, "blue", 4, 5);
ebox(69, 293, 64, 64, "blue", 4, 5);
ebox(703, 2527, 64, 64, "blue", 4, 5);
ebox(360, 1097, 64, 64, "blue", 4, 5);
ebox(598, 867, 64, 64, "blue", 4, 5);
ebox(643, 2606, 64, 64, "blue", 4, 5);
ebox(291, 241, 64, 64, "blue", 4, 5);
ebox(292, 1828, 64, 64, "blue", 4, 5);
ebox(40, 616, 64, 64, "blue", 4, 5);
ebox(627, 1600, 64, 64, "blue", 4, 5);
ebox(733, 2359, 64, 64, "blue", 4, 5);
ebox(40, 1052, 64, 64, "blue", 4, 5);
ebox(726, 1883, 64, 64, "blue", 4, 5);
ebox(156, 710, 64, 64, "blue", 4, 5);
ebox(11, 1955, 64, 64, "blue", 4, 5);
ebox(253, 1318, 64, 64, "blue", 4, 5);
ebox(23, 265, 64, 64, "blue", 4, 5);
ebox(180, 2224, 64, 64, "blue", 4, 5);
ebox(291, 978, 64, 64, "blue", 4, 5);
ebox(366, 1175, 64, 64, "blue", 4, 5);
ebox(412, 1605, 64, 64, "blue", 4, 5);
ebox(226, 2508, 64, 64, "blue", 4, 5);
ebox(730, 1574, 64, 64, "blue", 4, 5);                             
ebox(2, 24510, 64, 64, "blue", 4, 5);
ebox(5, 255, 64, 64, "blue", 4, 5);
                                
                                
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
text('5 LEVELS', Game.width/2 - 90, Game.height -10, "black", "40px Arial", 98)

// text('', 20, Game.height -30, "black", "20px Arial", 0)
              
 mouseClick = false
                               } //----------Update End -----------------                
           