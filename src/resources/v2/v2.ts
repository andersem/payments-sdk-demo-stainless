// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../resource';
import * as AccountsAPI from './accounts/accounts';
import { Accounts } from './accounts/accounts';

export class V2 extends APIResource {
  accounts: AccountsAPI.Accounts = new AccountsAPI.Accounts(this._client);
}

V2.Accounts = Accounts;

export declare namespace V2 {
  export { Accounts as Accounts };
}
