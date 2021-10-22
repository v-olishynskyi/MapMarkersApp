import { MarkerModel } from '../models/MarkerModel';
import { UserModel } from '../models/UserModel';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const loremArray = lorem.split(' ');
const randomWord =
  loremArray[Math.floor(Math.random() * (loremArray.length + 1))];

const getRandomWord = () => randomWord;
const getRandomLabel = () =>
  loremArray
    .slice(0, Math.floor(Math.random() * (loremArray.length + 1)))
    .join(' ');

function getRandomLatitude(min = 48, max = 56) {
  return Math.random() * (max - min) + min;
}

function getRandomLongitude(min = 14, max = 24) {
  return Math.random() * (max - min) + min;
}

const getRandomNumber = () => Math.random();

export const markers: Array<MarkerModel> = [
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
  {
    id: getRandomNumber().toString(),
    author: new UserModel({
      email: `${getRandomWord()}@email.com`,
      name: getRandomWord(),
      family_name: getRandomWord(),
      avatar: 'https://picsum.photos/200/300',
    }),
    description: getRandomLabel(),
    name: getRandomWord(),
    latitude: getRandomLatitude(),
    longitude: getRandomLongitude(),
  },
];
