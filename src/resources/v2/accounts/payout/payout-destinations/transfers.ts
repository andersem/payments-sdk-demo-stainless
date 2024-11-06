// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../resource';
import { isRequestOptions } from '../../../../../core';
import * as Core from '../../../../../core';
import * as PayoutAPI from '../payout';

export class Transfers extends APIResource {
  /**
   * Get list of transfers for a seller
   */
  list(
    aid: string,
    payoutDestinationId: string,
    query?: TransferListParams,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransferListResponse>;
  list(
    aid: string,
    payoutDestinationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransferListResponse>;
  list(
    aid: string,
    payoutDestinationId: string,
    query: TransferListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<TransferListResponse> {
    if (isRequestOptions(query)) {
      return this.list(aid, payoutDestinationId, {}, query);
    }
    return this._client.get(
      `/v2/accounts/${aid}/payout/payout-destinations/${payoutDestinationId}/transfers`,
      { query, ...options },
    );
  }
}

export interface TransferListResponse {
  entries?: PayoutAPI.PayoutDestinationTransfers;

  next_page_token?: string;
}

export interface TransferListParams {
  /**
   * Filter by currency
   */
  currency?: string;

  /**
   * A limit on the number of objects to be returned. Limit can range between 1 and
   * 1000 items, and the default is 10 items.
   */
  limit?: number;

  /**
   * The page (as defined by the next_page_token in the api response)
   */
  page?: string;
}

export declare namespace Transfers {
  export { type TransferListResponse as TransferListResponse, type TransferListParams as TransferListParams };
}
