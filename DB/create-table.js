require('dotenv').config({path:'.env.development.local'});

const {sql} = require('@vercel/postgres')

async function execute() {

    const createTable = await sql`
    CREATE TABLE IF NOT EXISTS trans (
        id SERIAL PRIMARY KEY,
        keterangan VARCHAR(20) NOT NULL,
        income INT,
        outcome INT,
        tanggal INT,
        bulan INT,
        tahun INT
    )   
    `;
    console.log(createTable)
}

execute()