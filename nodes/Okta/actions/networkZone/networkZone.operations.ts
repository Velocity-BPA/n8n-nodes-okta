/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IExecuteFunctions, INodeExecutionData } from 'n8n-workflow';
import { oktaApiRequest, oktaApiRequestAllItems } from '../../transport/client';

export async function create(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const name = this.getNodeParameter('name', i) as string;
	const type = this.getNodeParameter('zoneType', i) as string;
	const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
	const body: IDataObject = { name, type, status: 'ACTIVE' };

	if (type === 'IP') {
		if (additionalFields.gateways) {
			const gatewayValues = (additionalFields.gateways as string).split(',').map((g) => g.trim());
			body.gateways = gatewayValues.map((value) => ({ type: value.includes('/') ? 'CIDR' : 'RANGE', value }));
		}
		if (additionalFields.proxies) {
			const proxyValues = (additionalFields.proxies as string).split(',').map((p) => p.trim());
			body.proxies = proxyValues.map((value) => ({ type: value.includes('/') ? 'CIDR' : 'RANGE', value }));
		}
	}
	if (type === 'DYNAMIC') {
		if (additionalFields.locations) { try { body.locations = JSON.parse(additionalFields.locations as string); } catch { body.locations = []; } }
		if (additionalFields.asns) {body.asns = (additionalFields.asns as string).split(',').map((a) => a.trim());}
		if (additionalFields.proxyType) {body.proxyType = additionalFields.proxyType;}
	}
	const responseData = await oktaApiRequest.call(this, 'POST', '/zones', body) as IDataObject;
	return [{ json: responseData }];
}

export async function get(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const zoneId = this.getNodeParameter('zoneId', i) as string;
	const responseData = await oktaApiRequest.call(this, 'GET', `/zones/${encodeURIComponent(zoneId)}`) as IDataObject;
	return [{ json: responseData }];
}

export async function getAll(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const returnAll = this.getNodeParameter('returnAll', i) as boolean;
	const filters = this.getNodeParameter('filters', i) as IDataObject;
	const query: IDataObject = {};
	if (filters.filter) {query.filter = filters.filter;}
	const limit = returnAll ? undefined : (this.getNodeParameter('limit', i) as number);
	const responseData = await oktaApiRequestAllItems.call(this, 'GET', '/zones', undefined, query, limit);
	return responseData.map((item) => ({ json: item }));
}

export async function update(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const zoneId = this.getNodeParameter('zoneId', i) as string;
	const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
	const currentZone = await oktaApiRequest.call(this, 'GET', `/zones/${encodeURIComponent(zoneId)}`) as IDataObject;
	const body: IDataObject = { ...currentZone };
	if (updateFields.name) {body.name = updateFields.name;}
	if (updateFields.status) {body.status = updateFields.status;}
	if (updateFields.gateways) {
		const gatewayValues = (updateFields.gateways as string).split(',').map((g) => g.trim());
		body.gateways = gatewayValues.map((value) => ({ type: value.includes('/') ? 'CIDR' : 'RANGE', value }));
	}
	if (updateFields.proxies) {
		const proxyValues = (updateFields.proxies as string).split(',').map((p) => p.trim());
		body.proxies = proxyValues.map((value) => ({ type: value.includes('/') ? 'CIDR' : 'RANGE', value }));
	}
	if (updateFields.locations) { try { body.locations = JSON.parse(updateFields.locations as string); } catch { /* keep existing */ } }
	if (updateFields.asns) {body.asns = (updateFields.asns as string).split(',').map((a) => a.trim());}
	const responseData = await oktaApiRequest.call(this, 'PUT', `/zones/${encodeURIComponent(zoneId)}`, body) as IDataObject;
	return [{ json: responseData }];
}

export async function deleteZone(this: IExecuteFunctions, i: number): Promise<INodeExecutionData[]> {
	const zoneId = this.getNodeParameter('zoneId', i) as string;
	await oktaApiRequest.call(this, 'DELETE', `/zones/${encodeURIComponent(zoneId)}`);
	return [{ json: { success: true, zoneId } }];
}
