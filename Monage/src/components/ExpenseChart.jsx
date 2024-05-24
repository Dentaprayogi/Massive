import React from "react";
import "../css/ExpenseChart.css";
import Belanja from "../assets/belanja.png";

function ExpenseChart() {
  return (
    <div className="expense-chart">
      <h2>Pengeluaran Berdasarkan Kategori</h2>
      <div className="chart-expense">
        <div className="expense-chart-item">
          <div className="expense-icon-kategori">
            <div className="expense-chart-item-icon">
              <img src={Belanja} alt="icon" />
            </div>
            <div className="expense-chart-item-kategori">
              <ul>
                <h4>Makanan dan Minuman</h4>
                <h4 className="expense-color-blue">Rp 500.000</h4>
              </ul>
            </div>
          </div>
          <div className="expense-chart-item-persen">
            <h4 className="expense-color-green">40%</h4>
          </div>
        </div>
        <div className="expense-chart-item">
          <div className="expense-icon-kategori">
            <div className="expense-chart-item-icon">
              <img src={Belanja} alt="icon" />
            </div>
            <div className="expense-chart-item-kategori">
              <ul>
                <h4>Belanja</h4>
                <h4 className="expense-color-blue">Rp 300.000</h4>
              </ul>
            </div>
          </div>
          <div className="expense-chart-item-persen">
            <h4 className="expense-color-green">32%</h4>
          </div>
        </div>
        <div className="expense-chart-item">
          <div className="expense-icon-kategori">
            <div className="expense-chart-item-icon">
              <img src={Belanja} alt="icon" />
            </div>
            <div className="expense-chart-item-kategori">
              <ul>
                <h4>Kesehatan</h4>
                <h4 className="expense-color-blue">Rp 100.000</h4>
              </ul>
            </div>
          </div>
          <div className="expense-chart-item-persen">
            <h4 className="expense-color-green">28%</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseChart;
