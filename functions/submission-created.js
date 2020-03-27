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
  
  const fisrtname = event.queryStringParameters.name || "EXAMPLE";
  const lastname = event.queryStringParameters.name || "NAME";
  const address = event.queryStringParameters.name || "STREET 12";
  const city = event.queryStringParameters.name || "CITY";
  const reason = event.queryStringParameters.name || "1";
  const phone  = event.queryStringParameters.name || "0000000000";
  const notes = event.queryStringParameters.name || "";


  console.log(`${reason} ${fisrtname.toUperCase()} ${lastname.toUperCase()} ${address.toUperCase()}, ${city.toUperCase()}`);

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