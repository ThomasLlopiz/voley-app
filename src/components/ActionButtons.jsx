import React from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const ActionButtons = ({
  tableData,
  setTableData,
  history,
  setHistory,
  selectedSet,
  setSelectedSet,
}) => {
  const navigate = useNavigate();

  const handleReset = () => {
    setTableData({
      set1: {
        local: Array(1).fill(Array(10).fill("")),
        visitante: Array(1).fill(Array(10).fill("")),
      },
      set2: {
        local: Array(1).fill(Array(10).fill("")),
        visitante: Array(1).fill(Array(10).fill("")),
      },
      set3: {
        local: Array(1).fill(Array(10).fill("")),
        visitante: Array(1).fill(Array(10).fill("")),
      },
    });
    setHistory({
      set1: { local: [], visitante: [] },
      set2: { local: [], visitante: [] },
      set3: { local: [], visitante: [] },
    });
    localStorage.removeItem("tableData");
  };

  const handleUndo = () => {
    if (history[selectedSet] && history[selectedSet].length > 0) {
      const lastState = history[selectedSet][history[selectedSet].length - 1];
      setTableData(lastState);
      setHistory({
        ...history,
        [selectedSet]: history[selectedSet].slice(0, -1),
      });
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleExportToExcel = () => {
    const tableData = JSON.parse(localStorage.getItem("tableData"));

    const data = [];
    Object.keys(tableData).forEach((set) => {
      data.push([`${set.toUpperCase()} - LOCAL`]);
      data.push([
        "ENF",
        "EAT",
        "ECA",
        "ESA",
        "ERP",
        "EBL",
        "PSA",
        "PCA",
        "PAT",
        "PBL",
      ]);
      tableData[set].local.forEach((row) => {
        data.push(row);
      });

      data.push([]);
      data.push([`${set.toUpperCase()} - VISITANTE`]);
      data.push([
        "ENF",
        "EAT",
        "ECA",
        "ESA",
        "ERP",
        "EBL",
        "PSA",
        "PCA",
        "PAT",
        "PBL",
      ]);
      tableData[set].visitante.forEach((row) => {
        data.push(row);
      });

      data.push([]);
      data.push([]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Partido");
    XLSX.writeFile(workbook, "partido.xlsx");
  };

  return (
    <div className="fixed bottom-0 right-0 mt-4 space-x-4 pr-4">
      <button onClick={handleReset} className="bg-red-500 p-2 rounded">
        Resetear
      </button>
      <button onClick={handleUndo} className="bg-yellow-500 p-2 rounded">
        Deshacer
      </button>
      <button
        onClick={handleExportToExcel}
        className="bg-green-500 p-2 rounded"
      >
        Terminar
      </button>
      <button onClick={handleBack} className="bg-blue-500 p-2 rounded">
        Volver
      </button>
    </div>
  );
};

export default ActionButtons;
