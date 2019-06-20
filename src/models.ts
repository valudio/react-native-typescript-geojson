import {
  FeatureCollection,
  Feature,
  Geometry,
  GeoJsonProperties
} from 'geojson';

interface IProps {
  geojson: FeatureCollection;
  pinColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}

interface IOverlay {
  feature: Feature<Geometry, GeoJsonProperties>;
  id: string | number;
  type?: string;
  coordinates?: any;
  holes?: any;
}

export { IProps, IOverlay };
