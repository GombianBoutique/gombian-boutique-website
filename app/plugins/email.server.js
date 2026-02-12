// plugins/email.server.js
import sgMail from '@sendgrid/mail'

export default defineNuxtPlugin({
  name: 'email',
  async setup() {
    const config = useRuntimeConfig()

    sgMail.setApiKey(config.sendgridApiKey)

    const sendEmail = async (msg) => {
      try {
        await sgMail.send(msg)
        console.log('Email sent successfully')
        return { success: true }
      } catch (error) {
        console.error('Error sending email:', error)

        if (error.response) {
          console.error(error.response.body)
        }

        return { success: false, error: error.message }
      }
    }

    return {
      provide: {
        sendEmail
      }
    }
  }
})