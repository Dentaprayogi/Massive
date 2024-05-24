import React from "react";
import menabung from "../assets/menabung.png";
import mencatatKeuangan from "../assets/mencatat keuangan.png";
import prioritasKeuangan from "../assets/prioritas keuangan.png";

const TipsHemat = () => {
  return (
    <section id="tips-hemat">
      <div className="title">
        <h1 style={{ color: "white" }}>Tips Hemat</h1>
        <div className="card-tips-hemat">
          <ul>
            <li>
              <img src={menabung} alt="gambar" />
              <h4>Menabung</h4>
              <p>
                Easy to enjoy, easy to prepare. Healthy as could be. Perfect for
                quick snack while watching Netflix.
              </p>
            </li>
            <li>
              <img src={mencatatKeuangan} alt="gambar" />
              <h4>Mencatat Keuangan</h4>
              <p>
                Easy to enjoy, easy to prepare. Healthy as could be. Perfect for
                quick snack while watching Netflix.
              </p>
            </li>
            <li>
              <img src={prioritasKeuangan} alt="gambar" />
              <h4>Prioritas Kebutuhan</h4>
              <p>
                Easy to enjoy, easy to prepare. Healthy as could be. Perfect for
                quick snack while watching Netflix.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TipsHemat;
