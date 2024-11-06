// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import SpecPayments from 'spec-payments-stainless-demo';
import { Response } from 'node-fetch';

const client = new SpecPayments({
  accessToken: 'My Access Token',
  apiKey: 'My API Key',
  adminKey: 'My Admin Key',
  clientId: 'My Client ID',
  clientSecret: 'My Client Secret',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource payout', () => {
  test('fundTransfer: only required params', async () => {
    const responsePromise = client.v2.accounts.payout.fundTransfer('xxxxxxxxx', {
      amount: 1,
      currency: 'currency',
      destination_payout_destination_id: 'destination_payout_destination_id',
      fund_transfer_id: 'fund_transfer_id',
      reference: 'reference',
      source_payout_destination_id: 'source_payout_destination_id',
      type: 'payout-destination',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('fundTransfer: required and optional params', async () => {
    const response = await client.v2.accounts.payout.fundTransfer('xxxxxxxxx', {
      amount: 1,
      currency: 'currency',
      destination_payout_destination_id: 'destination_payout_destination_id',
      fund_transfer_id: 'fund_transfer_id',
      reference: 'reference',
      source_payout_destination_id: 'source_payout_destination_id',
      type: 'payout-destination',
    });
  });
});
