/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequestAllItems } from '../../transport/client';

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};
	if (filters.since) {query.since = filters.since;}
	if (filters.until) {query.until = filters.until;}
	if (filters.filter) {query.filter = filters.filter;}
	if (filters.q) {query.q = filters.q;}
	if (filters.sortOrder) {query.sortOrder = filters.sortOrder;}
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/logs', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function search(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const filter = this.getNodeParameter('searchFilter', i) as string;
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const additionalFilters = this.getNodeParameter('additionalFilters', i) as IDataObject;
	const query: IDataObject = { filter };
	if (additionalFilters.since) {query.since = additionalFilters.since;}
	if (additionalFilters.until) {query.until = additionalFilters.until;}
	if (additionalFilters.q) {query.q = additionalFilters.q;}
	if (additionalFilters.sortOrder) {query.sortOrder = additionalFilters.sortOrder;}
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/logs', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}
