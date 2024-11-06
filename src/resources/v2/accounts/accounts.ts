// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as PayoutAPI from './payout/payout';
import {
  FundTransfer,
  Payout,
  PayoutDestinationBalances,
  PayoutDestinationTransfers,
  PayoutFundTransferParams,
  PayoutFundTransferResponse,
} from './payout/payout';

export class Accounts extends APIResource {
  payout: PayoutAPI.Payout = new PayoutAPI.Payout(this._client);
}

Accounts.Payout = Payout;

export declare namespace Accounts {
  export {
    Payout as Payout,
    type FundTransfer as FundTransfer,
    type PayoutDestinationBalances as PayoutDestinationBalances,
    type PayoutDestinationTransfers as PayoutDestinationTransfers,
    type PayoutFundTransferResponse as PayoutFundTransferResponse,
    type PayoutFundTransferParams as PayoutFundTransferParams,
  };
}
