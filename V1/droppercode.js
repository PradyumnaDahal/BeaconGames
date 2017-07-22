   
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

var imageA = [];                
var rKey                
var status
var menuV;
var times = 0;
                
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
     if ((keys[40] || keys[83]) && enemyY > 200) {enemyY += 10}; // D
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
     
     if (endHeight[level] < enemyY) { lock = level}
      if (level - 1 > lock && level < 90) {level = 98}
     
     
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
                
             lock                      
        
		
  // level                                  
endHeight[-1]=0;
endHeight[0]= 300;   
endHeight[1]= 1000;                    
endHeight[2]= 2000;                    
endHeight[3]= 2500;                    
endHeight[4]= 2700;                    
endHeight[5]= 4000;                   
endHeight[6]= 4000;  
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
imageA[19]=document.getElementById("1");
imageA[10]=document.getElementById("1");
imageA[21]=document.getElementById("1");
if (level == 97) {  
levelButton(100,150,100,50,1,1,10);
levelButton(225,150,100,50,2,2,10);
levelButton(350,150,100,50,3,3,10);
levelButton(475,150,100,50,4,4,10);
levelButton(600,150,100,50,5,5,10);
levelButton(100,225,100,50,6,6,10);
levelButton(600,225,100,50,7,7,10);
levelButton(225,300,100,50,38,38,10);

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
                                
ebox(427, 2493, 32, 32, "blue", 5, 5);
ebox(331, 2694, 32, 32, "blue", 5, 5);
ebox(170, 1287, 32, 32, "blue", 5, 5);
ebox(532, 2632, 32, 32, "blue", 5, 5);
ebox(218, 1184, 32, 32, "blue", 5, 5);
ebox(396, 892, 32, 32, "blue", 5, 5);
ebox(469, 1228, 32, 32, "blue", 5, 5);
ebox(499, 2626, 32, 32, "blue", 5, 5);
ebox(542, 3242, 32, 32, "blue", 5, 5);
ebox(313, 2685, 32, 32, "blue", 5, 5);
ebox(315, 3193, 32, 32, "blue", 5, 5);
ebox(545, 2795, 32, 32, "blue", 5, 5);
ebox(286, 3341, 32, 32, "blue", 5, 5);
ebox(221, 2190, 32, 32, "blue", 5, 5);
ebox(383, 2886, 32, 32, "blue", 5, 5);
ebox(211, 2298, 32, 32, "blue", 5, 5);
ebox(505, 3521, 32, 32, "blue", 5, 5);
ebox(112, 222, 32, 32, "blue", 5, 5);
ebox(446, 314, 32, 32, "blue", 5, 5);
ebox(143, 712, 32, 32, "blue", 5, 5);
ebox(339, 505, 32, 32, "blue", 5, 5);
ebox(315, 3896, 32, 32, "blue", 5, 5);
ebox(294, 1458, 32, 32, "blue", 5, 5);
ebox(32, 1595, 32, 32, "blue", 5, 5);
ebox(207, 2196, 32, 32, "blue", 5, 5);
ebox(480, 1967, 32, 32, "blue", 5, 5);
ebox(350, 1203, 32, 32, "blue", 5, 5);
ebox(384, 690, 32, 32, "blue", 5, 5);
ebox(36, 3876, 32, 32, "blue", 5, 5);
ebox(162, 2724, 32, 32, "blue", 5, 5);
ebox(6, 640, 32, 32, "blue", 5, 5);
ebox(516, 1449, 32, 32, "blue", 5, 5);
ebox(280, 2953, 32, 32, "blue", 5, 5);
ebox(367, 1257, 32, 32, "blue", 5, 5);
ebox(115, 420, 32, 32, "blue", 5, 5);
ebox(229, 809, 32, 32, "blue", 5, 5);
ebox(366, 219, 32, 32, "blue", 5, 5);
ebox(78, 3616, 32, 32, "blue", 5, 5);
ebox(236, 2003, 32, 32, "blue", 5, 5);
ebox(43, 1482, 32, 32, "blue", 5, 5);
ebox(521, 2599, 32, 32, "blue", 5, 5);
ebox(168, 2789, 32, 32, "blue", 5, 5);
ebox(501, 699, 32, 32, "blue", 5, 5);
ebox(469, 2092, 32, 32, "blue", 5, 5);
ebox(212, 1337, 32, 32, "blue", 5, 5);
ebox(319, 2155, 32, 32, "blue", 5, 5);
ebox(308, 3684, 32, 32, "blue", 5, 5);
ebox(137, 3233, 32, 32, "blue", 5, 5);
ebox(323, 1117, 32, 32, "blue", 5, 5);
ebox(416, 2859, 32, 32, "blue", 5, 5);
ebox(56, 1781, 32, 32, "blue", 5, 5);
ebox(436, 3229, 32, 32, "blue", 5, 5);
ebox(404, 1079, 32, 32, "blue", 5, 5);
ebox(235, 1613, 32, 32, "blue", 5, 5);
ebox(542, 2006, 32, 32, "blue", 5, 5);
ebox(91, 2699, 32, 32, "blue", 5, 5);
ebox(166, 3607, 32, 32, "blue", 5, 5);
ebox(158, 774, 32, 32, "blue", 5, 5);
ebox(224, 348, 32, 32, "blue", 5, 5);
ebox(335, 3407, 32, 32, "blue", 5, 5);
ebox(351, 2225, 32, 32, "blue", 5, 5);
ebox(178, 2893, 32, 32, "blue", 5, 5);
ebox(357, 1789, 32, 32, "blue", 5, 5);
ebox(141, 2280, 32, 32, "blue", 5, 5);
ebox(456, 1521, 32, 32, "blue", 5, 5);
ebox(373, 1822, 32, 32, "blue", 5, 5);
ebox(372, 2687, 32, 32, "blue", 5, 5);
ebox(452, 1084, 32, 32, "blue", 5, 5);
ebox(376, 727, 32, 32, "blue", 5, 5);
ebox(197, 2057, 32, 32, "blue", 5, 5);
ebox(288, 1343, 32, 32, "blue", 5, 5);
ebox(232, 3867, 32, 32, "blue", 5, 5);
ebox(508, 1478, 32, 32, "blue", 5, 5);
ebox(95, 2077, 32, 32, "blue", 5, 5);
ebox(72, 2816, 32, 32, "blue", 5, 5);
ebox(300, 2358, 32, 32, "blue", 5, 5);
ebox(496, 453, 32, 32, "blue", 5, 5);
ebox(301, 2441, 32, 32, "blue", 5, 5);
ebox(326, 477, 32, 32, "blue", 5, 5);
ebox(235, 871, 32, 32, "blue", 5, 5);
ebox(734, 1210, 32, 32, "blue", 5, 5);
ebox(15, 2953, 32, 32, "blue", 5, 5);
ebox(559, 538, 32, 32, "blue", 5, 5);
ebox(671, 2245, 32, 32, "blue", 5, 5);
ebox(427, 1983, 32, 32, "blue", 5, 5);
ebox(13, 1006, 32, 32, "blue", 5, 5);
ebox(532, 1305, 32, 32, "blue", 5, 5);
ebox(708, 2188, 32, 32, "blue", 5, 5);
ebox(229, 2607, 32, 32, "blue", 5, 5);
ebox(34, 2486, 32, 32, "blue", 5, 5);
ebox(260, 2739, 32, 32, "blue", 5, 5);
ebox(206, 234, 32, 32, "blue", 5, 5);
ebox(775, 1919, 32, 32, "blue", 5, 5);
ebox(320, 1659, 32, 32, "blue", 5, 5);
ebox(432, 228, 32, 32, "blue", 5, 5);
ebox(621, 418, 32, 32, "blue", 5, 5);
ebox(118, 1525, 32, 32, "blue", 5, 5);
ebox(420, 2511, 32, 32, "blue", 5, 5);
ebox(10, 1102, 32, 32, "blue", 5, 5);
ebox(221, 2312, 32, 32, "blue", 5, 5);
ebox(657, 613, 32, 32, "blue", 5, 5);
ebox(749, 2790, 32, 32, "blue", 5, 5);
ebox(245, 1183, 32, 32, "blue", 5, 5);
ebox(697, 214, 32, 32, "blue", 5, 5);
ebox(96, 1090, 32, 32, "blue", 5, 5);
ebox(69, 2404, 32, 32, "blue", 5, 5);
ebox(462, 1435, 32, 32, "blue", 5, 5);
ebox(377, 2579, 32, 32, "blue", 5, 5);
ebox(503, 1589, 32, 32, "blue", 5, 5);
ebox(561, 2501, 32, 32, "blue", 5, 5);
ebox(664, 1226, 32, 32, "blue", 5, 5);
ebox(276, 1773, 32, 32, "blue", 5, 5);
ebox(259, 623, 32, 32, "blue", 5, 5);
ebox(362, 303, 32, 32, "blue", 5, 5);
ebox(420, 1993, 32, 32, "blue", 5, 5);
ebox(189, 573, 32, 32, "blue", 5, 5);
ebox(239, 623, 32, 32, "blue", 5, 5);
ebox(463, 166, 32, 32, "blue", 5, 5);
ebox(115, 259, 32, 32, "blue", 5, 5);
ebox(522, 631, 32, 32, "blue", 5, 5);

// 7
ebox(214, 2409, 32, 32, "blue", 6, 5);
ebox(552, 5286, 32, 32, "blue", 6, 5);
ebox(85, 2218, 32, 32, "blue", 6, 5);
ebox(476, 4800, 32, 32, "blue", 6, 5);
ebox(731, 465, 32, 32, "blue", 6, 5);
ebox(84, 3473, 32, 32, "blue", 6, 5);
ebox(644, 1348, 32, 32, "blue", 6, 5);
ebox(59, 1794, 32, 32, "blue", 6, 5);
ebox(114, 5433, 32, 32, "blue", 6, 5);
ebox(708, 1569, 32, 32, "blue", 6, 5);
ebox(187, 2621, 32, 32, "blue", 6, 5);
ebox(68, 3346, 32, 32, "blue", 6, 5);
ebox(438, 6865, 32, 32, "blue", 6, 5);
ebox(43, 2111, 32, 32, "blue", 6, 5);
ebox(370, 5610, 32, 32, "blue", 6, 5);
ebox(543, 6902, 32, 32, "blue", 6, 5);
ebox(509, 2525, 32, 32, "blue", 6, 5);
ebox(84, 4873, 32, 32, "blue", 6, 5);
ebox(111, 5064, 32, 32, "blue", 6, 5);
ebox(391, 4943, 32, 32, "blue", 6, 5);
ebox(580, 5297, 32, 32, "blue", 6, 5);
ebox(176, 6215, 32, 32, "blue", 6, 5);
ebox(206, 3097, 32, 32, "blue", 6, 5);
ebox(767, 1555, 32, 32, "blue", 6, 5);
ebox(502, 1285, 32, 32, "blue", 6, 5);
ebox(116, 5218, 32, 32, "blue", 6, 5);
ebox(491, 2069, 32, 32, "blue", 6, 5);
ebox(76, 586, 32, 32, "blue", 6, 5);
ebox(724, 6839, 32, 32, "blue", 6, 5);
ebox(26, 301, 32, 32, "blue", 6, 5);
ebox(242, 5561, 32, 32, "blue", 6, 5);
ebox(492, 1876, 32, 32, "blue", 6, 5);
ebox(115, 6908, 32, 32, "blue", 6, 5);
ebox(193, 3277, 32, 32, "blue", 6, 5);
ebox(177, 1178, 32, 32, "blue", 6, 5);
ebox(19, 2234, 32, 32, "blue", 6, 5);
ebox(430, 2126, 32, 32, "blue", 6, 5);
ebox(390, 2608, 32, 32, "blue", 6, 5);
ebox(748, 4521, 32, 32, "blue", 6, 5);
ebox(551, 6491, 32, 32, "blue", 6, 5);
ebox(71, 5887, 32, 32, "blue", 6, 5);
ebox(699, 3242, 32, 32, "blue", 6, 5);
ebox(163, 3016, 32, 32, "blue", 6, 5);
ebox(80, 281, 32, 32, "blue", 6, 5);
ebox(607, 639, 32, 32, "blue", 6, 5);
ebox(636, 2073, 32, 32, "blue", 6, 5);
ebox(490, 144, 32, 32, "blue", 6, 5);
ebox(695, 4165, 32, 32, "blue", 6, 5);
ebox(530, 2886, 32, 32, "blue", 6, 5);
ebox(544, 2149, 32, 32, "blue", 6, 5);
ebox(691, 2212, 32, 32, "blue", 6, 5);
ebox(131, 4906, 32, 32, "blue", 6, 5);
ebox(98, 223, 32, 32, "blue", 6, 5);
ebox(81, 4333, 32, 32, "blue", 6, 5);
ebox(148, 6241, 32, 32, "blue", 6, 5);
ebox(441, 4724, 32, 32, "blue", 6, 5);
ebox(705, 3419, 32, 32, "blue", 6, 5);
ebox(533, 6825, 32, 32, "blue", 6, 5);
ebox(531, 791, 32, 32, "blue", 6, 5);
ebox(406, 1643, 32, 32, "blue", 6, 5);
ebox(391, 1106, 32, 32, "blue", 6, 5);
ebox(694, 3173, 32, 32, "blue", 6, 5);
ebox(276, 201, 32, 32, "blue", 6, 5);
ebox(170, 6708, 32, 32, "blue", 6, 5);
ebox(554, 1210, 32, 32, "blue", 6, 5);
ebox(441, 5737, 32, 32, "blue", 6, 5);
ebox(365, 2871, 32, 32, "blue", 6, 5);
ebox(721, 4695, 32, 32, "blue", 6, 5);
ebox(90, 5561, 32, 32, "blue", 6, 5);
ebox(604, 5578, 32, 32, "blue", 6, 5);
ebox(453, 1409, 32, 32, "blue", 6, 5);
ebox(541, 2162, 32, 32, "blue", 6, 5);
ebox(236, 1398, 32, 32, "blue", 6, 5);
ebox(356, 3090, 32, 32, "blue", 6, 5);
ebox(525, 1060, 32, 32, "blue", 6, 5);
ebox(559, 3685, 32, 32, "blue", 6, 5);
ebox(625, 6654, 32, 32, "blue", 6, 5);
ebox(642, 3027, 32, 32, "blue", 6, 5);
ebox(4, 4573, 32, 32, "blue", 6, 5);
ebox(597, 1258, 32, 32, "blue", 6, 5);
ebox(529, 721, 32, 32, "blue", 6, 5);
ebox(377, 6533, 32, 32, "blue", 6, 5);
ebox(139, 4465, 32, 32, "blue", 6, 5);
ebox(633, 2462, 32, 32, "blue", 6, 5);
ebox(518, 6745, 32, 32, "blue", 6, 5);
ebox(21, 6557, 32, 32, "blue", 6, 5);
ebox(385, 2336, 32, 32, "blue", 6, 5);
ebox(250, 1157, 32, 32, "blue", 6, 5);
ebox(638, 903, 32, 32, "blue", 6, 5);
ebox(634, 2346, 32, 32, "blue", 6, 5);
ebox(411, 481, 32, 32, "blue", 6, 5);
ebox(627, 775, 32, 32, "blue", 6, 5);
ebox(446, 1965, 32, 32, "blue", 6, 5);
ebox(724, 6039, 32, 32, "blue", 6, 5);
ebox(542, 6679, 32, 32, "blue", 6, 5);
ebox(143, 6983, 32, 32, "blue", 6, 5);
ebox(762, 501, 32, 32, "blue", 6, 5);
ebox(230, 4108, 32, 32, "blue", 6, 5);
ebox(367, 1910, 32, 32, "blue", 6, 5);
ebox(279, 6552, 32, 32, "blue", 6, 5);
ebox(445, 4935, 32, 32, "blue", 6, 5);
ebox(213, 5268, 32, 32, "blue", 6, 5);
ebox(554, 2817, 32, 32, "blue", 6, 5);
// endless
 
  
  
if ((enemyY % 1000) == 0) {
times = enemyY/1000;
}
  

 
for (i = 0; i < 10 + (10 * times); i++) {
 ebox(endlessX[i + (90 * times)], endlessY[i + (90 * times)] + (1000 * times), 32, 32, "blue", 37, 5);
}

 


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

text(enemyY, 10, Game.height - 50, "black", "40px Arial", 99)

// text('', 20, Game.height -30, "black", "20px Arial", 0)
              
 mouseClick = false
                              							  } //----------Update End ----------------- 



	function onerun(){						   
           
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;}
 
for (i = 0; i < 9999999; i++) {
 endlessX[i] =  getRndInteger(0, 700);                                   
 endlessY[i] = getRndInteger(80, 1000);
}}
