import db from "../models/index.js";
const Users = db.users;
import mailgun from "mailgun-js";
const Op = db.Sequelize.Op;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Load .env file
import * as dotenv from "dotenv";
dotenv.config();

const signup = (req, res) => {
  const name_input = req.body.name;
  const email_input = req.body.email;
  const phone = req.body.phone;
  const password_input = req.body.password;

  // Validate request
  if (!name_input || !email_input || !password_input) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const token = jwt.sign(
    {
      email: email_input,
      name: name_input,
      password: password_input,
      phone: phone,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: 1800,
    }
  );

  const DOMAIN = process.env.MAILGUN_DOMAIN;
  const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN });
  const data = {
    from: "Admin <widiw598@gmail.com>",
    to: email_input,
    subject: "Email Verification",
    html: `
    <html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8"> <!-- utf-8 works for most cases -->
    <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
    <meta name="x-apple-disable-message-reformatting">  <!-- Disable auto-scale in iOS 10 Mail entirely -->
    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

    <link href="https://fonts.googleapis.com/css?family=Lato:300,400,700" rel="stylesheet">

    <!-- CSS Reset : BEGIN -->
    <style>

        /* What it does: Remove spaces around the email design added by some email clients. */
        /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
        html,
body {
    margin: 0 auto !important;
    padding: 0 !important;
    height: 100% !important;
    width: 100% !important;
    background: #f1f1f1;
}

/* What it does: Stops email clients resizing small text. */
* {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}

/* What it does: Centers email on Android 4.4 */
div[style*="margin: 16px 0"] {
    margin: 0 !important;
}

/* What it does: Stops Outlook from adding extra spacing to tables. */
table,
td {
    mso-table-lspace: 0pt !important;
    mso-table-rspace: 0pt !important;
}

/* What it does: Fixes webkit padding issue. */
table {
    border-spacing: 0 !important;
    border-collapse: collapse !important;
    table-layout: fixed !important;
    margin: 0 auto !important;
}

/* What it does: Uses a better rendering method when resizing images in IE. */
img {
    -ms-interpolation-mode:bicubic;
}

/* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
a {
    text-decoration: none;
}

/* What it does: A work-around for email clients meddling in triggered links. */
*[x-apple-data-detectors],  /* iOS */
.unstyle-auto-detected-links *,
.aBn {
    border-bottom: 0 !important;
    cursor: default !important;
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
}

/* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
.a6S {
    display: none !important;
    opacity: 0.01 !important;
}

/* What it does: Prevents Gmail from changing the text color in conversation threads. */
.im {
    color: inherit !important;
}

/* If the above doesn't work, add a .g-img class to any image in question. */
img.g-img + div {
    display: none !important;
}

/* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
/* Create one of these media queries for each additional viewport size you'd like to fix */

/* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
@media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
    u ~ div .email-container {
        min-width: 320px !important;
    }
}
/* iPhone 6, 6S, 7, 8, and X */
@media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
    u ~ div .email-container {
        min-width: 375px !important;
    }
}
/* iPhone 6+, 7+, and 8+ */
@media only screen and (min-device-width: 414px) {
    u ~ div .email-container {
        min-width: 414px !important;
    }
}

    </style>

    <!-- CSS Reset : END -->

    <!-- Progressive Enhancements : BEGIN -->
    <style>

	    .primary{
	background: #30e3ca;
}
.bg_white{
	background: #ffffff;
}
.bg_light{
	background: #fafafa;
}
.bg_black{
	background: #000000;
}
.bg_dark{
	background: rgba(0,0,0,.8);
}
.email-section{
	padding:2.5em;
}

/*BUTTON*/
.btn{
	padding: 10px 15px;
	display: inline-block;
}
.btn.btn-primary{
	border-radius: 5px;
	background: #30e3ca;
	color: #ffffff;
}
.btn.btn-white{
	border-radius: 5px;
	background: #ffffff;
	color: #000000;
}
.btn.btn-white-outline{
	border-radius: 5px;
	background: transparent;
	border: 1px solid #fff;
	color: #fff;
}
.btn.btn-black-outline{
	border-radius: 0px;
	background: transparent;
	border: 2px solid #000;
	color: #000;
	font-weight: 700;
}

h1,h2,h3,h4,h5,h6{
	font-family: 'Lato', sans-serif;
	color: #000000;
	margin-top: 0;
	font-weight: 400;
}

body{
	font-family: 'Lato', sans-serif;
	font-weight: 400;
	font-size: 15px;
	line-height: 1.8;
	color: rgba(0,0,0,.4);
}

a{
	color: #30e3ca;
}

table{
}
/*LOGO*/

.logo h1{
	margin: 0;
}
.logo h1 a{
	color: #30e3ca;
	font-size: 24px;
	font-weight: 700;
	font-family: 'Lato', sans-serif;
}

/*HERO*/
.hero{
	position: relative;
	z-index: 0;
}

.hero .text{
	color: rgba(0,0,0,.3);
}
.hero .text h2{
	color: #000;
	font-size: 40px;
	margin-bottom: 0;
	font-weight: 400;
	line-height: 1.4;
}
.hero .text h3{
	font-size: 24px;
	font-weight: 300;
}
.hero .text h2 span{
	font-weight: 600;
	color: #30e3ca;
}


/*HEADING SECTION*/
.heading-section{
}
.heading-section h2{
	color: #000000;
	font-size: 28px;
	margin-top: 0;
	line-height: 1.4;
	font-weight: 400;
}
.heading-section .subheading{
	margin-bottom: 20px !important;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(0,0,0,.4);
	position: relative;
}
.heading-section .subheading::after{
	position: absolute;
	left: 0;
	right: 0;
	bottom: -10px;
	content: '';
	width: 100%;
	height: 2px;
	background: #30e3ca;
	margin: 0 auto;
}

.heading-section-white{
	color: rgba(255,255,255,.8);
}
.heading-section-white h2{
	font-family: 
	line-height: 1;
	padding-bottom: 0;
}
.heading-section-white h2{
	color: #ffffff;
}
.heading-section-white .subheading{
	margin-bottom: 0;
	display: inline-block;
	font-size: 13px;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: rgba(255,255,255,.4);
}


ul.social{
	padding: 0;
}
ul.social li{
	display: inline-block;
	margin-right: 10px;
}

/*FOOTER*/

.footer{
	border-top: 1px solid rgba(0,0,0,.05);
	color: rgba(0,0,0,.5);
}
.footer .heading{
	color: #000;
	font-size: 20px;
}
.footer ul{
	margin: 0;
	padding: 0;
}
.footer ul li{
	list-style: none;
	margin-bottom: 10px;
}
.footer ul li a{
	color: rgba(0,0,0,1);
}


@media screen and (max-width: 500px) {


}


    </style>


</head>

<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
	<center style="width: 100%; background-color: #f1f1f1;">
    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 600px; margin: 0 auto;" class="email-container">
    	<!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
          	<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
          		<tr>
          			<td class="logo" style="text-align: center;">
			            <h1><a href="#">e-Verify</a></h1>
			          </td>
          		</tr>
          	</table>
          </td>
	      </tr><!-- end tr -->
	      <tr>
          <td valign="middle" class="hero bg_white" style="padding: 3em 0 2em 0;">
            <img src="images/email.png" alt="" style="width: 300px; max-width: 600px; height: auto; margin: auto; display: block;">
          </td>
	      </tr><!-- end tr -->
				<tr>
          <td valign="middle" class="hero bg_white" style="padding: 2em 0 4em 0;">
            <table>
            	<tr>
            		<td>
            			<div class="text" style="padding: 0 2.5em; text-align: center;">
            				<h2>Please verify your email</h2>
            				<p><a href="https://simpelmen.herokuapp.com/api/auth/activate/${token}" class="btn btn-primary">verify me</a></p>
            			</div>
            		</td>
            	</tr>
            </table>
          </td>
	      </tr><!-- end tr -->
      <!-- 1 Column Text + Button : END -->
      </table>
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: auto;">
      	<tr>
          <td valign="middle" class="bg_light footer email-section">
            <table>
            	<tr>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-right: 10px;">
                      	<h3 class="heading">About</h3>
                      	<p>A small river named Duden flows by their place and supplies it with the necessary regelialia.</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                      	<h3 class="heading">Contact Info</h3>
                      	<ul>
					                <li><span class="text">203 Fake St. Mountain View, San Francisco, California, USA</span></li>
					                <li><span class="text">+2 392 3929 210</span></a></li>
					              </ul>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 10px;">
                      	<h3 class="heading">Useful Links</h3>
                      	<ul>
					                <li><a href="#">Home</a></li>
					                <li><a href="#">About</a></li>
					                <li><a href="#">Services</a></li>
					                <li><a href="#">Work</a></li>
					              </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td class="bg_light" style="text-align: center;">
          	<p>No longer want to receive these email? You can <a href="#" style="color: rgba(0,0,0,.8);">Unsubscribe here</a></p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>
</html>
    `,
  };

  mg.messages().send(data, function (error, body) {
    if (error) {
      return res.status(500).send({
        error: err.message,
      });
    }

    res.status(200).send({
      message: "Email has been sent",
    });
  });
};

