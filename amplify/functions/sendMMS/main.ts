import twilio from 'twilio'
import { env } from '$amplify/env/sendMMS'
import { twilioSID, twilioPhoneNumber, myNumber } from './utils'

export const handler = async (event: { body: string }) => {
	const { mp3Url } = JSON.parse(event.body)
	const twilioClient = twilio(twilioSID, env.TWILIO_API_KEY)

	const messageBody = `Your husband has a question for you!`

	try {
		const message = await twilioClient.messages.create({
			body: messageBody,
			from: twilioPhoneNumber,
			to: myNumber,
			mediaUrl: mp3Url,
		})

		return {
			message: 'MMS sent successfully',
			messageId: message.sid,
		}
	} catch (error) {
		console.error(error)
		return {
			message: 'Error sending MMS',
		}
	}
}
