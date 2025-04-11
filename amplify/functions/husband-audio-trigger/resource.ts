import { defineFunction } from '@aws-amplify/backend'

export const husbandAudioTrigger = defineFunction({
	name: 'husband-audio-trigger',
	resourceGroupName: 'storage',
	entry: './main.ts',
	memoryMB: 1024,
	timeoutSeconds: 30,
})
