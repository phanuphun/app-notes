import createApp from "./app";
import appConfig from "./configs/index.config";
import mongoDbConnect from "./configs/database.config";
import * as path from 'path';

const app = createApp();
const PORT = appConfig.app.port;
const HOST = appConfig.app.host;
const APP_NAME = appConfig.app.name;
const APP_DESCRIPTION = appConfig.app.description;
const VERSION = appConfig.app.version;

if (process.env.NODE_ENV === 'development') {
    const livereload = require("livereload");
    const lr = livereload.createServer({ exts: ['hbs', 'css', 'js'], delay: 100 });
    lr.watch(path.join(process.cwd(), 'public'));
    lr.watch(path.join(process.cwd(), 'src', 'views'));
}

app.set('trust proxy', 1);

app.listen(PORT, HOST, async () => {
    console.log(`Application Name: ${APP_NAME}`);
    console.log(`Description: ${APP_DESCRIPTION}`);
    console.log(`Version: ${VERSION}`);
    console.log(await mongoDbConnect);
    console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log('=============================================');
});