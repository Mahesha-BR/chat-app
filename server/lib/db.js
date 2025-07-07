import mongoose from "mongoose";

export const connetDB = async () =>
{
    try
    {
        mongoose.connection.on( 'connected', () => 
            console.log( 'Database connected' ) );
        await mongoose.connect( `${ process.env.MONGODB_URI }/chat-app` );

    } catch ( error )
    {
        console.log( error );
    }
};