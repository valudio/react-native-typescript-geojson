import React from 'react';
import TestRenderer from 'react-test-renderer';
import { FeatureCollection } from 'geojson';

import Geojson from '..';
import { makePoint } from '../helpers';

test('Geojson with a valid geojson should render the components', () => {
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

  const geoJson = TestRenderer.create(<Geojson geojson={alcatraz} />).toJSON();

  expect(geoJson).toMatchSnapshot();
});

test('should put the pin in the correct coordinates', () => {
  const coordinates = [-122.42305755615234, 37.82687023785448];

  const alcatraz: FeatureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates
        }
      }
    ]
  };

  const geoJson = TestRenderer.create(<Geojson geojson={alcatraz} />).toJSON();

  expect(geoJson).toMatchSnapshot();
  expect(geoJson.props['coordinate']).not.toBeUndefined();
  expect(geoJson.props['coordinate']).toStrictEqual(makePoint(coordinates));
});

test('should change the pin color if prop is provided', () => {
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

  const geoJson = TestRenderer.create(
    <Geojson geojson={alcatraz} pinColor="#1ABA85" />
  ).toJSON();

  expect(geoJson).toMatchSnapshot();
  expect(geoJson.props['pinColor']).not.toBeUndefined();
  expect(geoJson.props['pinColor']).toBe('#1ABA85');
});
