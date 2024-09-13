import React from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="fixed bottom-0 right-0 mt-4 space-x-4 pr-4">
      <button onClick={handleReset} className="bg-red-500 p-2 rounded">
        Resetear
      </button>
      <button onClick={handleUndo} className="bg-yellow-500 p-2 rounded">
        Terminar
      </button>
      <button onClick={handleBack} className="bg-blue-500 p-2 rounded">
        Volver
      </button>
    </div>
  );
};

export default ActionButtons;
