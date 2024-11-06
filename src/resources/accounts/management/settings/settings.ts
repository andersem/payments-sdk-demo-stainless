// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import * as ApprovalsAPI from './approvals/approvals';
import { Approvals } from './approvals/approvals';

export class Settings extends APIResource {
  approvals: ApprovalsAPI.Approvals = new ApprovalsAPI.Approvals(this._client);
}

Settings.Approvals = Approvals;

export declare namespace Settings {
  export { Approvals as Approvals };
}
