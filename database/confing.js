const mongoose = require('mongoose');


const dbConnection = async() => {
    try {

        await mongoose.connect(  process.env.DB_CNN   /*
        #Con la nueva version de mongoose ya no hace falta especificar el objeto 
        como parametro en la funcion "connect" , com lo muextra el profesor en su clase.
        , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }*/);

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('error al inicializar la base de datos')
    }
}

module.exports = {
    dbConnection
}