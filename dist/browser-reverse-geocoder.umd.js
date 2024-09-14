(function(t,e){typeof exports=="object"&&typeof module<"u"?module.exports=e(require("rbush"),require("@turf/turf")):typeof define=="function"&&define.amd?define(["rbush","@turf/turf"],e):(t=typeof globalThis<"u"?globalThis:t||self,t.BrowserReverseGeocoder=e(t.RBush,t.turf))})(this,function(t,e){"use strict";var f=Object.defineProperty;var d=(t,e,n)=>e in t?f(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var o=(t,e,n)=>d(t,typeof e!="symbol"?e+"":e,n);class n{constructor(){o(this,"_sourceProjection","EPSG:4326");o(this,"_targetProjection","EPSG:3857");o(this,"_geoData",null);o(this,"_spatialIndex",null);this._geoData=null,this._spatialIndex=null}async init(s){const i=await fetch(s);this._geoData=await i.json(),this._initSpatialIndex(),console.log("BrowserReverseGeocoder initialized successfully")}_initSpatialIndex(){this._spatialIndex=new t,this._geoData.features.forEach((s,i)=>{const[a,u,r,c]=e.bbox(s);this._spatialIndex.insert({minX:a,minY:u,maxX:r,maxY:c,index:i})})}reverseGeocode(s,i){const a=this._spatialIndex.search({minX:s,minY:i,maxX:s,maxY:i});for(let u of a){const r=this._geoData.features[u.index];if(e.booleanPointInPolygon([s,i],r))return r.properties}return null}}return n});
