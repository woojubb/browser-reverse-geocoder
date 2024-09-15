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

## Example

```javascript
import BrowserReverseGeocoder from 'browser-reverse-geocoder';

const geocoder = new BrowserReverseGeocoder();
await geocoder.init('https://woojubb.github.io/korea-district-geo-converter/dist/districts.kr.json'); // sample district data from https://github.com/woojubb/korea-district-geo-converter

const address = geocoder.reverseGeocode(longitude, latitude);
console.log(address);
```

## GeoJSON Data Format Example

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "BASE_DATE": "20230701",
        "ADM_NM": "가경동",
        "ADM_CD": "33043540",
        "provinceCode": 33,
        "provinceName": "충청북도",
        "districtCode": "043",
        "districtName": "청주시 흥덕구",
        "townCode": "540",
        "townName": "가경동",
        "code": "33043540"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [127.4262, 36.611363],
            [127.423469, 36.618088],
            [127.42674, 36.623778],
            [127.430923, 36.623946],
            [127.428373, 36.628201],
            [127.432226, 36.632508],
            [127.438588, 36.632792],
            [127.444721, 36.620543],
            [127.444652, 36.616353],
            [127.439834, 36.612288],
            [127.432166, 36.609233],
            [127.426964, 36.609848],
            [127.4262, 36.611363]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "BASE_DATE": "20230701",
        "ADM_NM": "가곡동",
        "ADM_CD": "38080550",
        "provinceCode": 38,
        "provinceName": "경상남도",
        "districtCode": "080",
        "districtName": "밀양시",
        "townCode": "550",
        "townName": "가곡동",
        "code": "38080550"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [128.796795, 35.482],
            [128.803182, 35.474852],
            [128.80228, 35.473018],
            [128.798743, 35.473408],
            [128.794877, 35.471113],
            [128.793429, 35.468272],
            [128.794613, 35.464561],
            [128.79195, 35.46027],
            [128.785707, 35.460265],
            [128.782834, 35.466868],
            [128.780282, 35.468931],
            [128.767829, 35.468914],
            [128.75684, 35.474505],
            [128.760006, 35.476792],
            [128.764424, 35.485343],
            [128.770225, 35.481091],
            [128.780892, 35.483359],
            [128.781997, 35.481956],
            [128.792752, 35.485766],
            [128.796795, 35.482]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "BASE_DATE": "20230701",
        "ADM_NM": "가곡면",
        "ADM_CD": "32070350",
        "provinceCode": 32,
        "provinceName": "강원특별자치도",
        "districtCode": "070",
        "districtName": "삼척시",
        "townCode": "350",
        "townName": "가곡면",
        "code": "32070350"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [129.182561, 37.202145],
            [129.190173, 37.198119],
            [129.193249, 37.191528],
            [129.198483, 37.186729],
            [129.210437, 37.187408],
            [129.213875, 37.185347],
            [129.219458, 37.186998],
            [129.222436, 37.186247],
            [129.228608, 37.173104],
            [129.227882, 37.170512],
            [129.224768, 37.168864],
            [129.22422, 37.160911]
          ]
        ]
      }
    }
  ]
}
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
