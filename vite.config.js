// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'BrowserReverseGeocoder',
      fileName: (format) => `browser-reverse-geocoder.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['rbush', '@turf/turf'],
      output: {
        globals: {
          rbush: 'RBush',
          '@turf/turf': 'turf'
        }
      }
    }
  }
});
