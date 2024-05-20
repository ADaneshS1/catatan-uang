import { useRouter } from "next/router"
import { useEffect, useState } from "react"

export default function Handler() {
    const router = useRouter()
    const {idDetail} = router.query
    const [showData,setShowData] = useState();

    useEffect(() => {
        if(!idDetail) return;
        fetch(`/api/getDataDetail?id=${idDetail}`)
        .then((res) => res.json())
        .then((data) => {
            setShowData(data.data)
        })
    },[idDetail])

    return(
        <>
            Ini id {idDetail}
            {showData === null && <p>Data Kosong</p>}
            {showData === undefined && <p>Loading...</p>}
            {showData && (
                <>
                    <div>Id: {idDetail}</div>
                    <div>keterangan: {showData.keterangan}</div>
                    <div>income: {showData.income}</div>
                    <div>outcome: {showData.outcome}</div>
                    <div>tanggal: {showData.tanggal}</div>
                    <div>bulan: {showData.bulan}</div>
                    <div>tahun: {showData.tahun}</div>
                </>
            )}
        </>
    )
}