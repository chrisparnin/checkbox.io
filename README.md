# checkbox.io

> checkbox.io is a site for hosting simple surveys created in markdown. It has dependencies on nginx, node, monogodb.

The following are environment variables that are required to be set:

* MONGO_PORT (27017)
* MONGO_IP   (localhost)
* MONGO_USER
* MONGO_PASSWORD
* APP_PORT  (3002)

If using the mail functionality, you must additionally set:

* MAIL_USER
* MAIL_PASSWORD
* MAIL_SMTP