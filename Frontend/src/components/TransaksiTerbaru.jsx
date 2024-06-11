import React from "react";
import Pemasukan from "../assets/pemasukan.png";
import Pengeluaran from "../assets/pengeluaran.png";
import "../css/TransaksiTerbaru.css";

function TransaksiTerbaru() {
  return (
    <div id="transaksi-terbaru">
      <div className="transaksi-terbaru">
        <div className="transaksi-terbaru-2" />
        <div className="transaksi-terbaru-3">
          <div className="transaksi-terbaru-4">Transaksi Terbaru</div>
          <div className="transaksi-terbaru-5">
            <div className="transaksi-terbaru-6">
              <div className="transaksi-terbaru-column">
                <div className="transaksi-terbaru-8">
                  <img src={Pemasukan} alt="" />
                  <div className="transaksi-terbaru-9">Gaji bulan April </div>
                </div>
                <div className="column00">
                  <div className="color-text-pemasukan">Rp 3.500.000 </div>
                  <div className="transaksi-terbaru-12">25-04-2024</div>
                </div>
              </div>
            </div>
            <div className="transaksi-terbaru-6">
              <div className="transaksi-terbaru-column">
                <div className="transaksi-terbaru-8">
                  <img src={Pengeluaran} alt="" />
                  <div className="transaksi-terbaru-9">Uang Makan Siang </div>
                </div>
                <div className="column00">
                  <div className="color-text-pengeluaran">Rp 200.000 </div>
                  <div className="transaksi-terbaru-12">25-04-2024</div>
                </div>
              </div>
            </div>
            <div className="transaksi-terbaru-6">
              <div className="transaksi-terbaru-column">
                <div className="transaksi-terbaru-8">
                  <img src={Pemasukan} alt="" />
                  <div className="transaksi-terbaru-9">Gaji bulan April </div>
                </div>
                <div className="column00">
                  <div className="color-text-pemasukan">Rp 3.500.000 </div>
                  <div className="transaksi-terbaru-12">25-04-2024</div>
                </div>
              </div>
            </div>

            {/* <div className="transaksi-terbaru-6">
              <div className="transaksi-terbaru-7">
                <div className="transaksi-terbaru-column">
                  <div className="transaksi-terbaru-8">
                    <img src={Pemasukan} alt="" />
                    <div className="transaksi-terbaru-9">Uang Makan Siang </div>
                  </div>
                </div>
                <div className="transaksi-terbaru-column-2">
                  <div className="transaksi-terbaru-10">
                    <div className="transaksi-terbaru-18">Rp 00.000 </div>
                    <div className="transaksi-terbaru-12">25-04-2024</div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="transaksi-terbaru-13">
              <div className="transaksi-terbaru-14">
                <div className="transaksi-terbaru-3">
                  <div className="transaksi-terbaru-15">
                    <img src="" alt="" />
                    <div className="transaksi-terbaru-16">Uang makan siang</div>
                  </div>
                </div>
                <div className="transaksi-terbaru-4">
                  <div className="transaksi-terbaru-17">
                    <div className="transaksi-terbaru-18">Rp. 200.000</div>
                    <div className="transaksi-terbaru-19">25-04-2024</div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="transaksi-terbaru-20">
              <div className="transaksi-terbaru-21">
                <div className="transaksi-terbaru-column-5">
                  <div className="transaksi-terbaru-22">
                    <img src="" alt="" />
                    <div className="transaksi-terbaru-23">
                      Gaji bulan Maret{" "}
                    </div>
                  </div>
                </div>
                <div className="transaksi-terbaru-column-6">
                  <div className="transaksi-terbaru-24">
                    <div className="transaksi-terbaru-25">Rp 3.500.000 </div>
                    <div className="transaksi-terbaru-26">25-03-2024</div>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <div className="transaksi-terbaru-6">
              <div className="transaksi-terbaru-7">
                <div className="transaksi-terbaru-column">
                  <div className="transaksi-terbaru-8">
                    <img src={Pemasukan} alt="" />
                    <div className="transaksi-terbaru-9">Gaji bulan Maret </div>
                  </div>
                </div>
                <div className="transaksi-terbaru-column-2">
                  <div className="transaksi-terbaru-10">
                    <div className="transaksi-terbaru-11">Rp 3.500.000 </div>
                    <div className="transaksi-terbaru-12">25-04-2024</div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransaksiTerbaru;
