// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as VariantsAPI from './variants';
import { Variants } from './variants';

export class Logos extends APIResource {
  variants: VariantsAPI.Variants = new VariantsAPI.Variants(this._client);
}

Logos.Variants = Variants;

export declare namespace Logos {
  export { Variants as Variants };
}
