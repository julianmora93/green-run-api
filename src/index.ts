import { InitServer } from './common/app';
import { AppDataSource } from './common/data.source';

InitServer();

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log(error))