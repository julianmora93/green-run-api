import { InitServer } from './common/app';
import { AppDataSource } from './common/app.data.source';

InitServer();
console.log('----- ', new Date());
AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))