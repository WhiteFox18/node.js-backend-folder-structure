import sgMail from "@sendgrid/mail"
import config from "../config"
import { SendMail } from "../types"
import Errors from "./errors"

sgMail.setApiKey(config.sendgrid.api_key)

export const sendMail = {
    admin_recover_password: async (data: SendMail) => {
        await sgMail.send({
            to: data.email,
            from: config.sendgrid.email_address,
            subject: "Dummy password recovery",
            text: `Here is your password recovery code: ${data.code}`,
        })
            .catch(() => {
                Errors.emailServiceNotWorking()
            })
    },
}