const activate = (req, res) => {
  const { token } = req.params;
  const temp = token
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { name, email, password,phone} = decodedToken;
        Users.create({
          user_name: name,
          user_contact: phone,
          user_password: bcrypt.hashSync(password, 8),
          user_email: email,
          user_status: true,
          user_verify: true,
          user_role_id: 8,
        })
          .then((user) => {
            res.redirect("http://simpelmenok-dev.herokuapp.com/login");
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }
    });
  } else {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

const login = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({
    where: {
      user_email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.user_password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign(
        {
          user_id: user.user_id,
          user_name: user.user_name,
          user_email: user.user_email,
          user_role_id: user.user_role_id,
          user_status: user.user_status,
          user_verify: user.user_verify,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        message: "Login Success",
        data: {
          user_email: user.user_email,
          user_role_id: user.user_role_id,
          user_name: user.user_name,
          token: token,
        },
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const SendResetPassword = (req, res) => {
  const { email } = req.body;

  // Validate request
  if (!email) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Users.findOne({
    where: {
      user_email: email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const token = jwt.sign(
        {
          email: email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: 1800,
        }
      );

      const DOMAIN = process.env.MAILGUN_DOMAIN;
      const mg = mailgun({
        apiKey: process.env.MAILGUN_API_KEY,
        domain: DOMAIN,
      });
      const data = {
        from: "Admin <widiw598@gmail.com>",
        to: email,
        subject: "Reset Password",
        html: `
        <html>
        <head>
        <style>
        .container {
          width: 100%;
          height: 100%;
          background-color: orange;
          padding: 20px;
        }
        .card {
          width: 400px;
          height: 400px;
          background-color: white;
          margin: 0 auto;
          margin-top: 100px;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .card h1 {
          text-align: center;
          font-size: 30px;
          margin-bottom: 20px;
        }
        .card p {
          text-align: center;
          font-size: 20px;
          margin-bottom: 20px;
        }
        .card a {
          text-decoration: none;
          background-color: #000;
          color: #fff;
          padding: 10px 20px;
          border-radius: 5px;
          display: block;
          width: 100px;
          text-align: center;
          margin: 0 auto;
        }
        </style>
        </head>
        <body>
        <div class="container">
        <div class="card">
        <h1>Reset Password</h1>
        <p>Click the button below to reset your password.</p>
        <a href="new-password/${token}">Reset</a>
        </div>
        </div>
        </body>
        </html>
        `,
      };

      mg.messages().send(data, function (error, body) {
        if (error) {
          return res.status(500).json({
            error: err.message,
          });
        }

        res.json({
          message: "Email has been sent",
        });
      });
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message,
      });
    });
};

const ResetPassword = (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Validate request
  if (!password) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        return res.status(400).send({ message: "Incorrect or Expired link" });
      } else {
        const { email } = decodedToken;
        Users.findOne({
          where: {
            email: email,
          },
        })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: "User Not found." });
            }
            user
              .update({
                user_password: bcrypt.hashSync(password, 8),
              })
              .then(() => {
                res.status(200).send({ message: "Password updated" });
              })
              .catch((err) => {
                return res.status(500).send({ message: err.message });
              });
          })
          .catch((err) => {
            return res.status(500).send({ message: err.message });
          });
      }
    });
  } else {
    return res.status(400).send({ message: "Something went wrong" });
  }
};

export { signup, activate, login, SendResetPassword, ResetPassword };
