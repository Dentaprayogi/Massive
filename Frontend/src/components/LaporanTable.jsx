import React from "react";
import "../css/LaporanTable.css";

function LaporanTable() {
  const data = [
    {
      tanggal: "2024-04-12",
      jenis: "Pengeluaran",
      keterangan: "Uang makan siang",
      sumberKeuangan: "KAS",
      jumlah: "Rp 1.000.000",
    },
    {
      tanggal: "2024-04-16",
      jenis: "Pengeluaran",
      keterangan: "Belanja baju",
      sumberKeuangan: "KAS",
      jumlah: "Rp 200.000",
    },
    {
      tanggal: "2024-04-20",
      jenis: "Pengeluaran",
      keterangan: "Uang bensin",
      sumberKeuangan: "KAS",
      jumlah: "Rp 200.000",
    },
    {
      tanggal: "2024-04-25",
      jenis: "Pemasukan",
      keterangan: "Gaji bulan April",
      sumberKeuangan: "KAS",
      jumlah: "Rp 3.500.000",
    },
  ];

  const total = data.reduce((acc, curr) => {
    if (curr.jenis === "Pemasukan") {
      return acc + parseInt(curr.jumlah.replace(/Rp\s|,/g, ""));
    } else {
      return acc - parseInt(curr.jumlah.replace(/Rp\s|,/g, ""));
    }
  }, 0);

  return (
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
              <td>{item.tanggal}</td>
              <td>{item.jenis}</td>
              <td>{item.keterangan}</td>
              <td>{item.sumberKeuangan}</td>
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
  );
}

export default LaporanTable;
