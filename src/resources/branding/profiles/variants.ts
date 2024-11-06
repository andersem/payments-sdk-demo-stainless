// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class Variants extends APIResource {
  /**
   * Endpoint that returns an svg that can be used to show the world your payment
   * options.
   * [Go to the documentation for the checkout branding endpoints.](/docs/checkout-branding)
   */
  retrieve(
    profileId: string,
    variant: 'colors' | 'mono',
    color: string,
    width: string,
    template: 'dintero_top_frame.svg' | 'logos.svg',
    options?: Core.RequestOptions,
  ): Core.APIPromise<void> {
    return this._client.get(
      `/branding/profiles/${profileId}/variant/${variant}/color/${color}/width/${width}/${template}`,
      { ...options, headers: { Accept: '*/*', ...options?.headers } },
    );
  }
}
