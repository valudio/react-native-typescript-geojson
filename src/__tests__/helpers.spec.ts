import { flatten, makePoint, makeLine } from '../helpers';

test('makePoint should return point object', () => {
  const point = makePoint([0, 1]);

  expect(point).toMatchSnapshot({
    latitude: expect.any(Number),
    longitude: expect.any(Number)
  });
});

test('makeLine should return array point object', () => {
  const line = makeLine([[0, 1], [0, 1]]);

  line.forEach((point: any) => {
    expect(point).toMatchSnapshot({
      latitude: expect.any(Number),
      longitude: expect.any(Number)
    });
  });
});
