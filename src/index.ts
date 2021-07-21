import { SERVER } from './models/server';
import { DATA_BASE } from './models/Database'


function main() {
    // Instaciating the server and the Data Base
    let app = new SERVER(4000);
    let dataBaseService = new DATA_BASE();

    // Starting the services
    dataBaseService.start();
    app.start();
}

main();