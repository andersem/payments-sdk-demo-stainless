// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../resource';
import * as MetadataAPI from './metadata';
import { Metadata, MetadataListParams, MetadataListResponse, StartingAfter } from './metadata';

export class Reports extends APIResource {
  metadata: MetadataAPI.Metadata = new MetadataAPI.Metadata(this._client);
}

Reports.Metadata = Metadata;

export declare namespace Reports {
  export {
    Metadata as Metadata,
    type StartingAfter as StartingAfter,
    type MetadataListResponse as MetadataListResponse,
    type MetadataListParams as MetadataListParams,
  };
}
