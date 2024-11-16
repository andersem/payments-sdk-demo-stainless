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

describe('resource sessionURLCallback', () => {
  test('create: only required params', async () => {
    const responsePromise = client.examples.sessionURLCallback.create({
      includes: 'includes',
      query_merchant_reference: 'merchant_reference',
      method: 'method',
      time: '2019-12-27T18:11:19.117Z',
      transaction_id: 'transaction_id',
      amount: 72200,
      currency: 'NOK',
      payment_product: 'bambora',
      payment_product_type: 'bambora.creditcard',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: only required params', async () => {
    const responsePromise = client.examples.sessionURLCallback.retrieve({
      merchant_reference: 'merchant_reference',
      time: '2019-12-27T18:11:19.117Z',
      transaction_id: 'transaction_id',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: required and optional params', async () => {
    const response = await client.examples.sessionURLCallback.retrieve({
      merchant_reference: 'merchant_reference',
      time: '2019-12-27T18:11:19.117Z',
      transaction_id: 'transaction_id',
      delay_callback: 0,
      error: 'error',
      event: 'event',
      event_id: 'event_id',
      method: 'method',
      report_error: true,
      report_event: 'report_event',
      session_id: 'session_id',
      sid: 'sid',
      'Dintero-Signature': 'Dintero-Signature',
    });
  });
});
