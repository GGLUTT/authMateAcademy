import 'dotenv/config'
import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  export function send({email, subject, html}) {
    return transporter.sendMail({
      to: email,
      subject,
      html,
    })
 
}

// console.log('Succses message to email');

function sendActivationEmail (email, token){

  const  href = `${process.env.CLIENT_HOST}/activate/${token}`
  const html =`
  <h1>Activate Account</h1>
  <a href="${href}">${href}</a>
  `

  send({
    email,
    html,
    subject: 'Activate'

  })
}


export const emailService = {
  send,
  sendActivationEmail
}
