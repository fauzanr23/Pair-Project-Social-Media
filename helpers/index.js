const nodemailer = require("nodemailer")

class Helper {
    static postTime(created) {
        let now = new Date()
        let minutes = now.getMinutes()
        let hours = now.getHours()
        let days = now.getDate()
        let time;

        if (hours - created.getHours() < 1) {
            time = minutes - created.getMinutes()
            if (time === 1) {
                return time + " minute ago"
            } else {
                return time + " minutes ago"
            }

        } else if (hours - created.getHours() > 24) {
            time = days - created.getDate()
            return time + "d"
        } else if (hours - created.getHours() >= 1) {
            time = hours - created.getHours()
            if (time === 1) {
                return time + " hour ago"
            } else {
                return time + " hours ago"
            }
        }
    }
    static async sendMail(message) {
        try {
            // Generate a test account
            const testAccount = await nodemailer.createTestAccount();

            console.log("Test account created:");
            console.log("  User: %s", testAccount.user);
            console.log("  Pass: %s", testAccount.pass);

            // Create a transporter
            const transporter = nodemailer.createTransport({
                host: testAccount.smtp.host,
                port: testAccount.smtp.port,
                secure: testAccount.smtp.secure,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass,
                },
            });

            // Send a test message
            const info = await transporter.sendMail(message);

            console.log("Message sent: %s", info.messageId);
            console.log("Preview: %s", nodemailer.getTestMessageUrl(info));

        } catch (error) {
            throw error
        }
    }
}

module.exports = Helper