!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=4)}([function(t,e,n){var o=n(1),i=n(2);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var r={insert:"head",singleton:!1},a=(o(i,r),i.locals?i.locals:{});t.exports=a},function(t,e,n){"use strict";var o,i=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},r=function(){var t={};return function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}t[e]=n}return t[e]}}(),a=[];function s(t){for(var e=-1,n=0;n<a.length;n++)if(a[n].identifier===t){e=n;break}return e}function c(t,e){for(var n={},o=[],i=0;i<t.length;i++){var r=t[i],c=e.base?r[0]+e.base:r[0],h=n[c]||0,p="".concat(c," ").concat(h);n[c]=h+1;var u=s(p),l={css:r[1],media:r[2],sourceMap:r[3]};-1!==u?(a[u].references++,a[u].updater(l)):a.push({identifier:p,updater:m(l,e),references:1}),o.push(p)}return o}function h(t){var e=document.createElement("style"),o=t.attributes||{};if(void 0===o.nonce){var i=n.nc;i&&(o.nonce=i)}if(Object.keys(o).forEach((function(t){e.setAttribute(t,o[t])})),"function"==typeof t.insert)t.insert(e);else{var a=r(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var p,u=(p=[],function(t,e){return p[t]=e,p.filter(Boolean).join("\n")});function l(t,e,n,o){var i=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(t.styleSheet)t.styleSheet.cssText=u(e,i);else{var r=document.createTextNode(i),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(r,a[e]):t.appendChild(r)}}function f(t,e,n){var o=n.css,i=n.media,r=n.sourceMap;if(i?t.setAttribute("media",i):t.removeAttribute("media"),r&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var d=null,v=0;function m(t,e){var n,o,i;if(e.singleton){var r=v++;n=d||(d=h(e)),o=l.bind(null,n,r,!1),i=l.bind(null,n,r,!0)}else n=h(e),o=f.bind(null,n,e),i=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(n)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else i()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=i());var n=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var o=0;o<n.length;o++){var i=s(n[o]);a[i].references--}for(var r=c(t,e),h=0;h<n.length;h++){var p=s(n[h]);0===a[p].references&&(a[p].updater(),a.splice(p,1))}n=r}}}},function(t,e,n){(e=n(3)(!1)).push([t.i,"*{margin:0;padding:0;box-sizing:border-box}.overflow-hidden{overflow-x:hidden;overflow-y:hidden}.float-left{float:left}.float-right{float:right}.select-none{user-select:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none}.position-bottom{position:absolute;left:0;bottom:0}.coincide{position:absolute;top:0;left:0}body{width:100vw;height:100vh}body .text-center{text-align:center}body .landscape{width:100vw;height:100vh}body .controller{width:100vmax;height:40vmin}body .rocker-wrapper{width:100px;height:100px;margin-left:2rem;border-radius:100%;background:rgba(153,153,153,0.4)}body .rocker-wrapper .rocker{position:relative;top:25px;left:25px;width:50px;height:50px;border-radius:100%;background:#999}body .speed-up-wrap{width:100px;height:100px;margin-right:2rem}body .speed-up-wrap .speed-up{position:relative;top:25px;left:25px;width:70px;height:70px;border-radius:100%;background:rgba(240,107,107,0.7)}body .welcome{color:#666}body .welcome h1{padding:2rem}body .welcome button.start-game{position:relative;top:0;left:50%;margin-left:-50px;margin-top:3rem;width:100px;height:40px;border:1px dashed #888;color:#555}body .welcome .version-text{font-size:.8rem;padding:.3rem}@media screen and (orientation: portrait){body .landscape{width:100vmax;height:100vmin;transform-origin:top left;transform:rotate(90deg) translate(0, -100vmin)}body .turn{transform-origin:top left;transform:rotate(90deg) translate(0, -100vmin)}}\n",""]),t.exports=e},function(t,e,n){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n=function(t,e){var n=t[1]||"",o=t[3];if(!o)return n;if(e&&"function"==typeof btoa){var i=(a=o,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),r=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(t," */")}));return[n].concat(r).concat([i]).join("\n")}var a,s,c;return[n].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(n,"}"):n})).join("")},e.i=function(t,n,o){"string"==typeof t&&(t=[[null,t,""]]);var i={};if(o)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(i[a]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);o&&i[c[0]]||(n&&(c[2]?c[2]="".concat(n," and ").concat(c[2]):c[2]=n),e.push(c))}},e}},function(t,e,n){"use strict";n.r(e);n(0);var o=function(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var o=Array(t),i=0;for(e=0;e<n;e++)for(var r=arguments[e],a=0,s=r.length;a<s;a++,i++)o[i]=r[a];return o},i=function(){function t(t,e){for(var n in void 0===t&&(t={}),void 0===e&&(e={}),this.entries=t,this.definitions={},this.entries.container=this,e)this.define(n,e[n])}return t.prototype.get=function(t){var e=this.entries[t];if(e)return e;var n=this.definitions[t];if(n)return this.entries[t]=n.apply(this),this.entries[t];throw new Error("There is no entry named "+t)},t.prototype.set=function(t,e){this.entries[t]=e},t.prototype.has=function(t){return Boolean(void 0===this.entries[t]&&void 0===this.definitions[t])},t.prototype.make=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];var o=this.definitions[t];if(o)return o.apply(this,e);throw new Error("There is no entry named "+t)},t.prototype.define=function(t,e){this.definitions[t]=e.bind(this)},t.prototype.invoke=function(t,e){for(var n=[],o=0,i=e;o<i.length;o++){var r=i[o];n.push(this.get(r))}return t.apply(n)},t.prototype.instance=function(t,e){void 0===e&&(e=[]);for(var n=[],i=0,r=e;i<r.length;i++){var a=r[i];n.push(this.get(a))}return new(t.bind.apply(t,o([void 0],n)))},t}();var r,a=function(){function t(){this.observers=new Set}return t.prototype.register=function(t){this.observers.add(t)},t.prototype.remove=function(t){t.terminate&&t.terminate(),this.observers.delete(t)},t.prototype.notify=function(t){this.observers.forEach((function(e){e.update(t),e.render&&e.needRepaint()&&(e.render(),e.repaint(!1))}))},t.prototype.terminate=function(){this.observers.forEach((function(t){t.terminate&&t.terminate()})),this.observers.clear()},t}(),s=function(){function t(t){this.subject=t,this.isRunning=!1,this.animationFrameId=0,this.process=this.process.bind(this)}return t.prototype.start=function(){this.isRunning||(this.isRunning=!0,requestAnimationFrame(this.process))},t.prototype.pause=function(){this.isRunning=!1,cancelAnimationFrame(this.animationFrameId)},t.prototype.stop=function(){this.isRunning=!1,this.subject.terminate(),cancelAnimationFrame(this.animationFrameId),this.stopHandle&&this.stopHandle.apply(this,this)},t.prototype.onStop=function(t){this.stopHandle=t},t.prototype.process=function(t){this.isRunning&&(this.subject.notify(t),this.animationFrameId=requestAnimationFrame(this.process))},t}(),c=2*Math.PI,h=Math.PI/180,p=function(){function t(t){this.canvas=t,this.context=t.getContext("2d")}return t.prototype.getContext=function(){return this.context},t.prototype.snakeHead=function(t,e,n,o){this.renderOuter(t,e,n,o);var i=this.context,r=n/2.3,a=n/1.8,s=n/1.8;i.save(),i.strokeStyle=o,i.fillStyle="white",i.beginPath(),i.arc(t+s,e-a,r,0,c),i.closePath(),i.fill(),i.stroke(),i.beginPath(),i.arc(t+s,e+a,r,0,c),i.closePath(),i.fill(),i.stroke(),i.fillStyle="black",i.beginPath(),i.arc(t+s,e-a,r/2,0,c),i.closePath(),i.fill(),i.beginPath(),i.arc(t+s,e+a,r/2,0,c),i.closePath(),i.fill();var h=r/3,p=t+s+h,u=e-a-h;i.fillStyle="white",i.beginPath(),i.arc(p,u,h,0,c),i.closePath(),i.fill(),u=e+a-h,i.beginPath(),i.arc(p,u,h,0,c),i.closePath(),i.fill(),i.restore()},t.prototype.snakeSection=function(t,e,n,o,i){var r=this.context;this.renderOuter(t,e,n,o),r.save(),r.fillStyle=i,r.beginPath(),r.arc(t,e,n/2,0,c),r.closePath(),r.fill(),r.restore()},t.prototype.food=function(t,e,n){var o=this.context;o.save(),o.fillStyle=n,o.beginPath(),o.arc(t,e,4,0,c),o.closePath(),o.fill(),o.restore()},t.prototype.mapBackground=function(t,e){var n=e/t,o=e/t,i=Math.max(n,o),r=this.context;r.beginPath(),r.lineWidth=.1,r.fillStyle="#aaa";for(var a=0;a<i;a++)a<n&&(r.moveTo(a*t,0),r.lineTo(a*t,e)),a<o&&(r.moveTo(0,a*t),r.lineTo(e,a*t));r.closePath(),r.stroke()},t.prototype.renderOuter=function(t,e,n,o){var i=this.context;i.save(),i.fillStyle=o,i.beginPath(),i.arc(t,e,n,0,c),i.closePath(),i.fill(),i.restore()},t.prototype.clearRect=function(t,e,n,o){this.context.clearRect(t,e,n,o)},t}(),u=function(){function t(t){this.element=t}return t.prototype.getElement=function(){return this.element},t.prototype.push=function(t){void 0===t&&(t=!1);var e=document.createElement("canvas"),n=g.get("interfaceSize"),o=n[0],i=n[1];return e.width=o,e.height=i,e.setAttribute("class","coincide"),t||this.element.appendChild(e),e},t}();!function(t){t[t.Yellow=0]="Yellow"}(r||(r={}));var l,f=function(){function t(){this.snakeHeads={},this.snakeSections={},this.snakeHeads[r.Yellow]=this.snakeHeadToCanvas("#F08080",80),this.snakeSections[r.Yellow]=this.snakeSectionToCanvas("#F08080","#CD5C5C",80)}return t.prototype.getSnakeHead=function(t){return this.snakeHeads[t]},t.prototype.getSnakeSection=function(t){return this.snakeSections[t]},t.prototype.getMap=function(t,e){void 0===e&&(e=!0);var n=this.makeCanvas(5e3,5e3);e&&g.make("Graphical",n).mapBackground(20,t);return n},t.prototype.snakeHeadToCanvas=function(t,e){var n=this.makeCanvas(e,e);return g.make("Graphical",n).snakeHead(e/2,e/2,e/2,t),n},t.prototype.snakeSectionToCanvas=function(t,e,n){var o=this.makeCanvas(80,80);return g.make("Graphical",o).snakeSection(n/2,n/2,n/2,t,e),o},t.prototype.makeCanvas=function(t,e){var n=document.createElement("canvas");return n.width=t,n.height=e,n},t}(),d=document.getElementById("app"),v=document.body,m=function(t,e){var n=Math.max(t,e),o=Math.min(t,e),i=9*n/16;return i>o?[16*o/9,o]:[n,i]}(v.clientWidth,v.clientHeight),y=new a,g=new i({action:new s(y),subject:y,interfaceSize:m},{Graphical:function(t){return new p(t)},Layer:function(){return new u(d)},Material:function(){return new f}}),b=function(){return(b=Object.assign||function(t){for(var e,n=1,o=arguments.length;n<o;n++)for(var i in e=arguments[n])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)},S=function(){function t(){this.states={},this.history={},this.repaintState=!1,this.timeMap=new Map}return t.prototype.setStates=function(t){this.repaint(!0),this.states=b(b({},this.states),t)},t.prototype.getStates=function(){return this.states},t.prototype.getHistory=function(){return this.history},t.prototype.needRepaint=function(){return this.repaintState},t.prototype.repaint=function(t){this.repaintState=t,t&&(this.history=this.states)},t.prototype.isOvertime=function(t,e){return this.timeMap.has(e)||this.timeMap.set(e,0),e<=t-this.timeMap.get(e)&&(this.timeMap.set(e,t),!0)},t}(),x=(l=function(t,e){return(l=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(t,e)},function(t,e){function n(){this.constructor=t}l(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),w=function(t){function e(n){var o=t.call(this)||this;o.food=n,o.layer=g.get("Layer"),o.canvas=o.layer.push();var i=g.make("Graphical",o.canvas),r=g.get("Material");return o.mapCanvas=r.getMap(e.mapSize),o.context=i.getContext(),o.interfaceSize=g.get("interfaceSize"),o.setStates({x:0,y:0}),o}return x(e,t),e.prototype.update=function(t){},e.prototype.render=function(){var t=this.interfaceSize,e=t[0],n=t[1],o=this.getStates(),i=o.x,r=o.y;this.context.clearRect(0,0,e,n),this.context.drawImage(this.mapCanvas,i,r,e,n,0,0,e,n)},e.prototype.updateMaxPosition=function(t,e){this.setStates({x:t,y:e}),this.food.setStates({x:t,y:e})},e.prototype.terminate=function(){this.layer.getElement().removeChild(this.canvas)},e.mapSize=1200,e}(S),k=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}(),M=function(t){function e(e,n){var o=t.call(this)||this;o.publicMap=e,o.food=n,o.sections=[],o.positions=[],o.offLayer=g.get("Layer"),o.offCanvas=o.offLayer.push(!0),o.offscreenContext=o.offCanvas.getContext("2d"),o.layer=g.get("Layer"),o.canvas=o.layer.push();var i=g.make("Graphical",o.canvas),a=g.get("Material");o.context=i.getContext();var s=a.getSnakeHead(r.Yellow);return o._head=s,o.head=a.makeCanvas(80,80),o.headContext=o.head.getContext("2d"),o.headContext.translate(40,40),o.headContext.drawImage(s,-40,-40),o.section=a.getSnakeSection(r.Yellow),o.setStates({interfaceSize:g.get("interfaceSize"),x:500,y:600,size:30,speed:2,angle:0,toAngle:0,sectionEnd:!1,mapX:0,mapY:0,scores:0}),o.addSection(),o.addSection(),o.addSection(),o.addSection(),o.addSection(),o.addSection(),o}return k(e,t),e.prototype.rotateHead=function(){var t=this.getStates().angle;this.headContext.save(),this.headContext.clearRect(-45,-45,95,95),this.headContext.rotate(t*h),this.headContext.drawImage(this._head,-40,-40),this.headContext.restore()},e.prototype.update=function(t){var e=this.getStates(),n=e.x,o=e.y,i=e.speed,r=e.angle,a=e.toAngle,s=(e.sectionEnd,e.size),c=e.scores,p=e.interfaceSize,u=p[0],l=p[1];r!==a&&(this.eachAngle(),this.rotateHead());var f={},d=i*Math.cos(r*h)+n,v=i*Math.sin(r*h)+o,m=d-u/2+s/2,y=v-l/2+s/2;this.publicMap.updateMaxPosition(m,y),f={x:d,y:v,mapX:m,mapY:y},this.positions.push([d,v]);var b=w.mapSize-s;(d<=0||v<=0||d>=b||v>=b)&&g.get("action").stop();var S=this.food.onPositionChange(d,v,s);S&&(c>=5?(f.scores=c-5+S,this.addSection()):f.scores=c+S),this.setStates(f)},e.prototype.render=function(){var t=this.getStates(),e=t.size,n=t.x,o=t.y,i=t.mapX,r=t.mapY,a=t.sectionEnd,s=t.interfaceSize,c=s[0],h=s[1],p=this.getHistory(),u=p.size,l=p.x,f=p.y,d=this.offscreenContext,v=this.context;a&&this.positions.shift(),this.clearSections(),d.clearRect(l-i-10,f-r-10,u+20,u+20),this.renderSections(),d.drawImage(this.head,0,0,80,80,n-i,o-r,e,e),v.clearRect(0,0,c,h),v.drawImage(this.offCanvas,0,0)},e.prototype.clearSections=function(){for(var t=this.getHistory().size,e=this.offscreenContext,n=0,o=this.sections;n<o.length;n++){var i=o[n];e.clearRect(i.lastX-10,i.lastY-10,t+20,t+20)}},e.prototype.renderSections=function(){for(var t=this.getStates(),e=t.size,n=t.mapX,o=t.mapY,i=(t.sectionEnd,this.offscreenContext),r=[],a=0,s=this.sections;a<s.length;a++){var c=s[a];if(0!==c.waitTime){c.waitTime--;break}var h=this.positions[c.position];if(h){var p=h[0],u=h[1];r.unshift([p,u]),c.isLast&&this.setStates({sectionEnd:!0}),this.getStates().sectionEnd||c.position++,c.lastX=p-n,c.lastY=u-o}}for(var l=0,f=r;l<f.length;l++){var d=f[l];p=d[0],u=d[1];i.drawImage(this.section,0,0,80,80,p-n,u-o,e,e)}},e.prototype.addSection=function(){var t=this.getStates(),n=t.x,o=t.y,i=t.speed,r=e.WAIT_TIME/i,a=this.sections[this.sections.length-1],s=n,c=o;a&&(a.isLast=!1,s=a.lastX,c=a.lastY),this.sections.push({isLast:!0,lastX:s,lastY:c,waitTime:r,position:0}),this.setStates({sectionEnd:!1})},e.prototype.onAngleChange=function(t){this.setStates({toAngle:t})},e.prototype.eachAngle=function(){var t=this.getStates(),e=t.angle,n=t.toAngle,o=e,i=3*t.speed;Math.abs(n-e)<180&&(n-e>0&&(o+=i),n-e<0&&(o-=i)),Math.abs(n-e)>180&&(n-e>0&&(o-=i),n-e<0&&(o+=i)),e>360&&(o-=360),e<0&&(o+=360),Math.abs(n-e)<i&&(o=n),this.setStates({angle:o})},e.prototype.terminate=function(){this.layer.getElement().removeChild(this.canvas)},e.WAIT_TIME=18,e}(S),C=function(){function t(t,e,n){this.elementRocker=t,this.elementSpeedUp=e,this.snake=n,this.top=25,this.left=25,this.startX=0,this.startY=0,t.ontouchstart=this.rockerTouchStart.bind(this),t.ontouchmove=this.rockerTouchMove.bind(this),t.ontouchend=this.rockerTouchEnd.bind(this),e.ontouchstart=this.speedUpStart.bind(this),e.ontouchend=this.speedUpEnd.bind(this),this.action=g.get("action")}return t.prototype.speedUpStart=function(t){t.preventDefault(),this.action.isRunning?this.action.pause():this.action.start()},t.prototype.speedUpEnd=function(t){t.preventDefault()},t.prototype.rockerTouchStart=function(t){t.preventDefault();var e=t.targetTouches[0],n=e.clientX,o=e.clientY;this.startX=n,this.startY=o},t.prototype.rockerTouchMove=function(t){t.preventDefault();var e=t.targetTouches[0],n=e.clientX,o=e.clientY,i=this.getRockerOffset(n,o),r=i[0],a=i[1],s=this.left+r,c=this.top+a;this.elementRocker.style.left=s+"px",this.elementRocker.style.top=c+"px";var h=this.getAngle(n,o,r,a);this.snake.onAngleChange(h)},t.prototype.rockerTouchEnd=function(t){t.preventDefault(),this.elementRocker.style.top=this.top+"px",this.elementRocker.style.left=this.left+"px"},t.prototype.getAngle=function(t,e,n,o){var i=180/Math.PI;return t>=this.startX&&e>=this.startY?Math.floor(Math.atan(o/n)*i):t<=this.startX&&e>=this.startY?Math.floor(Math.atan(-n/o)*i)+90:t<this.startX&&e<this.startY?Math.floor(Math.atan(-o/-n)*i)+180:t>this.startX&&e<this.startY?Math.floor(Math.atan(-n/o)*i)+270:0},t.prototype.getRockerOffset=function(t,e){var n,o=document.body,i=o.clientWidth,r=o.clientHeight,a=t-this.startX,s=e-this.startY;i<r&&(a=(n=[s,-a])[0],s=n[1]);var c=Math.sqrt(Math.pow(a,2)+Math.pow(s,2));if(c>25){var h=25/c;a*=h,s*=h}return[a,s]},t}(),P=function(){var t=function(e,n){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])})(e,n)};return function(e,n){function o(){this.constructor=e}t(e,n),e.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}}();function E(t,e){var n=e-t,o=Math.random();return t+Math.round(o*n)}var T=["#F08080","#F5DEB3","#98FB98","#ADD8E6","#40E0D0","#FFC0CB"],_=function(t){function e(){var e=t.call(this)||this;e.foodNumber=w.mapSize/10,e.foods=[],e.animates=[],e.layer=g.get("Layer"),e.canvas=e.layer.push();var n=g.get("Material");return e.mapCanvas=n.getMap(w.mapSize,!1),e.graphical=g.make("Graphical",e.mapCanvas),e.context=e.canvas.getContext("2d"),e.interfaceSize=g.get("interfaceSize"),e.setStates({x:0,y:0,snx:0,sny:0}),e.buildTree(),e.randomFood(),e}return P(e,t),e.prototype.update=function(t){var e=this.getStates(),n=e.snx,o=e.sny;for(var i in this.animates){var r=this.animates[i],a=r[0],s=r[1],c=r[2];this.graphical.clearRect(a-10,s-10,16,16);var h=o-s,p=n-a,u=Math.abs(p/h)*(p<0?-1:1)+a,l=(h<0?-1:1)+s;this.animates[i]=[u,l,c],Math.sqrt(Math.pow(p,2)+Math.pow(h,2))<=10&&(delete this.animates[i],this.makeFood())}},e.prototype.render=function(){var t=this.interfaceSize,e=t[0],n=t[1],o=this.getStates(),i=o.x,r=o.y;for(var a in this.context.clearRect(0,0,e,n),this.animates){var s=this.animates[a],c=s[0],h=s[1],p=s[2];this.graphical.food(c,h,p)}this.context.drawImage(this.mapCanvas,i,r,e,n,0,0,e,n)},e.prototype.onPositionChange=function(t,e,n){var o=w.mapSize/100-1,i=100*Math.floor(t/100),r=[i],a=0;t-i<10&&i>0&&r.push(i-1),i<o&&t+n+10>i+1&&r.push(i+1);for(var s=0,c=r;s<c.length;s++){var h=c[s],p=this.foods[h];for(var u in p){var l=p[u],f=l[0],d=l[1],v=l[2],m=n/2;this.collisionCheck(t+m,e+m,m,f,d,4)&&(a++,this.animates.push([f,d,v]),delete this.foods[h][u])}}return this.setStates({snx:t,sny:e}),a},e.prototype.collisionCheck=function(t,e,n,o,i,r){var a=Math.sqrt(Math.pow(t-o,2)+Math.pow(e-i,2));return Boolean(n+r+40>=a)},e.prototype.buildTree=function(){for(var t=w.mapSize/100,e=0;e<t;e++)this.foods[100*e]=[]},e.prototype.randomFood=function(){for(var t=0;t<this.foodNumber;t++)this.makeFood()},e.prototype.makeFood=function(){var t=E(4,w.mapSize-4),e=E(4,w.mapSize-4),n=E(0,T.length-1);this.graphical.food(t,e,T[n]);var o=100*Math.floor(t/100);this.foods[o].push([t,e,T[n]])},e.prototype.terminate=function(){this.layer.getElement().removeChild(this.canvas)},e}(S),O=document.getElementById("rocker"),R=document.getElementById("speed-up"),z=document.getElementById("start-game"),j=document.getElementById("welcome"),I=document.getElementById("game-over-confirm"),A=document.getElementById("gameover"),Y=g.get("action"),F=g.get("subject");Y.onStop((function(){A.style.display="block"})),z.onclick=function(t){j.style.display="none";var e=new _;F.register(e);var n=new w(e);F.register(n);var o=new M(n,e);F.register(o);new C(O,R,o);Y.start()},I.onclick=function(t){A.style.display="none",j.style.display="block"}}]);