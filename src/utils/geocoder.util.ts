import { Injectable } from '@nestjs/common';
import { Geocoder } from 'node-geocoder';

// eslint-disable-next-line
const NodeGeocoder = require('node-geocoder');

@Injectable()
export class GeocoderService {
  static get geocoder(): Geocoder {
    return NodeGeocoder({
      provider: 'mapquest',
      httpAdapter: 'https',
      apiKey: process.env.GEOCODER_API_KEY,
      formatter: null,
    });
  }
}
