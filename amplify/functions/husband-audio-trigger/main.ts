import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { S3Event } from 'aws-lambda'
import { Amplify } from 'aws-amplify'
import { events } from 'aws-amplify/data'
import { env } from '$amplify/env/husband-audio-trigger'
Amplify.configure(
	{
		API: {
			Events: {
				endpoint: env.EVENT_API_URL,
				region: env.EVENT_API_REGION,
				defaultAuthMode: 'iam',
			},
		},
	},
	{
		Auth: {
			credentialsProvider: {
				getCredentialsAndIdentityId: async () => ({
					credentials: {
						accessKeyId: env.AWS_ACCESS_KEY_ID,
						secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
						sessionToken: env.AWS_SESSION_TOKEN,
					},
				}),
				clearCredentialsAndIdentityId: () => {},
			},
		},
	}
)

const s3 = new S3Client()

export const handler = async (event: S3Event) => {
	//get the bucket name and key from the event
	const bucket = event.Records[0].s3.bucket.name
	const key = event.Records[0].s3.object.key
	console.log('Bucket:', bucket)
	console.log('Key:', key)

	//get the file from s3
	const file = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
	console.log('File:', file)

	await events.post(`${env.EVENT_API_NAMESPACE}`, {
		audioFileName: `${bucket}/${key}`,
	})
}
