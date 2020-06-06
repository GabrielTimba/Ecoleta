import path from 'path';

module.exports={
    client:"sqlite3",
    connection:{
        filename: path.resolve(__dirname,'src','database','database.sqlite')
    },
    migrations:{
        directory:"./src/database/migrations",
    },
    seeds:{
        directory:"./src/database/seeds",
    },
    useNullAsDefault:true
}