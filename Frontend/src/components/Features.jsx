import React from "react";
import image3 from "../assets/image 3.png";
import image4 from "../assets/image 4.png";
import image5 from "../assets/image 5.png";

const Features = () => {
  return (
    <section id="fitur">
      <div className="title">
        <h1 style={{ color: "rgb(35, 105, 95)" }}>Fitur</h1>
        <div className="monage">
          <div className="deskripsi">
            <h1 className="text-monage">Monage</h1>
            <p>
              Monage adalah aplikasi web pencatatan keuangan harian yang
              mempunyai fitur-fitur menarik untuk memonitoring keuangan harian
              anda. Direkomendasikan bagi para remaja yang kesulitan dalam
              melakukan pengelolaan keuangannya.
            </p>
          </div>
          <div className="card-fitur">
            <ul>
              <li>
                <img src={image3} alt="gambar" />
              </li>
              <li>
                <h4>Transaksi Harian</h4>
                <p>
                  Kami memberikan fitur transaksi harian yang akan menampilkan
                  data harian yang bisa mempermudah anda dalam mengelola
                  keuangan pribadi. dan data keuangan anda akan tersimpan dengan
                  aman di dalam platform ini.
                </p>
              </li>
            </ul>
          </div>

          <div className="card-fitur">
            <ul>
              <li style={{ textAlign: "right" }}>
                <h4>Perencanaan Keuangan</h4>
                <p>
                  Kami menyediakan fitur perencanaan keuangan yang berguna untuk
                  merencanakan keuangan dengan lebih efektif. Anda dapat
                  menetapkan tujuan keuangan, mengatur anggaran, dan membuat
                  rencana pengeluaran keuangan.
                </p>
              </li>
              <li>
                <img src={image4} alt="gambar" />
              </li>
            </ul>
          </div>

          <div className="card-fitur">
            <ul>
              <li>
                <img src={image5} alt="gambar" />
              </li>
              <li>
                <h4>Monitoring Keuangan</h4>
                <p>
                  Kami memberikan fitur monitoring keuangan agar anda dapat
                  melacak secara rinci semua aspek keuangan anda. Ini termasuk
                  analisis pengeluaran, pemantauan keseimbangan akun, dan
                  visualisasi grafis untuk membantu memahami pola pengeluaran
                  anda.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
