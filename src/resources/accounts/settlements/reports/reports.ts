// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../../resource';
import * as ConfigurationAPI from './configuration';
import {
  Configuration,
  ConfigurationCreateParams,
  ConfigurationUpdateParams,
  SettlementReportConfigItem,
  SettlementReportConfigResponse,
} from './configuration';

export class Reports extends APIResource {
  configuration: ConfigurationAPI.Configuration = new ConfigurationAPI.Configuration(this._client);
}

Reports.Configuration = Configuration;

export declare namespace Reports {
  export {
    Configuration as Configuration,
    type SettlementReportConfigItem as SettlementReportConfigItem,
    type SettlementReportConfigResponse as SettlementReportConfigResponse,
    type ConfigurationCreateParams as ConfigurationCreateParams,
    type ConfigurationUpdateParams as ConfigurationUpdateParams,
  };
}
