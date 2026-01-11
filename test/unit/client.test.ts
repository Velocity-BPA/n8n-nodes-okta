/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { handleRateLimit } from '../../nodes/Okta/transport/client';

describe('Okta Client', () => {
	describe('handleRateLimit', () => {
		it('should execute function successfully without rate limiting', async () => {
			const mockFn = jest.fn().mockResolvedValue({ success: true });
			const result = await handleRateLimit(mockFn);
			expect(result).toEqual({ success: true });
			expect(mockFn).toHaveBeenCalledTimes(1);
		});

		it('should retry on 429 error', async () => {
			const error = {
				response: {
					statusCode: 429,
					headers: {
						'x-rate-limit-reset': String(Math.floor(Date.now() / 1000) + 1),
					},
				},
			};
			const mockFn = jest
				.fn()
				.mockRejectedValueOnce(error)
				.mockResolvedValueOnce({ success: true });

			const result = await handleRateLimit(mockFn, 3, 100);
			expect(result).toEqual({ success: true });
			expect(mockFn).toHaveBeenCalledTimes(2);
		}, 10000);

		it('should throw original error after max retries on 429', async () => {
			const error = {
				response: {
					statusCode: 429,
					headers: {
						'x-rate-limit-reset': String(Math.floor(Date.now() / 1000) + 1),
					},
				},
			};
			const mockFn = jest.fn().mockRejectedValue(error);

			// With maxRetries=3, it will retry twice then throw the original error
			await expect(handleRateLimit(mockFn, 3, 100)).rejects.toEqual(error);
			expect(mockFn).toHaveBeenCalledTimes(3);
		}, 10000);

		it('should throw immediately on non-429 errors', async () => {
			const error = {
				response: {
					statusCode: 500,
				},
				message: 'Internal Server Error',
			};
			const mockFn = jest.fn().mockRejectedValue(error);

			await expect(handleRateLimit(mockFn)).rejects.toEqual(error);
			expect(mockFn).toHaveBeenCalledTimes(1);
		});
	});
});
