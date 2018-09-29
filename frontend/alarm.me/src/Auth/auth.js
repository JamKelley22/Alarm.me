import auth0 from 'auth0-js'

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'alarm-me.auth0.com',
    clientID: 'yiZzwvCDiqDHCPwJpzEbPS2Jo4SSAkTT',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  }
}

export default Auth;
