import React, { useState, useEffect } from "react";
import "../css/FilterDataLaporan.css";
import "../css/LaporanTable.css";

function FilterDataLaporan() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [bulan, setBulan] = useState("");
  const [tahun, setTahun] = useState("");
  const [jenis, setJenis] = useState("");
  const [filterBulan, setFilterBulan] = useState("");
  const [filterTahun, setFilterTahun] = useState("");
  const [filterJenis, setFilterJenis] = useState("");
  const [reloadTable, setReloadTable] = useState(true); // State untuk memicu reload tabel

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    };

    try {
      console.log(
        "Fetching data with filters:",
        filterBulan,
        filterTahun,
        filterJenis
      );

      const response = await fetch(
        `http://localhost:3000/api/laporan?bulan=${filterBulan}&tahun=${filterTahun}&jenis=${filterJenis}`,
        {
          method: "GET",
          headers: headers,
        }
      );

      if (!response.ok) {
        throw new Error("Terjadi kesalahan saat mengambil data laporan");
      }

      const responseData = await response.json();
      console.log("Data response from server:", responseData);
      setData(responseData.transaksi);
      setTotal(responseData.totalSaldo);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (reloadTable) {
      fetchData();
      setReloadTable(false); // Setel kembali reloadTable ke false setelah reload dilakukan
    }
  }, [filterBulan, filterTahun, filterJenis, reloadTable]); // Tambahkan reloadTable sebagai dependensi

  const handleBulanChange = (e) => setBulan(e.target.value);
  const handleTahunChange = (e) => setTahun(e.target.value);
  const handleJenisChange = (e) => setJenis(e.target.value);

  const handleTampilkan = () => {
    setFilterBulan(bulan);
    setFilterTahun(tahun);
    setFilterJenis(jenis);
    console.log("Filters:", bulan, tahun, jenis); // Menambahkan log untuk melihat nilai filter yang dipilih
    setReloadTable(true); // Setel reloadTable ke true untuk memicu reload
  };

  return (
    <div>
      <div className="filter-container">
        <div className="filter-options">
          <label>
            Bulan
            <select value={bulan} onChange={handleBulanChange}>
              <option value="">Semua</option>
              <option value="Januari">Januari</option>
              <option value="Februari">Februari</option>
              <option value="Maret">Maret</option>
              <option value="April">April</option>
              <option value="Mei">Mei</option>
              <option value="Juni">Juni</option>
              <option value="Juli">Juli</option>
              <option value="Agustus">Agustus</option>
              <option value="September">September</option>
              <option value="Oktober">Oktober</option>
              <option value="November">November</option>
              <option value="Desember">Desember</option>
            </select>
          </label>
          <label>
            Tahun
            <select value={tahun} onChange={handleTahunChange}>
              <option value="">Semua</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </label>
          <label>
            Jenis
            <select value={jenis} onChange={handleJenisChange}>
              <option value="">Semua</option>
              <option value="pemasukan">Pemasukan</option>
              <option value="pengeluaran">Pengeluaran</option>
              <option value="tabungan">Tabungan</option>
            </select>
          </label>
          <button onClick={handleTampilkan}>Tampilkan</button>
          <button>Ekspor</button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Keterangan</th>
              <th>Sumber Keuangan</th>
              <th>Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.transaksi_date}</td>
                <td>{item.jenis}</td>
                <td>{item.keterangan}</td>
                <td>{item.sumber_keuangan}</td>
                <td>{item.jumlah}</td>
              </tr>
            ))}
            <tr>
              <td colSpan="4">Total</td>
              <td>Rp {total.toLocaleString("id-ID")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FilterDataLaporan;
