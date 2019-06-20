import React from 'react';
import { Polygon, Marker, Polyline } from 'react-native-maps';
import { Feature, Position } from 'geojson';
import uuid from 'uuid';

import { IProps, IOverlay } from './models';
import { flatten, makePoint, makeLine } from './helpers';

const makeOverlays = (features: Feature[]): IOverlay[] => {
  const points = features
    .filter(
      f =>
        f.geometry &&
        (f.geometry.type === 'Point' || f.geometry.type === 'MultiPoint')
    )
    .map(feature =>
      makeCoordinates(feature).map(coordinates =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, [])
    .map(overlay => ({ ...overlay, type: 'point' }));

  const lines = features
    .filter(
      f =>
        f.geometry &&
        (f.geometry.type === 'LineString' ||
          f.geometry.type === 'MultiLineString')
    )
    .map(feature =>
      makeCoordinates(feature).map(coordinates =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, [])
    .map(overlay => ({ ...overlay, type: 'polyline' }));

  const multipolygons = features
    .filter(f => f.geometry && f.geometry.type === 'MultiPolygon')
    .map(feature =>
      makeCoordinates(feature).map(coordinates =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, []);

  const polygons = features
    .filter(f => f.geometry && f.geometry.type === 'Polygon')
    .map(feature => makeOverlay(makeCoordinates(feature), feature))
    .concat(multipolygons)
    .map(overlay => ({ ...overlay, type: 'polygon' }));

  return points.concat(lines).concat(polygons);
};

const makeOverlay = (coordinates: Position, feature: Feature): IOverlay => {
  let overlay = {
    feature,
    id: feature.id ? feature.id : uuid()
  };

  if (
    feature.geometry.type === 'Polygon' ||
    feature.geometry.type === 'MultiPolygon'
  ) {
    if (coordinates.length > 1)
      return {
        ...overlay,
        coordinates: coordinates[0],
        holes: coordinates.slice(1)
      };

    return {
      ...overlay,
      coordinates: coordinates[0]
    };
  }

  return {
    ...overlay,
    coordinates
  };
};

const makeCoordinates = (feature: Feature) => {
  const g = feature.geometry;
  let coordinates;

  switch (g.type) {
    case 'Point':
      coordinates = [makePoint(g.coordinates)];
      break;
    case 'MultiPoint':
      coordinates = g.coordinates.map(makePoint);
      break;
    case 'LineString':
      coordinates = [makeLine(g.coordinates)];
      break;
    case 'MultiLineString':
    case 'Polygon':
      coordinates = g.coordinates.map(makeLine);
      break;
    case 'MultiPolygon':
      coordinates = g.coordinates.map(p => p.map(makeLine));
      break;
    default:
      coordinates = [];
      break;
  }

  return coordinates;
};

const Geojson = (props: IProps) => {
  const overlays = makeOverlays(props.geojson.features);

  return (
    <>
      {overlays.map(overlay => {
        if (overlay.type === 'point') {
          return (
            <Marker
              key={overlay.id}
              coordinate={overlay.coordinates}
              pinColor={props.pinColor}
            />
          );
        }
        if (overlay.type === 'polygon') {
          return (
            <Polygon
              key={overlay.id}
              coordinates={overlay.coordinates}
              holes={overlay.holes}
              strokeColor={props.strokeColor}
              fillColor={props.fillColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
        if (overlay.type === 'polyline') {
          return (
            <Polyline
              key={overlay.id}
              coordinates={overlay.coordinates}
              strokeColor={props.strokeColor}
              strokeWidth={props.strokeWidth}
            />
          );
        }
      })}
    </>
  );
};

export { Geojson as default, makeOverlays };
