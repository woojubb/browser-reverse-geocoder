import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'BrowserReverseGeocoder',
      fileName: (format) => `browser-reverse-geocoder.${format}.js`,
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['rbush', '@turf/bbox', '@turf/boolean-point-in-polygon'],
      output: {
        globals: {
          rbush: 'RBush',
          '@turf/bbox': 'turfBbox',
          '@turf/boolean-point-in-polygon': 'turfBooleanPointInPolygon',
        },
      },
    },
  },
});
