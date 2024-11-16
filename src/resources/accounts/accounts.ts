// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AuthAPI from './auth';
import { AccessToken, Auth, AuthTokenParams } from './auth';
import * as ManagementAPI from './management/management';
import { Management } from './management/management';
import * as ReportsAPI from './reports/reports';
import { Reports } from './reports/reports';
import * as SettlementsAPI from './settlements/settlements';
import { SettlementListParams, SettlementResponse, Settlements } from './settlements/settlements';

export class Accounts extends APIResource {
  settlements: SettlementsAPI.Settlements = new SettlementsAPI.Settlements(this._client);
  reports: ReportsAPI.Reports = new ReportsAPI.Reports(this._client);
  auth: AuthAPI.Auth = new AuthAPI.Auth(this._client);
  management: ManagementAPI.Management = new ManagementAPI.Management(this._client);
}

Accounts.Settlements = Settlements;
Accounts.Reports = Reports;
Accounts.Auth = Auth;
Accounts.Management = Management;

export declare namespace Accounts {
  export {
    Settlements as Settlements,
    type SettlementResponse as SettlementResponse,
    type SettlementListParams as SettlementListParams,
  };

  export { Reports as Reports };

  export { Auth as Auth, type AccessToken as AccessToken, type AuthTokenParams as AuthTokenParams };

  export { Management as Management };
}
