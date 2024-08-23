import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(`EcomSpectrum app listening on port ${config.port}`)
        })
    } catch (err: any) {
        console.log(err);
    }
}

main().catch(err => console.log(err));