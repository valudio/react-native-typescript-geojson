import { FeatureCollection } from 'geojson';

export interface IProps {
  geojson: FeatureCollection;
  pinColor?: string;
  strokeWidth?: number;
  strokeColor?: string;
  fillColor?: string;
}
