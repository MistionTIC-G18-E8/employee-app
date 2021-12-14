let API = '';
switch (process.env.NODE_ENV) {
  case 'production':
    API = window.location.origin + '/api/';
    break;
  default:
    API = 'https://mtic.muniter.xyz/api/'
}

console.log("The api is", API);

module.exports = API;
