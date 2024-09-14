import RBush from 'rbush';
import { bbox, booleanPointInPolygon } from '@turf/turf';

class BrowserReverseGeocoder {
  _sourceProjection = 'EPSG:4326';
  _targetProjection = 'EPSG:3857';  // Web Mercator projection
  _geoData = null;
  _spatialIndex = null;

  constructor() {
    this._geoData = null;
    this._spatialIndex = null;
  }

  async init(geoJsonUrl) {
    // Load GeoJSON data
    const response = await fetch(geoJsonUrl);
    this._geoData = await response.json();

    // Initialize spatial index
    this._initSpatialIndex();

    console.log('BrowserReverseGeocoder initialized successfully');
  }

  _initSpatialIndex() {
    this._spatialIndex = new RBush();
    this._geoData.features.forEach((feature, index) => {
      const [minX, minY, maxX, maxY] = bbox(feature);
      this._spatialIndex.insert({
        minX,
        minY,
        maxX,
        maxY,
        index
      });
    });
  }

  reverseGeocode(lon, lat) {
    const result = this._spatialIndex.search({
      minX: lon,
      minY: lat,
      maxX: lon,
      maxY: lat
    });

    for (let item of result) {
      const feature = this._geoData.features[item.index];
      const isMatch = booleanPointInPolygon([lon, lat], feature);
      if (isMatch) {
        return feature.properties;
      }
    }

    return null;
  }
}

export default BrowserReverseGeocoder;