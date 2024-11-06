// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../../resource';
import * as PayoutDestinationsAPI from './payout-destinations';
import {
  ApprovalsPayoutDestinationResponse,
  PayoutDestinationCreateParams,
  PayoutDestinationListParams,
  PayoutDestinationListResponse,
  PayoutDestinations,
} from './payout-destinations';

export class Approvals extends APIResource {
  payoutDestinations: PayoutDestinationsAPI.PayoutDestinations = new PayoutDestinationsAPI.PayoutDestinations(
    this._client,
  );
}

Approvals.PayoutDestinations = PayoutDestinations;

export declare namespace Approvals {
  export {
    PayoutDestinations as PayoutDestinations,
    type ApprovalsPayoutDestinationResponse as ApprovalsPayoutDestinationResponse,
    type PayoutDestinationListResponse as PayoutDestinationListResponse,
    type PayoutDestinationCreateParams as PayoutDestinationCreateParams,
    type PayoutDestinationListParams as PayoutDestinationListParams,
  };
}
