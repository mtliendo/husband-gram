import type { Handler } from 'aws-lambda'
import { env } from '$amplify/env/husband-to-bookify'
import {
	BedrockRuntimeClient,
	ContentBlock,
	ConversationRole,
	ConverseCommand,
} from '@aws-sdk/client-bedrock-runtime'
const client = new BedrockRuntimeClient()

export const handler: Handler = async (event) => {
	console.log('the event', event)
	const { genre, question, isSpicy } = JSON.parse(event.body)

	const prompt = `You specialize in ${genre} literature. 
	Transform this husband's simplequestion into how it would be written in that genre of book. Make sure that the question is still there: "${question}"
	${isSpicy ? 'Make it suggestive.' : 'Keep it family-friendly.'}
	Respond with just the transformed phrase, nothing else.`

	try {
		const input = {
			modelId: env.MODEL_ID,
			system: [
				{
					text: prompt,
				},
			],
			messages: [
				{
					role: 'user' as ConversationRole,
					content: [
						{
							text: question,
						} as ContentBlock.TextMember,
					],
				},
			],
		}
		const command = new ConverseCommand(input)
		const response = await client.send(command)
		console.log('the response', response)

		if (response.output?.message?.content) {
			const msg = response.output.message.content[0].text

			return {
				statusCode: 200,
				body: JSON.stringify({ msg }),
			}
		}
	} catch (error) {
		console.error('Error:', error)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to generate response' }),
		}
	}
}
