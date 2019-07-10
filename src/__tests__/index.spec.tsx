import React from 'react';
import TestRenderer from 'react-test-renderer';
import { FeatureCollection } from 'geojson';

import Geojson from '..';

test('makePoint should return point object', () => {
  const alcatraz: FeatureCollection = {
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

  const mapView = TestRenderer.create(<Geojson geojson={alcatraz} />).toJSON();

  expect(mapView).toMatchSnapshot();
});
