
// can't get data from local domains FFFFFU
const devenv = 'prod'

const AllConfigs = {
  dev: {
    API_DOMAIN: 'http://localhost:3000'
  },
  prod: {
    API_DOMAIN: 'https://cgram.rikai-bots.com'
  }
}

const API_DOMAIN = AllConfigs[devenv].API_DOMAIN

const AppConfig = {
  EXAMPLES_API: API_DOMAIN + '/api/examples?mp=yes',
  GRAMMAR_API: API_DOMAIN + '/api/grams?lang=zh'
}

module.exports = AppConfig
