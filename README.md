# react-native-typescript-geojson

Typescript version of: [react-native-geojson](https://github.com/frankrowe/react-native-geojson)

Fast way to add geojson to react-native-maps. with some typescript and utils, but still very tiny! less than 8kb!

### Install:

`npm install react-native-typescript-geojson`

`yarn add react-native-typescript-geojson`

### Example:

```js
import React from 'react';
import MapView from 'react-native-maps';
import Geojson from 'react-native-geojson';

const alcatraz = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        coordinates: [-122.42305755615234, 37.82687023785448]
      }
    }
  ]
};

const Map = props => (
  <MapView>
    <Geojson geojson={alcatraz} />
  </MapView>
);
```

### RoadMap:

- [ ] Set up eslint
- [ ] Set up minify
- [ ] Testing
- [ ] Refactor
- [x] Add more typings
- [ ] Accept more props
- [ ] Better examples
