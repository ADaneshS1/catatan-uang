import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Home() {

  const router = useRouter()
  const [showAllData,setShowAllData] = useState();
  const [incomeTotal,setIncomeTotal] = useState(0);
  const [outcomeTotal,setoutcomeTotal] = useState(0);
  const [totalBalance,setTotalBalance] = useState(0);

  useEffect(() => {
    fetch(`/api/getData`)
    .then((res) => res.json())
    .then((data) => {
      setShowAllData(data.data)

      let dataTotalIncome = 0;
      for(let i = 0; i < data.data.length; i++) {
        dataTotalIncome += data.data[i].income
      }

      let dataTotalOutcome = 0;
      for(let i = 0; i < data.data.length; i++) {
        dataTotalOutcome += data.data[i].outcome
      }
      setoutcomeTotal(dataTotalOutcome)
      setIncomeTotal(dataTotalIncome)

      setTotalBalance(dataTotalIncome - dataTotalOutcome)
    })
    .catch((err) => {
      alert("EROR")
    })
  }, [])
  return (
   <>
      <h2>Aplikasi Keuangan</h2>
      <button onClick={() => {
        router.push(`/add-data`)
      }}>Add Data</button>
      <p>Total Income: {incomeTotal}</p>
      <p>Total Outcome: {outcomeTotal}</p>
      <p>Total Balance: {totalBalance}</p>
      <div>
          {showAllData === null && <p>Data Kosong</p>} 
          {showAllData === undefined && <p>Loading...</p>}
          {showAllData && showAllData.map((data,index) => {
            return (
              <div key={index} style={{ margin:"15px 0px" }}>
                  {data.id}
                  {". "}
                  <span style={{ fontWeight:"800" }}> {data.keterangan} </span>
                  {" "}
                  {data.income > 0 && <span style={{ fontSize:"12px" }}>Income {data.income}</span>}
                  {" "}
                  {data.outcome > 0 && <span style={{ fontSize:"12px" }}>Outcome {data.outcome}</span>}
                  <br></br>
                  <button onClick={() => router.push(`/detail/${data.id}`)}>Detail</button>
                  {" "}
                  <button onClick={() => router.push(`/edit/${data.id}`)}>Edit</button>


              </div> 
            )
          })}
      </div>
   </>
  );
}
