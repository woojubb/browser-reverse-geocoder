import { describe, it, expect, vi, beforeEach } from 'vitest';
import BrowserReverseGeocoder from '../src/index.js';

const MOCK_GEOJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: { name: 'AreaA' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]],
      },
    },
    {
      type: 'Feature',
      properties: { name: 'AreaB' },
      geometry: {
        type: 'Polygon',
        coordinates: [[[20, 20], [30, 20], [30, 30], [20, 30], [20, 20]]],
      },
    },
  ],
};

function mockFetch(data) {
  globalThis.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

describe('BrowserReverseGeocoder', () => {
  describe('constructor', () => {
    it('should create an uninitialized instance', () => {
      const geocoder = new BrowserReverseGeocoder();
      expect(geocoder._initialized).toBe(false);
      expect(geocoder._geoData).toBeNull();
      expect(geocoder._spatialIndex).toBeNull();
    });
  });

  describe('init', () => {
    it('should load GeoJSON from a URL', async () => {
      mockFetch(MOCK_GEOJSON);

      const geocoder = new BrowserReverseGeocoder();
      await geocoder.init('http://example.com/test.json');

      expect(fetch).toHaveBeenCalledWith('http://example.com/test.json');
      expect(geocoder._initialized).toBe(true);
      expect(geocoder._geoData.features).toHaveLength(2);
    });

    it('should accept a GeoJSON object directly', async () => {
      const geocoder = new BrowserReverseGeocoder();
      await geocoder.init(MOCK_GEOJSON);

      expect(geocoder._initialized).toBe(true);
      expect(geocoder._geoData).toBe(MOCK_GEOJSON);
    });

    it('should throw on fetch failure', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      });

      const geocoder = new BrowserReverseGeocoder();
      await expect(geocoder.init('http://example.com/missing.json'))
        .rejects.toThrow('Failed to fetch GeoJSON: 404 Not Found');
    });

    it('should throw on invalid source', async () => {
      const geocoder = new BrowserReverseGeocoder();
      await expect(geocoder.init(42))
        .rejects.toThrow('Source must be a GeoJSON URL (string) or a FeatureCollection object');
    });
  });

  describe('reverseGeocode', () => {
    let geocoder;

    beforeEach(async () => {
      geocoder = new BrowserReverseGeocoder();
      await geocoder.init(MOCK_GEOJSON);
    });

    it('should return properties when point is inside a polygon', () => {
      const result = geocoder.reverseGeocode(5, 5);
      expect(result).toEqual({ name: 'AreaA' });
    });

    it('should match the correct polygon among multiple', () => {
      const result = geocoder.reverseGeocode(25, 25);
      expect(result).toEqual({ name: 'AreaB' });
    });

    it('should return null when point is outside all polygons', () => {
      const result = geocoder.reverseGeocode(50, 50);
      expect(result).toBeNull();
    });

    it('should throw if called before init', () => {
      const uninitializedGeocoder = new BrowserReverseGeocoder();
      expect(() => uninitializedGeocoder.reverseGeocode(5, 5))
        .toThrow('Geocoder not initialized. Call init() first.');
    });
  });
});
