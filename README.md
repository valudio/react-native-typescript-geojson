# typescript-react-native-geojson

Typescript version of: [react-native-geojson](https://github.com/frankrowe/react-native-geojson) A fast way to add geojson to react-native-maps. with some steroids and utils

### Install:

`npm install typescript-react-native-geojson`

`yarn add typescript-react-native-geojson`

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

### TODOs:

- [ ] Testing
- [ ] Refactor
- [ ] Accept more props
- [ ] Better examples
