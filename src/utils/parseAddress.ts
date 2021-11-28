import { GeocoderResponse } from '../types';

type ExcludeAddressTypes = Array<
  | 'street_number'
  | 'route'
  | 'sublocality'
  | 'locality'
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'country'
>;

export function parseAddress(
  geocoderJson: GeocoderResponse,
  excludeTypes?: ExcludeAddressTypes = [],
) {
  let address = '';
  const { results } = geocoderJson;
  const street_number = !excludeTypes.includes('street_number')
    ? results
        .find(item => item.types.includes('street_address'))
        ?.address_components.find(item => item.types.includes('street_number'))
        ?.long_name || ''
    : '';
  const route = !excludeTypes.includes('route')
    ? results
        .find(item => item.types.includes('route'))
        ?.address_components.find(item => item.types.includes('route'))
        ?.long_name || ''
    : '';
  const sublocality = !excludeTypes.includes('sublocality')
    ? results
        .find(item => item.types.includes('sublocality'))
        ?.address_components.find(item => item.types.includes('sublocality'))
        ?.long_name || ''
    : '';
  const locality = !excludeTypes.includes('locality')
    ? results
        .find(item => item.types.includes('locality'))
        ?.address_components.find(item => item.types.includes('locality'))
        ?.long_name || ''
    : '';
  const administrative_area_level_1 = !excludeTypes.includes(
    'administrative_area_level_1',
  )
    ? results
        .find(item => item.types.includes('administrative_area_level_1'))
        ?.address_components.find(item =>
          item.types.includes('administrative_area_level_1'),
        )?.long_name || ''
    : '';
  const administrative_area_level_2 = !excludeTypes.includes(
    'administrative_area_level_2',
  )
    ? results
        .find(item => item.types.includes('administrative_area_level_2'))
        ?.address_components.find(item =>
          item.types.includes('administrative_area_level_2'),
        )?.long_name || ''
    : '';
  const country = !excludeTypes.includes('country')
    ? results
        .find(item => item.types.includes('country'))
        ?.address_components.find(item => item.types.includes('country'))
        ?.long_name || ''
    : '';

  const street_number_string = street_number ? `${street_number}, ` : '';
  const route_string = route ? `${route}, ` : '';
  const sublocality_string = sublocality
    ? `${sublocality}, `
    : administrative_area_level_2
    ? `${administrative_area_level_2}, `
    : '';
  const locality_string = locality
    ? `${locality}, `
    : administrative_area_level_1
    ? `${administrative_area_level_1}, `
    : '';
  const administrative_area_level_1_string = administrative_area_level_1
    ? `${administrative_area_level_1}, `
    : '';
  const administrative_area_level_2_string = administrative_area_level_2
    ? `${administrative_area_level_2}, `
    : '';
  const country_string = country ? `${country}` : '';

  address = `${route_string}${street_number_string}${sublocality_string}${locality_string}${country_string}`;

  return address;
}
