import { defineStorage } from '@aws-amplify/backend'
import { textToSpeech } from '../functions/text-to-speech/resource'
import { husbandAudioTrigger } from '../functions/husband-audio-trigger/resource'

export const storage = defineStorage({
	name: 'book-files',
	access: (allow) => ({
		'book-audio/*': [
			allow.resource(textToSpeech).to(['write']), // additional actions such as "write" and "delete" can be specified depending on your use case
			allow.resource(husbandAudioTrigger).to(['read']), // additional actions such as "write" and "delete" can be specified depending on your use case
			allow.guest.to(['read']),
		],
	}),
	triggers: {
		onUpload: husbandAudioTrigger,
	},
})
