import React from 'react';
import { Polygon, Marker, Polyline } from 'react-native-maps';
import uuid from 'uuid';

const makeOverlays = (features: any) => {
  const points = features
    .filter(
      (f: any) =>
        f.geometry &&
        (f.geometry.type === 'Point' || f.geometry.type === 'MultiPoint')
    )
    .map((feature: any) =>
      makeCoordinates(feature).map((coordinates: any) =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, [])
    .map((overlay: any) => ({ ...overlay, type: 'point' }));

  const lines = features
    .filter(
      (f: any) =>
        f.geometry &&
        (f.geometry.type === 'LineString' ||
          f.geometry.type === 'MultiLineString')
    )
    .map((feature: any) =>
      makeCoordinates(feature).map((coordinates: any) =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, [])
    .map((overlay: any) => ({ ...overlay, type: 'polyline' }));

  const multipolygons = features
    .filter((f: any) => f.geometry && f.geometry.type === 'MultiPolygon')
    .map((feature: any) =>
      makeCoordinates(feature).map((coordinates: any) =>
        makeOverlay(coordinates, feature)
      )
    )
    .reduce(flatten, []);

  const polygons = features
    .filter((f: any) => f.geometry && f.geometry.type === 'Polygon')
    .map((feature: any) => makeOverlay(makeCoordinates(feature), feature))
    .reduce(flatten, [])
    .concat(multipolygons)
    .map((overlay: any) => ({ ...overlay, type: 'polygon' }));

  return points.concat(lines).concat(polygons);
};

const flatten = (prev: any, curr: any) => prev.concat(curr);

const makeOverlay = (coordinates: any, feature: any) => {
  let overlay: any = {
    feature,
    id: feature.id ? feature.id : uuid()
  };
  if (
    feature.geometry.type === 'Polygon' ||
    feature.geometry.type === 'MultiPolygon'
  ) {
    overlay.coordinates = coordinates[0];
    if (coordinates.length > 1) {
      overlay.holes = coordinates.slice(1);
    }
  } else {
    overlay.coordinates = coordinates;
  }
  return overlay;
};

const makePoint = (c: any) => ({ latitude: c[1], longitude: c[0] });

const makeLine = (l: any) => l.map(makePoint);

const makeCoordinates = (feature: any) => {
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
    case 'Polygon':
      coordinates = [makePoint(g.coordinates)];
      break;
    case 'MultiPolygon':
      coordinates = g.coordinates.map((p: any) => p.map(makeLine));
      break;
    default:
      coordinates = [];
      break;
  }

  return coordinates;
};

const Geojson = (props: any) => {
  const overlays = makeOverlays(props.geojson.features);
  return (
    <>
      {overlays.map((overlay: any) => {
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
