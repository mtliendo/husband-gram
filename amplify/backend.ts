import { sendMMS } from './functions/sendMMS/resource'
import { FunctionUrlAuthType, HttpMethod } from 'aws-cdk-lib/aws-lambda'
import { husbandToBookify } from './functions/husband-to-bookify/resource'
import { defineBackend } from '@aws-amplify/backend'
import { PolicyStatement } from 'aws-cdk-lib/aws-iam'
import { textToSpeech } from './functions/text-to-speech/resource'
import { auth } from './auth/resource'
import { storage } from './storage/resource'
import { husbandAudioTrigger } from './functions/husband-audio-trigger/resource'
import {
	AppSyncAuthorizationType,
	ChannelNamespace,
	EventApi,
} from 'aws-cdk-lib/aws-appsync'

const backend = defineBackend({
	auth,
	storage,
	husbandToBookify,
	textToSpeech,
	husbandAudioTrigger,
	sendMMS,
})

// create a websocket api
const audioEventAPI = new EventApi(backend.stack, 'audioEventAPI', {
	apiName: 'audioEventAPI',
	authorizationConfig: {
		authProviders: [
			{ authorizationType: AppSyncAuthorizationType.API_KEY },
			{ authorizationType: AppSyncAuthorizationType.IAM },
		],
	},
})

audioEventAPI.grantPublish(backend.husbandAudioTrigger.resources.lambda)

// create a channel namespace
new ChannelNamespace(backend.stack, 'audioChannel', {
	channelNamespaceName: 'husbandAudioChannel',
	api: audioEventAPI,
})

// add a policy statement to the husbandToBookify lambda function
backend.husbandToBookify.resources.lambda.addToRolePolicy(
	new PolicyStatement({
		actions: ['bedrock:InvokeModel'],
		resources: [
			'arn:aws:bedrock:*::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
		],
	})
)

// add function urls to lambda functions
const husbandToBookifyFurl =
	backend.husbandToBookify.resources.lambda.addFunctionUrl({
		authType: FunctionUrlAuthType.NONE,
		cors: {
			allowedOrigins: ['*'],
			allowedMethods: [HttpMethod.ALL],
			allowedHeaders: ['*'],
		},
	})

const textToSpeechUrl = backend.textToSpeech.resources.lambda.addFunctionUrl({
	authType: FunctionUrlAuthType.NONE,
	cors: {
		allowedOrigins: ['*'],
		allowedMethods: [HttpMethod.ALL],
		allowedHeaders: ['*'],
	},
})
const sendMMSUrl = backend.sendMMS.resources.lambda.addFunctionUrl({
	authType: FunctionUrlAuthType.NONE,
	cors: {
		allowedOrigins: ['*'],
		allowedMethods: [HttpMethod.ALL],
		allowedHeaders: ['*'],
	},
})

backend.husbandAudioTrigger.addEnvironment(
	'EVENT_API_URL',
	`https://${audioEventAPI.httpDns}/event`
)

backend.husbandAudioTrigger.addEnvironment(
	'EVENT_API_REGION',
	backend.stack.region
)
backend.husbandAudioTrigger.addEnvironment(
	'EVENT_API_NAMESPACE',
	'husbandAudioChannel'
)

// add outputs to the backend to frontend
backend.addOutput({
	custom: {
		husbandToBookifyUrl: husbandToBookifyFurl.url,
		textToSpeechUrl: textToSpeechUrl.url,
		sendMMSUrl: sendMMSUrl.url,
		events: {
			url: `https://${audioEventAPI.httpDns}/event`,
			api_key: audioEventAPI.apiKeys['Default'].attrApiKey,
			aws_region: backend.stack.region,
			default_authorization_type: AppSyncAuthorizationType.API_KEY,
		},
	},
})
