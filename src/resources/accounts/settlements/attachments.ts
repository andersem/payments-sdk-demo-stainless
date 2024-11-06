// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as Core from '../../../core';

export class Attachments extends APIResource {
  /**
   * Download a settlement attachment
   *
   * _scopes_:
   *
   * - admin:billing
   * - read:billing
   * - admin:reports
   * - read:reports
   * - admin:settlements
   * - read:settlements
   */
  retrieve(
    aid: string,
    settlementid: string,
    attachmentid: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<string> {
    return this._client.get(`/accounts/${aid}/settlements/${settlementid}/attachments/${attachmentid}`, {
      ...options,
      headers: { Accept: 'application/json', ...options?.headers },
    });
  }
}

export type AttachmentRetrieveResponse = Core.Uploadable;

export declare namespace Attachments {
  export { type AttachmentRetrieveResponse as AttachmentRetrieveResponse };
}
