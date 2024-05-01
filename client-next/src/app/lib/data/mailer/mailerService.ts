import nodemailer from "nodemailer";

export class Mailer {
	private transporter;
	private mailOptions;

	constructor(userMail: string) {
		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
				clientId: process.env.OAUTH_CLIENTID,
				clientSecret: process.env.OAUTH_CLIENT_SECRET,
				refreshToken: process.env.OAUTH_REFRESH_TOKEN,
			},
		});

		this.mailOptions = {
			from: "elduendedelhilo217@gmail.com",
			to: userMail,
			subject: "Recibo",
			text: "¡Hola! Le adjuntamos el recibo de su alquiler/compra.",
			attachments: [
				{
					filename: "recibo.pdf",
					path: `./pdfs/recibo.pdf`,
				},
			],
		};
	}

	public sendEmail() {
		this.transporter.sendMail(this.mailOptions, function (err, data) {
			if (err) {
				console.log("Error " + err);
			} else {
				console.log("Email sent successfully");
			}
		});
	}
}
