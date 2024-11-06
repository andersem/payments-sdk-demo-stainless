// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as SettingsAPI from './settings/settings';
import { Settings } from './settings/settings';

export class Management extends APIResource {
  settings: SettingsAPI.Settings = new SettingsAPI.Settings(this._client);
}

Management.Settings = Settings;

export declare namespace Management {
  export { Settings as Settings };
}
