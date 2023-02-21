import { CustomMarker } from '../components/map';
function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}

export const _generateMarkers = (count: number) => {
  const _markers = [];

  for (let i = 0; i < count; i++) {
    _markers.push(
      <CustomMarker
        key={i}
        coordinate={{
          latitude: getRandomLatitude(),
          longitude: getRandomLongitude(),
        }}
        title={`Title ${i}`}
        description={`Description marker ${i} - ${
          getRandomLatitude() - getRandomLongitude()
        }`}
      />,
    );
  }

  return _markers;
};
