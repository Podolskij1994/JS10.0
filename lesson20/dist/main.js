!function(e){var t={};function r(o){if(t[o])return t[o].exports;var n=t[o]={i:o,l:!1,exports:{}};return e[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,o){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(o,n,function(t){return e[t]}.bind(null,n));return o},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t);var o=function(e){let t=document.querySelector("#timer-hours"),r=document.querySelector("#timer-minutes"),o=document.querySelector("#timer-seconds"),n=setInterval((function(){let s=function(){let t=(new Date(e).getTime()-(new Date).getTime())/1e3;return{seconds:Math.floor(t%60),minutes:Math.floor(t/60%60),hours:Math.floor(t/60/60),timeRemaining:t}}();s.hours<10&&(s.hours="0"+s.hours),s.minutes<10&&(s.minutes="0"+s.minutes),s.seconds<10&&(s.seconds="0"+s.seconds),s.seconds>=0?(t.textContent=s.hours,r.textContent=s.minutes,o.textContent=s.seconds):(t.textContent="00",r.textContent="00",o.textContent="00"),s.timeRemaining<=0&&clearInterval(n)}),1e3)};var n=()=>{const e=document.querySelector("menu");document.querySelector("body").addEventListener("click",t=>{!t.target.closest("menu")&&!t.target.closest(".menu")||t.target.closest(".close-btn")||"A"===t.target.nodeName?e.classList.remove("active-menu"):t.target.closest(".menu")&&e.classList.toggle("active-menu")})};var s=()=>{let e=0;const t=document.querySelector(".popup"),r=document.querySelectorAll(".popup-btn"),o=document.querySelector(".popup-close");function n(){e<1&&(e+=.05,t.style.opacity=e,requestAnimationFrame(n))}function s(){e>0?(e-=.05,t.style.opacity=e,requestAnimationFrame(s)):t.style.display=""}t.style.opacity=0,r.forEach(e=>{e.addEventListener("click",()=>{t.style.display="block",n()})}),t.addEventListener("click",e=>{e.target!==t&&e.target!==o||s()})};var a=()=>{const e=[].slice.call(document.querySelectorAll('a[href*="#"]'));e.forEach((function(e){e.addEventListener("click",(function(t){t.preventDefault();let r=document.querySelector(e.getAttribute("href")).getBoundingClientRect().top+window.pageYOffset,o=setInterval((function(){let e=r/20;e>window.pageYOffset-r&&window.innerHeight+window.pageYOffset<document.body.offsetHeight?window.scrollBy(0,e):(window.scrollTo(0,r),clearInterval(o))}),15)}))}))};var i=()=>{const e=document.querySelector(".service-header"),t=e.querySelectorAll(".service-header-tab"),r=document.querySelectorAll(".service-tab");e.addEventListener("click",e=>{let o=e.target;(o=o.closest(".service-header-tab"))&&t.forEach((e,n)=>{e===o&&(e=>{r.forEach((o,n)=>{e===n?(t[n].classList.add("active"),r[n].classList.remove("d-none")):(t[n].classList.remove("active"),r[n].classList.add("d-none"))})})(n)})})};var c=()=>{const e=document.querySelectorAll(".portfolio-item"),t=document.querySelectorAll(".dot"),r=document.querySelector(".portfolio-content");let o,n=0;const s=(e,t,r)=>{e[t].classList.remove(r)},a=(e,t,r)=>{e[t].classList.add(r)},i=()=>{s(e,n,"portfolio-item-active"),s(t,n,"dot-active"),++n>=e.length&&(n=0),a(e,n,"portfolio-item-active"),a(t,n,"dot-active")},c=(e=2e3)=>{o=setInterval(i,e)};r.addEventListener("click",r=>{r.preventDefault();let o=r.target;o.matches(".portfolio-btn, .dot")&&(s(e,n,"portfolio-item-active"),s(t,n,"dot-active"),o.matches("#arrow-right")?n++:o.matches("#arrow-left")?n--:o.matches(".dot")&&t.forEach((e,t)=>{e===o&&(n=t)}),n>=e.length&&(n=0),n<0&&(n=e.length-1),a(e,n,"portfolio-item-active"),a(t,n,"dot-active"))}),r.addEventListener("mouseover",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&clearInterval(o)}),r.addEventListener("mouseout",e=>{(e.target.matches(".portfolio-btn")||e.target.matches(".dot"))&&c()}),c(2e3)};var l=()=>{document.querySelectorAll(".command__photo");const e=document.getElementById("command");e.addEventListener("mouseover",e=>{let t=e.target;if(t.matches(".command__photo")){let e=t.src;t.src=t.dataset.img,t.dataset.img=e}}),e.addEventListener("mouseout",e=>{let t=e.target;if(t.matches(".command__photo")){let e=t.src;t.src=t.dataset.img,t.dataset.img=e}})};const u=e=>fetch("./server.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});var m=(e,t)=>{let r=document.getElementById(`form${e}`),o=document.createElement("div"),n=r.querySelectorAll("input");const s=e=>{if(200!==e.status)throw new Error("status network not 200");o.textContent="Спасибо! Мы скоро с вами свяжемся!",n.forEach(e=>e.value="")},a=e=>{o.textContent="Что-то пошло не так...",console.error(e)};o.style.color="white",o.textContent="Загрузка...",r.addEventListener("submit",e=>{if(e.preventDefault(),0===t){r.appendChild(o);const e=new FormData(r);let t={};for(let r of e.entries())t[r[0]]=r[1];u(t).then(s).catch(a)}})};var d=()=>{const e=document.querySelector(".calc-block"),t=document.querySelector(".calc-type"),r=document.querySelector(".calc-square"),o=document.querySelector(".calc-day"),n=document.querySelector(".calc-count"),s=document.querySelector("#total"),a=(e,t)=>{s.textContent=t,t<e&&(t++,requestAnimationFrame(()=>a(e,t)))};e.addEventListener("change",(function(e){const s=e.target;s!==t&&s!==r&&s!==o&&s!==n||((e=100)=>{let s=0,i=1,c=1;const l=+t.options[t.selectedIndex].value,u=+r.value;n.value>1&&(i+=(n.value-1)/10),o.value<5&&o.value?c*=2:o.value<10&&o.value&&(c*=1.5),l&&u&&(s=Math.floor(e*l*u*i*c)),a(s,0)})()}))};var h=class{constructor({selector:e,pattern:t={},method:r,num:o,errors:n}){this.form=document.querySelector(e),this.pattern=t,this.method=r,this.num=o,this.errors=n,this.elementsForm=[...this.form.elements].filter(e=>"button"!==e.tagName.toLowerCase()&&"button"!==e.type),this.error=new Set}init(){this.applyStyle(),this.setPattern(),this.elementsForm.forEach(e=>e.addEventListener("change",this.checkIt.bind(this))),this.form.addEventListener("submit",e=>{this.error.size&&e.preventDefault()}),this.elementsForm.forEach(e=>e.addEventListener("input",(function(){this.dataset.russian&&(this.value=this.value.replace(/[^а-яё\s]*/gi,""))})))}isValid(e){const t={notEmpty:e=>""!==e.value.trim(),pattern:(e,t)=>t.test(e.value)};if(this.method){const r=this.method[e.id];if(r)return r.every(r=>t[r[0]](e,this.pattern[r[1]]))}else console.warn("Необходимо передать id полей ввода и методы проверки этих полей");return!0}checkIt(e){const t=e.target;this.isValid(t)?(this.showSuccess(t),this.error.delete(t),this.errors=this.error.size):(this.showError(t),this.error.add(t),this.errors=this.error.size)}showError(e){if(e.classList.remove("success"),e.classList.add("error"),e.nextElementSibling&&e.nextElementSibling.classList.contains("validator-error"))return;const t=document.createElement("div");t.textContent="Ошибка в этом поле",t.classList.add("validator-error"),e.insertAdjacentElement("afterend",t)}showSuccess(e){e.classList.remove("error"),e.classList.add("success"),e.nextElementSibling&&e.nextElementSibling.classList.contains("validator-error")&&e.nextElementSibling.remove()}applyStyle(){const e=document.createElement("style");e.textContent="\n    input.success {\n      border: 2px solid green !Important\n    }\n    input.error {\n      border: 2px solid red !Important\n    }\n    .validator-error {\n      font-size: 12px;\n      font-family: sans-serif;\n      color: red;\n      margin: -20px\n    } ",document.head.appendChild(e)}setPattern(){this.pattern.phone||(this.pattern.phone=/^\+?[78]([-()]*\d){10}$/),this.pattern.email||(this.pattern.email=/^\w+@\w+\.\w{2,}$/)}};let p=new Date,f=p.getDate(),v=p.getMonth(),y=p.getFullYear();p.setFullYear(y,v,f+1),p.setHours(0,0,0),o(p),n();screen.width>=768&&s(),a(),i(),c(),l();const g=new h({selector:"#form1",pattern:{},method:{"form1-phone":[["notEmpty"],["pattern","phone"]],"form1-email":[["pattern","email"]],"form1-name":[["notEmpty"]]},num:1,errors:0});g.init();const E=new h({selector:"#form2",pattern:{},method:{"form2-phone":[["notEmpty"],["pattern","phone"]],"form2-email":[["pattern","email"]],"form2-name":[["notEmpty"]]},num:2,errors:0});E.init();const S=new h({selector:"#form3",pattern:{},method:{"form3-phone":[["notEmpty"],["pattern","phone"]],"form3-email":[["pattern","email"]],"form3-name":[["notEmpty"]]},num:3,errors:0});S.init(),m("1",g.errors),m("2",E.errors),m("3",S.errors),d()}]);