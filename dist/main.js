(()=>{"use strict";var e={426:(e,t,r)=>{r.d(t,{Z:()=>s});var n=r(81),o=r.n(n),i=r(645),a=r.n(i)()(o());a.push([e.id,":root {\n  --gridSize: 5;\n}\nhtml{\n  height: 100%;\n  width: 100%;\n  background-color: grey;\n}\n.gridContainer {\n  display: grid;\n  grid-template-columns: repeat(var(--gridSize),30px);\n  grid-template-rows: repeat(var(--gridSize),30px);\n  gap:2px;\n}\n.gridElement {\n  background-color: aqua;\n  border: black;\n}\n\nbody{\n  display: flex;\n  flex-direction: row;\n  gap: 20px;\n}",""]);const s=a},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var r="",n=void 0!==t[5];return t[4]&&(r+="@supports (".concat(t[4],") {")),t[2]&&(r+="@media ".concat(t[2]," {")),n&&(r+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),r+=e(t),n&&(r+="}"),t[2]&&(r+="}"),t[4]&&(r+="}"),r})).join("")},t.i=function(e,r,n,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(n)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var l=0;l<e.length;l++){var d=[].concat(e[l]);n&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),r&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=r):d[2]=r),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),t.push(d))}},t}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function r(e){for(var r=-1,n=0;n<t.length;n++)if(t[n].identifier===e){r=n;break}return r}function n(e,n){for(var i={},a=[],s=0;s<e.length;s++){var c=e[s],l=n.base?c[0]+n.base:c[0],d=i[l]||0,u="".concat(l," ").concat(d);i[l]=d+1;var h=r(u),p={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==h)t[h].references++,t[h].updater(p);else{var f=o(p,n);n.byIndex=s,t.splice(s,0,{identifier:u,updater:f,references:1})}a.push(u)}return a}function o(e,t){var r=t.domAPI(t);return r.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;r.update(e=t)}else r.remove()}}e.exports=function(e,o){var i=n(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=r(i[a]);t[s].references--}for(var c=n(e,o),l=0;l<i.length;l++){var d=r(i[l]);0===t[d].references&&(t[d].updater(),t.splice(d,1))}i=c}}},569:e=>{var t={};e.exports=function(e,r){var n=function(e){if(void 0===t[e]){var r=document.querySelector(e);if(window.HTMLIFrameElement&&r instanceof window.HTMLIFrameElement)try{r=r.contentDocument.head}catch(e){r=null}t[e]=r}return t[e]}(e);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(r)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,r)=>{e.exports=function(e){var t=r.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(r){!function(e,t,r){var n="";r.supports&&(n+="@supports (".concat(r.supports,") {")),r.media&&(n+="@media ".concat(r.media," {"));var o=void 0!==r.layer;o&&(n+="@layer".concat(r.layer.length>0?" ".concat(r.layer):""," {")),n+=r.css,o&&(n+="}"),r.media&&(n+="}"),r.supports&&(n+="}");var i=r.sourceMap;i&&"undefined"!=typeof btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),t.styleTagTransform(n,e,t.options)}(t,e,r)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={id:n,exports:{}};return e[n](i,i.exports,r),i.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.nc=void 0,(()=>{const e=Math.PI/180;class t{constructor(){this.hitPlaces=[],this.globalNoGoCoordinates=[],this.missedShots=[],this.allReceivedShots=[],this.gridSize=10,this.shipLengths=[5,4,3,3,2]}static noGoCoordinatesCalculator(e){const t=[];let r;for(let n=0;n<e.length;n+=1)r=[[e[n][1]-1,e[n][2]-1],[e[n][1],e[n][2]-1],[e[n][1]+1,e[n][2]-1],[e[n][1]-1,e[n][2]],[e[n][1],e[n][2]],[e[n][1]+1,e[n][2]],[e[n][1]-1,e[n][2]+1],[e[n][1],e[n][2]+1],[e[n][1]+1,e[n][2]+1]],t.push(...r);return t}static removeDuplicatesCoordinates(e){for(let t=0;t<e.length;t+=1)for(let r=1+t;r<e.length;r+=1)JSON.stringify(e[t])===JSON.stringify(e[r])&&(e[r]=null);return e.filter((e=>null!=e))}static findCoordinateConflict(e,t){let r;if(!(e.length<1||t.length<1)){if(3===e[0].length&&2===t[0].length)for(let n=0;n<e.length&&(r=t.find((t=>JSON.stringify(t)===JSON.stringify([e[n][1],e[n][2]]))),void 0===r);n+=1);else 2===e.length&&3===t[0].length?r=t.find((t=>JSON.stringify([t[1],t[2]])===JSON.stringify([e[0],e[1]]))):2===e.length&&2===t[0].length&&(r=t.find((t=>JSON.stringify([t[0],t[1]])===JSON.stringify([e[0],e[1]]))));return r}}static coordinateInGridCheck(e,t){return t.every((t=>t[1]<e&&t[1]>=0&&t[2]<e&&t[2]>=0))}isAttackLegal(e,r){return t.coordinateInGridCheck(10,[[Object,e,r]])?void 0===t.findCoordinateConflict([e,r],this.allReceivedShots)||"COORDINATE_USED_PREVIOUSLY":"NOT_IN_GRID"}static shipCoordinateGenerator(t,r,n,o){const i=Math.round(Math.cos(n*e)),a=Math.round(Math.sin(n*e)),s=[];for(let e=o.length;e>0;e-=1){const n=t+(o.length-e)*i,c=r+(o.length-e)*a;s.push([o,n,c])}return s}static randomAngle(){let e=0;switch(Math.floor(4*Math.random())){case 0:default:e=0;break;case 1:e=90;break;case 2:e=180;break;case 3:e=270}return e}autoPlaceShips(){this.shipLengths.map((e=>{let r=0,n=0,o=0,i=0;do{n=Math.floor(Math.random()*this.gridSize),o=Math.floor(Math.random()*this.gridSize),i=t.randomAngle(),r=this.placeShips(n,o,i,e)}while("object"!=typeof r)}))}placeShips(e,r,n,o){const i=new class{constructor(e){this.length=e,this.alive=!0,this.life=this.length}hit(){this.alive&&(this.life-=1,this.life<=0&&(this.alive=!1))}isSunk(){return!this.alive}}(o),a=t.shipCoordinateGenerator(e,r,n,i),s=t.noGoCoordinatesCalculator(a);return void 0!==t.findCoordinateConflict(a,this.globalNoGoCoordinates)?"Error! Position not allowed":t.coordinateInGridCheck(10,a)?(this.hitPlaces=this.hitPlaces.concat(a),this.globalNoGoCoordinates=this.globalNoGoCoordinates.concat(t.removeDuplicatesCoordinates(s)),i):"Error! Position not in grid"}receiveAttack(e,r){const n=this.isAttackLegal(e,r);if(!0!==n)return n;this.allReceivedShots.push([e,r]);const o=t.findCoordinateConflict([e,r],this.hitPlaces);return void 0!==o?(o[0].hit(),o[0]):(this.missedShots.push([e,r]),!1)}gameOver(){return this.hitPlaces.every((e=>!0===e[0].isSunk()))}}const n=t,o=class{constructor(e){this.name=e,this.score=0,this.Gameboard=new n}static computerPlay(e){let t,r,n;do{r=Math.floor(Math.random()*(e.gridSize+1)),n=Math.floor(Math.random()*(e.gridSize+1)),t=e.isAttackLegal(r,n)}while("COORDINATE_USED_PREVIOUSLY"===t||"NOT_IN_GRID"===t);return[r,n]}};function i(e,t,r){return(e-r)*e-1-(e-(t+1))}const a={xyCoordinateIdentifier:function(e,t){const r=Math.floor(t/e);return[t-e*r,e-r-1]},createGrid:function(e,t){const r=document.createElement("div");document.documentElement.style.setProperty("--gridSize",`${e}`),r.setAttribute("id",t.name),r.classList.add("gridContainer"),document.body.append(r);for(let t=0;t<e*e;t+=1){const e=document.createElement("grid");e.classList.add("gridElement"),e.setAttribute("data-grid_element_num",`${t}`),r.appendChild(e)}},findBlockId:i,placeShipOngrid:function(e,t,r,n){for(let o=0;o<e.hitPlaces.length;o+=1){const a=i(r,e.hitPlaces[o][1],e.hitPlaces[o][2]),s=document.getElementById(`${t.name}`).querySelector(`[data-grid_element_num = "${a}"]`);n&&(s.style.backgroundColor="purple")}},shotGridColor:function(e,t){"object"==typeof t?e.style.backgroundColor="red":!1===t?e.style.backgroundColor="white":console.log(t)}};class s{constructor(){this.gameOver=0}setGameOver(e){this.gameOver=e}static initiateGrids(e,t,r,n,o){a.createGrid(o,e),a.createGrid(o,t),r.autoPlaceShips(),a.placeShipOngrid(r,e,o,1),n.autoPlaceShips(),a.placeShipOngrid(n,t,o,0)}game(e){const t=new o("player1"),r=new o("player2"),i=new n,a=new n;s.initiateGrids(t,r,i,a,e),this.playerEventListenerSetup(i,a,t,r,e)}playerEventListenerSetup(e,t,r,n,o){return document.getElementById(n.name).querySelectorAll(".gridElement").forEach((i=>{i.addEventListener("click",(i=>{if(1===this.gameOver)return console.log("game is over, go away"),0;if(!e.gameOver()){const a=s.userTurn(n,t,i,o);return"object"!=typeof a&&!1!==a||(t.gameOver()?(alert("Game Over"),this.setGameOver(1)):s.pcTurn(r,e,o)),0}this.setGameOver(1),console.log("Game Over")}))})),0}static pcTurn(e,t,r){const n=document.getElementById(e.name),i=o.computerPlay(t),s=t.receiveAttack(...i),c=a.findBlockId(r,...i),l=n.querySelector(`[data-grid_element_num = "${c}"]`);return a.shotGridColor(l,s),s}static userTurn(e,t,r,n){const o=r.target.getAttribute("data-grid_element_num"),i=a.xyCoordinateIdentifier(n,o),s=t.receiveAttack(...i);return"object"!=typeof s&&!1!==s||a.shotGridColor(r.target,s),s}}const c=s;var l=r(379),d=r.n(l),u=r(795),h=r.n(u),p=r(569),f=r.n(p),g=r(565),m=r.n(g),v=r(216),y=r.n(v),S=r(589),C=r.n(S),b=r(426),O={};O.styleTagTransform=C(),O.setAttributes=m(),O.insert=f().bind(null,"head"),O.domAPI=h(),O.insertStyleElement=y(),d()(b.Z,O),b.Z&&b.Z.locals&&b.Z.locals,(new c).game(10)})()})();