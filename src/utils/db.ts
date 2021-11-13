import mongoose from 'mongoose'

const connection = {};

async function connect() {
    if(connection.isConnected) {
        console.log('Already connected');
        return;
    }
    if(mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if(conn.isConnected === 1) {
            console.log('Use previus connection');
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.coonect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
    console.log('New connection');
    connection.isConnected = db.connections[0].readyState;
}

async function disconnect() {
    if(connection.isConnected) {
        if(!process.env.NODE_ENV === 'production') {
            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log('not disconnected');
        }
    }
}

const db = {connect, disconnect};
export default db;