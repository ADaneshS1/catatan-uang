const { sql } = require("@vercel/postgres");

async function insertData(req,res) {
    try {
        
        if(req.method !== "POST") {
            return res.status(405).json({message:"Method tidak diperbolehkan"})
        }

        const {keterangan,income,outcome,tanggal,bulan,tahun} = req.body

          const rows = await sql` INSERT INTO trans (keterangan,income,outcome,tanggal,bulan,tahun)
          VALUES (${keterangan},${income},${outcome},${tanggal},${bulan},${tahun})`

        res.status(200).json({message:"Success", data:rows})
    } catch(e){
        console.log("ADA ERROR ", e)
        return res.status(500).json({message:"Terjadi error,"})
    }
}

export default (insertData)