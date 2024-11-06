// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../resource';
import * as Core from '../../../../../core';
import * as PayoutAPI from '../payout';

export class Balances extends APIResource {
  /**
   * Get seller balance per currency
   */
  retrieve(
    aid: string,
    payoutDestinationId: string,
    options?: Core.RequestOptions,
  ): Core.APIPromise<BalanceRetrieveResponse> {
    return this._client.get(
      `/v2/accounts/${aid}/payout/payout-destinations/${payoutDestinationId}/balances`,
      options,
    );
  }
}

export interface BalanceRetrieveResponse {
  payout_destination_balances?: PayoutAPI.PayoutDestinationBalances;
}

export declare namespace Balances {
  export { type BalanceRetrieveResponse as BalanceRetrieveResponse };
}
