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

describe('resource variants', () => {
  test('retrieve', async () => {
    const responsePromise = client.branding.logos.variants.retrieve(
      'logos',
      'colors',
      'color',
      'width',
      'dintero_top_frame.svg',
    );
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  test('retrieve: request options instead of params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.branding.logos.variants.retrieve('logos', 'colors', 'color', 'width', 'dintero_top_frame.svg', {
        path: '/_stainless_unknown_path',
      }),
    ).rejects.toThrow(SpecPayments.NotFoundError);
  });
});
