import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleAdd = (event) => {
    event.preventDefault();
    const keterangan = event.target.keterangan.value;
    const income = event.target.income.value;
    const outcome = event.target.outcome.value;
    const tanggal = event.target.tanggal.value;
    const bulan = event.target.bulan.value;
    const tahun = event.target.tahun.value;

    fetch("/api/insertData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
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
        router.push("/");
      })
      .catch((err) => {
        alert("hubungi saya", err.message);
      });
  };

  return (
    <div>
      <p>Ini Halaman Add Data</p>
      <div>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label>Keterangan:</label>
            <input
              name="keterangan"
              required
            />
          </div>
          <div>
            <label>Income:</label>
            <input
              name="income"
              required
            />
          </div>
          <div>
            <label>Outcome:</label>
            <input
              name="outcome"
              required
            />
          </div>
          <div>
            <label>Tanggal:</label>
            <input
              name="tanggal"
              required
            />
          </div>
          <div>
            <label>Bulan:</label>
            <input
              name="bulan"
              required
            />
          </div>
          <div>
            <label>Tahun:</label>
            <input
              name="tahun"
              required
            />
          </div>
          <div className="flex gap-1">
            <button
              type="submit"
            >
              Add Data
            </button>
            <button
              type="button"
              onClick={() => {
                router.push(`/`);
              }}
            >
              Kembali
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}