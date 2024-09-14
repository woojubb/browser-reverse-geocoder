# browser-reverse-geocoder

A lightweight, browser-based reverse geocoding library that converts geographic coordinates (latitude and longitude) into human-readable addresses. This library uses GeoJSON data for geocoding, making it flexible and customizable for various regions and address formats.

## Features

- Pure JavaScript implementation, works entirely in the browser
- Uses efficient spatial indexing for fast lookups
- Supports custom GeoJSON datasets
- Configurable address formatting
- No external API calls required, ensuring privacy and offline capability

Ideal for web applications that need to perform reverse geocoding without relying on external services. Simply provide your own GeoJSON data, and browser-reverse-geocoder will handle the rest!

## Installation

```bash
npm install browser-reverse-geocoder
```

## Usage

```javascript
import BrowserReverseGeocoder from 'browser-reverse-geocoder';

const geocoder = new BrowserReverseGeocoder();
await geocoder.init('path/to/your/geojson/file.json');

const address = geocoder.reverseGeocode(longitude, latitude);
console.log(address);
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
