if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,c)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let f={};const d=e=>n(e,o),s={module:{uri:o},exports:f,require:d};i[o]=Promise.all(r.map((e=>s[e]||d(e)))).then((e=>(c(...e),f)))}}define(["./workbox-fa446783"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-144x144.png",revision:"949e694c1ba274def7089f042bb5c348"},{url:"android-chrome-192x192.png",revision:"429b1ce36f23a05ec62a5a77e9e13037"},{url:"android-chrome-512x512.png",revision:"a5e816df6517cf47be7b7cd6d6958ff7"},{url:"apple-touch-icon.png",revision:"2016c686da3d3a553df84ee88f52ef20"},{url:"assets/index-01ca3072.js",revision:null},{url:"assets/index-0e32f9e1.css",revision:null},{url:"favicon-16x16.png",revision:"196cc91401d0f95ac0f22c5ddb2fcbf8"},{url:"favicon-32x32.png",revision:"866fbd3a631e408e83a9d4df9d09261d"},{url:"favicon.ico",revision:"3b6599744256fbecc0abf3cb76e05e5e"},{url:"index.html",revision:"59ff1589fefab0a90a9f4705a5ebda28"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"screenshots/android.png",revision:"7636492b8673cb1ddbe1612c6e6709f8"},{url:"screenshots/ios_1.png",revision:"5d45b7722bcf8db4a7668a6c66023e86"},{url:"screenshots/ios_2.png",revision:"b3f95f43874ee85547af3962bdb6f10c"},{url:"favicon-16x16.png",revision:"196cc91401d0f95ac0f22c5ddb2fcbf8"},{url:"favicon-32x32.png",revision:"866fbd3a631e408e83a9d4df9d09261d"},{url:"favicon.ico",revision:"3b6599744256fbecc0abf3cb76e05e5e"},{url:"android-chrome-144x144.png",revision:"949e694c1ba274def7089f042bb5c348"},{url:"android-chrome-192x192.png",revision:"429b1ce36f23a05ec62a5a77e9e13037"},{url:"android-chrome-512x512.png",revision:"a5e816df6517cf47be7b7cd6d6958ff7"},{url:"apple-touch-icon.png",revision:"2016c686da3d3a553df84ee88f52ef20"},{url:"manifest.webmanifest",revision:"83424f70ea51bc5f3e59519406774086"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
