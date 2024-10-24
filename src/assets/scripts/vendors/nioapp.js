/*!
  * NioApp v1.0.0 (https://softnio.com/)
  * Developed by Softnio Team.
  * Copyright by Softnio.
  */
// var NioApp=function(e,t){"use strict";var o={AppInfo:{name:"NioApp",version:"1.0.0",author:"Softnio"},Package:{name:"NioLand",version:"1.0"}};return o.docReady=function(e){document.addEventListener("DOMContentLoaded",e,!1)},o.winLoad=function(e){window.addEventListener("load",e,!1)},o.onResize=function(e,t){(t=void 0===t?window:t).addEventListener("resize",e)},o}(window,document);NioApp=function(e){"use strict";return e.BS={},e.Addons={},e.Custom={},e.Toggle={},e.body=document.querySelector("body"),e.Win={height:window.innerHeight,width:window.innerWidth},e.Break={mb:420,sm:576,md:768,lg:992,xl:1200,xxl:1400,any:1/0},e.State={isRTL:!(!e.body.classList.contains("has-rtl")&&"rtl"!==e.body.getAttribute("dir")),isTouch:"ontouchstart"in document.documentElement,isMobile:!!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i),asMobile:e.Win.width<e.Break.md},e.StateUpdate=function(){e.Win={height:window.innerHeight,width:window.innerWidth},e.State.asMobile=e.Win.width<e.Break.md},e.SlideUp=function(e,t=500){e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.boxSizing="border-box",e.style.height=e.offsetHeight+"px",e.offsetHeight,e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,window.setTimeout(()=>{e.style.display="none",e.style.removeProperty("height"),e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property")},t)},e.SlideDown=function(e,t=500){e.style.removeProperty("display");let o=window.getComputedStyle(e).display;"none"===o&&(o="block"),e.style.display=o;let i=e.offsetHeight;e.style.overflow="hidden",e.style.height=0,e.style.paddingTop=0,e.style.paddingBottom=0,e.style.marginTop=0,e.style.marginBottom=0,e.offsetHeight,e.style.boxSizing="border-box",e.style.transitionProperty="height, margin, padding",e.style.transitionDuration=t+"ms",e.style.height=i+"px",e.style.removeProperty("padding-top"),e.style.removeProperty("padding-bottom"),e.style.removeProperty("margin-top"),e.style.removeProperty("margin-bottom"),window.setTimeout(()=>{e.style.removeProperty("height"),e.style.removeProperty("overflow"),e.style.removeProperty("transition-duration"),e.style.removeProperty("transition-property")},t)},e.SlideToggle=function(t,o=500){return"none"===window.getComputedStyle(t).display?e.SlideDown(t,o):e.SlideUp(t,o)},e.extendObject=function(e,t){return Object.keys(t).forEach((function(o){e[o]=t[o]})),e},e.onResize(e.StateUpdate),e}(NioApp);

/*!
  * NioApp v1.0.0 (https://softnio.com/)
  * Developed by Softnio Team.
  * Copyright by Softnio.
  */

const NioApp = {};

// App and Package Info
NioApp.AppInfo = {
  name: "NioApp",
  version: "1.0.0",
  author: "Softnio"
};

NioApp.Package = {
  name: "NioLand",
  version: "1.0"
};

// Event Listeners
NioApp.docReady = function (callback) {
  document.addEventListener("DOMContentLoaded", callback, false);
};

NioApp.winLoad = function (callback) {
  window.addEventListener("load", callback, false);
};

NioApp.onResize = function (callback, target = window) {
  target.addEventListener("resize", callback);
};

// Additional Properties
NioApp.BS = {};
NioApp.Addons = {};
NioApp.Custom = {};
NioApp.Toggle = {};
NioApp.body = document.querySelector("body");

NioApp.Win = {
  height: window.innerHeight,
  width: window.innerWidth
};

NioApp.Break = {
  mb: 420,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  any: Infinity
};

NioApp.State = {
  isRTL: NioApp.body.classList.contains("has-rtl") || NioApp.body.getAttribute("dir") === "rtl",
  isTouch: "ontouchstart" in document.documentElement,
  isMobile: !!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|/i),
  asMobile: NioApp.Win.width < NioApp.Break.md
};

NioApp.StateUpdate = function () {
  NioApp.Win = {
    height: window.innerHeight,
    width: window.innerWidth
  };
  NioApp.State.asMobile = NioApp.Win.width < NioApp.Break.md;
};

// Utility Methods
NioApp.SlideUp = function (element, duration = 500) {
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.boxSizing = "border-box";
  element.style.height = element.offsetHeight + "px";
  element.offsetHeight; // force reflow
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  window.setTimeout(() => {
    element.style.display = "none";
    element.style.removeProperty("height");
    element.style.removeProperty("padding-top");
    element.style.removeProperty("padding-bottom");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
  }, duration);
};

NioApp.SlideDown = function (element, duration = 500) {
  element.style.removeProperty("display");
  let display = window.getComputedStyle(element).display;
  if (display === "none") display = "block";
  element.style.display = display;
  let height = element.offsetHeight;
  element.style.overflow = "hidden";
  element.style.height = 0;
  element.style.paddingTop = 0;
  element.style.paddingBottom = 0;
  element.style.marginTop = 0;
  element.style.marginBottom = 0;
  element.offsetHeight; // force reflow
  element.style.boxSizing = "border-box";
  element.style.transitionProperty = "height, margin, padding";
  element.style.transitionDuration = duration + "ms";
  element.style.height = height + "px";
  element.style.removeProperty("padding-top");
  element.style.removeProperty("padding-bottom");
  element.style.removeProperty("margin-top");
  element.style.removeProperty("margin-bottom");
  window.setTimeout(() => {
    element.style.removeProperty("height");
    element.style.removeProperty("overflow");
    element.style.removeProperty("transition-duration");
    element.style.removeProperty("transition-property");
  }, duration);
};

NioApp.SlideToggle = function (element, duration = 500) {
  return window.getComputedStyle(element).display === "none"
    ? NioApp.SlideDown(element, duration)
    : NioApp.SlideUp(element, duration);
};

NioApp.extendObject = function (target, source) {
  Object.keys(source).forEach(key => {
    target[key] = source[key];
  });
  return target;
};

// Handle window resize
NioApp.onResize(NioApp.StateUpdate);

// Export NioApp for use in other modules
export default NioApp;
