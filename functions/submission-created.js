// load the env file and make values accessible via process.env
require('dotenv').config();

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  CONTACT_NUMBERS,
  BOT_NUMBER,
  BOT_MESSAGE
} = process.env;

// initialize the helper library client
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

exports.handler = function(event, context, callback) {
  

  console.log(event.queryStringParameters.fisrtname);

  const fisrtname = event.queryStringParameters.fisrtname || "EXAMPLE";
  const lastname = event.queryStringParameters.lastname || "NAME";
  const address = event.queryStringParameters.address || "STREET 12";
  const city = event.queryStringParameters.city || "CITY";
  const reason = event.queryStringParameters.reason || "1";
  const phone  = event.queryStringParameters.phone || "0000000000";
  const notes = event.queryStringParameters.notes || "";

  

  console.log(`${reason} ${fisrtname.toUpperCase()} ${lastname.toUpperCase()} ${address.toUpperCase()}, ${city.toUpperCase()}`);

  Promise.all(
    // split the string of several messages into single numbers
    // send message to each of them
    CONTACT_NUMBERS.split(';').map(num => {
        return client.messages.create({
          from: BOT_NUMBER,
          to: num,
          body: BOT_MESSAGE
        });
      })
    )
    .then(() => callback(null, { statusCode: 200, body: 'Created' }))
    
    .catch(e => {
      console.log(e);
      callback(e);
    });

  };