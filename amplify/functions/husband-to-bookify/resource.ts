import { defineFunction } from '@aws-amplify/backend'

export const husbandToBookify = defineFunction({
	name: 'husband-to-bookify',
	entry: './main.ts',
	memoryMB: 1024,
	timeoutSeconds: 30,
	environment: {
		MODEL_ID: 'anthropic.claude-3-sonnet-20240229-v1:0',
	},
})
