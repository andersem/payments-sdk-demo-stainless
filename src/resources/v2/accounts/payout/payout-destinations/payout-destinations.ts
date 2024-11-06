// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../resource';
import * as BalancesAPI from './balances';
import { BalanceRetrieveResponse, Balances } from './balances';
import * as TransfersAPI from './transfers';
import { TransferListParams, TransferListResponse, Transfers } from './transfers';

export class PayoutDestinations extends APIResource {
  balances: BalancesAPI.Balances = new BalancesAPI.Balances(this._client);
  transfers: TransfersAPI.Transfers = new TransfersAPI.Transfers(this._client);
}

PayoutDestinations.Balances = Balances;
PayoutDestinations.Transfers = Transfers;

export declare namespace PayoutDestinations {
  export { Balances as Balances, type BalanceRetrieveResponse as BalanceRetrieveResponse };

  export {
    Transfers as Transfers,
    type TransferListResponse as TransferListResponse,
    type TransferListParams as TransferListParams,
  };
}
