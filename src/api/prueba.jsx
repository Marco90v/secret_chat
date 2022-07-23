// Client ID: 4e9096d2a887f2643cad
// Client Secret: 26fec17a6507db4fada70287bcc7f4b87db2310b
const TWILIO_ACCOUNT_SID = import.meta.env.VITE_PUBLIC_TWILIO_ACCOUNT_SID
const TWILIO_API_KEY = import.meta.env.VITE_PUBLIC_TWILIO_API_KEY
const TWILIO_API_SECRET = import.meta.env.VITE_PUBLIC_TWILIO_API_SECRET
const SERVICE_SID = import.meta.env.VITE_PUBLIC_SERVICE_SID

let users = {
    user00: "Marco", 
    user01: "" 
};

let response = new Twilio.Response();
let headers = {
    'Access-Control-Allow-Origin': '*',
  };

exports.handler = function(context, event, callback) {
    
    // console.log(context.ACCOUNT_SID,context.TWILIO_API_KEY,context.TWILIO_API_SECRET,context.SERVICE_SID);
      
    response.setHeaders(headers);
    if (!event.identity || !event.password) {
        response.setStatusCode(401);
        response.setBody("No credentials");
        callback(null, response);
        return;
    }

    if (users[event.identity] != event.password) {
        response.setStatusCode(401);
        response.setBody("Wrong credentials");
        callback(null, response);
        return;
    }
    
    let AccessToken = Twilio.jwt.AccessToken;
    let token = new AccessToken(
        TWILIO_ACCOUNT_SID,
        TWILIO_API_KEY,
        TWILIO_API_SECRET, {
            identity: event.identity,
            ttl: 3600
        });

    let grant = new AccessToken.ChatGrant({ serviceSid: SERVICE_SID });
    if(context.PUSH_CREDENTIAL_SID) {
      // Optional: without it, no push notifications will be sent
      grant.pushCredentialSid = context.PUSH_CREDENTIAL_SID; 
    }
    token.addGrant(grant);
    response.setStatusCode(200);
    response.setBody(token.toJwt());
    
    // console.log(response);

    callback(null, response);
};