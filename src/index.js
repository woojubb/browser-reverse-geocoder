import RBush from 'rbush';
import bbox from '@turf/bbox';
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';

/**
 * @typedef {import('geojson').FeatureCollection} FeatureCollection
 * @typedef {import('geojson').Feature} Feature
 */

class BrowserReverseGeocoder {
  /** @type {FeatureCollection | null} */
  _geoData = null;

  /** @type {RBush | null} */
  _spatialIndex = null;

  /** @type {boolean} */
  _initialized = false;

  /**
   * Initialize with a GeoJSON URL or object.
   * @param {string | FeatureCollection} source - GeoJSON URL or object
   * @returns {Promise<void>}
   */
  async init(source) {
    if (typeof source === 'string') {
      const response = await fetch(source);
      if (!response.ok) {
        throw new Error(`Failed to fetch GeoJSON: ${response.status} ${response.statusText}`);
      }
      this._geoData = await response.json();
    } else if (source && source.type === 'FeatureCollection') {
      this._geoData = source;
    } else {
      throw new Error('Source must be a GeoJSON URL (string) or a FeatureCollection object');
    }

    this._buildSpatialIndex();
    this._initialized = true;
  }

  /**
   * Build RBush spatial index from loaded GeoJSON features.
   * @private
   */
  _buildSpatialIndex() {
    this._spatialIndex = new RBush();

    const items = this._geoData.features.map((feature, index) => {
      const [minX, minY, maxX, maxY] = bbox(feature);
      return { minX, minY, maxX, maxY, index };
    });

    this._spatialIndex.load(items);
  }

  /**
   * Find the feature properties for a given coordinate.
   * @param {number} lon - Longitude
   * @param {number} lat - Latitude
   * @returns {object | null} Feature properties, or null if no match
   */
  reverseGeocode(lon, lat) {
    if (!this._initialized) {
      throw new Error('Geocoder not initialized. Call init() first.');
    }

    const candidates = this._spatialIndex.search({
      minX: lon,
      minY: lat,
      maxX: lon,
      maxY: lat,
    });

    for (const item of candidates) {
      const feature = this._geoData.features[item.index];
      if (booleanPointInPolygon([lon, lat], feature)) {
        return feature.properties;
      }
    }

    return null;
  }
}

export default BrowserReverseGeocoder;
