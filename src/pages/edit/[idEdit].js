import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function EditData() {
    const router = useRouter();
    const { idEdit } = router.query;
    const [dataDetail, setDataDetail] = useState();

    useEffect(() => {
        if (!idEdit) return;

        fetch(`/api/getDataDetail?id=${idEdit}`)
            .then((res) => res.json())
            .then((data) => {
                setDataDetail(data.data ? data.data : null);
            })
            .catch((err) => {
                console.error("Ada eror: ", err);
            });
    }, [idEdit]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const keterangan = event.target.keterangan.value;
        const income = parseInt(event.target.income.value);
        const outcome = parseInt(event.target.outcome.value);
        const tanggal = parseInt(event.target.tanggal.value);
        const bulan = parseInt(event.target.bulan.value);
        const tahun = parseInt(event.target.tahun.value);

        fetch(`/api/updateData?id=${idEdit}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: idEdit,
                keterangan: keterangan,
                income: income,
                outcome: outcome,
                tanggal: tanggal,
                bulan: bulan,
                tahun: tahun,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                alert(data.message);
                router.push(`/`)
            })
            .catch((err) => {
                console.error("Error updating data:", err);
                alert("Error: " + err.message);
            });
    };

    return (
        <>
            {dataDetail === null && <p>Data Kosong</p>}
            {dataDetail === undefined && <p>Loading...</p>}
            {dataDetail && (
                  <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="keterangan">keterangan : </label>
                            <input name="keterangan" defaultValue={dataDetail.keterangan}></input>
                        </div>
                        <div>
                            <label htmlFor="income">income : </label>
                            <input name="income" type="number" defaultValue={dataDetail.income}></input>
                        </div>
                        <div>
                            <label htmlFor="outcome">outcome : </label>
                            <input name="outcome" type="number" defaultValue={dataDetail.outcome}></input>
                        </div>
                        <div>
                            <label htmlFor="tanggal">tanggal : </label>
                            <input name="tanggal" type="number" defaultValue={dataDetail.tanggal}></input>
                        </div>
                        <div>
                            <label htmlFor="bulan">bulan : </label>
                            <input name="bulan" type="number" defaultValue={dataDetail.bulan}></input>
                        </div>
                        <div>
                            <label htmlFor="tahun">tahun : </label>
                            <input name="tahun" type="number" defaultValue={dataDetail.tahun}></input>
                        </div>
                        <div>
                            <button type="submit">Update Data</button>
                            <button onClick={() => {router.push(`/`)}}>Kembali</button>
                        </div>
                    </form>
                </div>
            )}

        </>
    );
}
