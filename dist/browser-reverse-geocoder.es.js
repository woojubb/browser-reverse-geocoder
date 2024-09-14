var l = Object.defineProperty;
var c = (s, e, t) => e in s ? l(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var a = (s, e, t) => c(s, typeof e != "symbol" ? e + "" : e, t);
import u from "rbush";
import { bbox as h, booleanPointInPolygon as x } from "@turf/turf";
class p {
  constructor() {
    a(this, "_sourceProjection", "EPSG:4326");
    a(this, "_targetProjection", "EPSG:3857");
    // Web Mercator projection
    a(this, "_geoData", null);
    a(this, "_spatialIndex", null);
    this._geoData = null, this._spatialIndex = null;
  }
  async init(e) {
    const t = await fetch(e);
    this._geoData = await t.json(), this._initSpatialIndex(), console.log("BrowserReverseGeocoder initialized successfully");
  }
  _initSpatialIndex() {
    this._spatialIndex = new u(), this._geoData.features.forEach((e, t) => {
      const [o, n, i, r] = h(e);
      this._spatialIndex.insert({
        minX: o,
        minY: n,
        maxX: i,
        maxY: r,
        index: t
      });
    });
  }
  reverseGeocode(e, t) {
    const o = this._spatialIndex.search({
      minX: e,
      minY: t,
      maxX: e,
      maxY: t
    });
    for (let n of o) {
      const i = this._geoData.features[n.index];
      if (x([e, t], i))
        return i.properties;
    }
    return null;
  }
}
export {
  p as default
};
