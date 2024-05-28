import PropertiesReader from 'properties-reader'
import fs from 'fs'

const properties = PropertiesReader('../config.properties');
const config = properties.getAllProperties();

config['app.api'] = 'urlexample';

const appUrl = properties.get('app.url');
const appPort = properties.get('app.port');

const appApi = appUrl +  appPort;
config['app.api'] = String(appApi);

fs.writeFileSync('./src/config.json', JSON.stringify(config, null, 2));
