import { Position } from 'geojson';

import { IOverlay } from './models';

const flatten = (prev: Array<IOverlay>, curr: Array<IOverlay>) =>
  prev.concat(curr);

const makePoint = (c: Position) => ({ latitude: c[1], longitude: c[0] });

const makeLine = (l: any) => l.map(makePoint);

export { flatten, makePoint, makeLine };
