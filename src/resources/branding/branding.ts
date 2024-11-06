// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as LogosAPI from './logos/logos';
import { Logos } from './logos/logos';
import * as ProfilesAPI from './profiles/profiles';
import { Profiles } from './profiles/profiles';

export class Branding extends APIResource {
  logos: LogosAPI.Logos = new LogosAPI.Logos(this._client);
  profiles: ProfilesAPI.Profiles = new ProfilesAPI.Profiles(this._client);
}

Branding.Logos = Logos;
Branding.Profiles = Profiles;

export declare namespace Branding {
  export { Logos as Logos };

  export { Profiles as Profiles };
}
