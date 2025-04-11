import { env } from '$amplify/env/text-to-speech'
import { Handler } from 'aws-cdk-lib/aws-lambda'
import { ElevenLabsClient } from 'elevenlabs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'crypto'

const s3 = new S3Client()

const elevenlabs = new ElevenLabsClient({
	apiKey: env.ELEVEN_LABS_API_KEY,
})

export const getAudioStream = async (text: string) => {
	const audio = await elevenlabs.textToSpeech.convert('JBFqnCBsd6RMkjVDRZzb', {
		model_id: 'eleven_multilingual_v2',
		text,
		output_format: 'mp3_44100_128',
		voice_settings: {
			stability: 0.95,
			similarity_boost: 0.75,
			style: 0.06,
			use_speaker_boost: true,
			speed: 1.0,
		},
	})
	return audio
}

export const handler: Handler = async (event: { body: string }) => {
	const { text } = JSON.parse(event.body)
	try {
		const audioStream = await getAudioStream(text)
		const chunks = []
		for await (const chunk of audioStream) {
			chunks.push(chunk)
		}
		const audioBuffer = Buffer.concat(chunks)

		await s3.send(
			new PutObjectCommand({
				Bucket: env.BOOK_FILES_BUCKET_NAME,
				Key: `book-audio/${crypto.randomUUID()}.mp3`,
				Body: audioBuffer,
				ContentType: 'audio/mpeg',
			})
		)
		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: 'Audio generated successfully',
			}),
		}
	} catch (error) {
		console.error('Error:', error)
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to generate audio' }),
		}
	}
}
