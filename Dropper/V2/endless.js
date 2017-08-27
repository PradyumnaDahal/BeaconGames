function endless() {
 
  
if ((enemyY % 1000) == 0) {
times = enemyY/1000;
}
  

for (q = 0; q < 10 + (2 * (times + 1)); q++) {
 ebox(endlessX[q + (90 * (times + 1))], endlessY[q + (90 * (times + 1))] + (1000 * (times + 1)), 32, 32, "blue", 37, 5); // below
}
 
for (i = 0; i < 10 + (2 * times); i++) {
 ebox(endlessX[i + (90 * times)], endlessY[i + (90 * times)] + (1000 * times), 32, 32, "blue", 37, 5); // middle
 if (times > 0) {   
for (r = 0; r < 10 + (2 * (times - 1)); r++) {
 ebox(endlessX[r + (90 * (times - 1))], endlessY[r + (90 * (times - 1))] + (1000 * (times - 1)), 32, 32, "blue", 37, 5); // above
}}}}
