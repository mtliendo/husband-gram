import { defineFunction, secret } from '@aws-amplify/backend'

export const textToSpeech = defineFunction({
	name: 'text-to-speech',
	entry: './main.ts',
	memoryMB: 1024,
	timeoutSeconds: 30,
	environment: {
		ELEVEN_LABS_API_KEY: secret('ELEVEN_LABS_API_KEY'),
	},
})
