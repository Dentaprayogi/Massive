import React from "react";
import "../css/IncomeChart.css";
import Uang from "../assets/uang.png";

function IncomeChart() {
  return (
    <div className="income-chart">
      <h2>Pemasukan Berdasarkan Kategori</h2>
      <div className="chart-income">
        <div className="income-chart-item">
          <div className="income-icon-kategori">
            <div className="income-chart-item-icon">
              <img src={Uang} alt="icon" />
            </div>
            <div className="income-chart-item-kategori">
              <ul>
                <h4>Gaji</h4>
                <h4 className="income-color-blue">Rp 800.000</h4>
              </ul>
            </div>
          </div>
          <div className="income-chart-item-persen">
            <h4 className="income-color-green">40%</h4>
          </div>
        </div>
        <div className="income-chart-item">
          <div className="income-icon-kategori">
            <div className="income-chart-item-icon">
              <img src={Uang} alt="icon" />
            </div>
            <div className="income-chart-item-kategori">
              <ul>
                <h4>THR</h4>
                <h4 className="income-color-blue">Rp 500.000</h4>
              </ul>
            </div>
          </div>
          <div className="income-chart-item-persen">
            <h4 className="income-color-green">32%</h4>
          </div>
        </div>
        <div className="income-chart-item">
          <div className="income-icon-kategori">
            <div className="income-chart-item-icon">
              <img src={Uang} alt="icon" />
            </div>
            <div className="income-chart-item-kategori">
              <ul>
                <h4>Bisnis</h4>
                <h4 className="income-color-blue">Rp 400.000</h4>
              </ul>
            </div>
          </div>
          <div className="income-chart-item-persen">
            <h4 className="income-color-green">28%</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncomeChart;
