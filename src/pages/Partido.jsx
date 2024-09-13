import React, { useState, useEffect } from "react";
import Select from "../components/Select";
import FormatCellContent from "../components/FormatCellContent";
import { useNavigate } from "react-router-dom";

export const Partido = () => {
  // Usa el hook useNavigate
  const navigate = useNavigate();

  // Estados para cada set
  const [tableData, setTableData] = useState({
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
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [showSelect, setShowSelect] = useState(false);
  const [jugadoresLocal, setJugadoresLocal] = useState([]);
  const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
  const [history, setHistory] = useState({
    set1: { local: [], visitante: [] },
    set2: { local: [], visitante: [] },
    set3: { local: [], visitante: [] },
  });
  const [selectedSet, setSelectedSet] = useState("set1");

  const equipoLocal =
    localStorage.getItem("equipoSeleccionado1") || "Equipo Local";
  const equipoVisitante =
    localStorage.getItem("equipoSeleccionado2") || "Equipo Visitante";

  useEffect(() => {
    const jugadoresGuardados =
      JSON.parse(localStorage.getItem("jugadores")) || {};
    setJugadoresLocal(jugadoresGuardados[equipoLocal] || []);
    setJugadoresVisitante(jugadoresGuardados[equipoVisitante] || []);
  }, [equipoLocal, equipoVisitante]);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }, [tableData]);

  const handleHeaderClick = (columnIndex, tableName) => {
    setSelectedColumn(columnIndex);
    setSelectedTable(tableName);
    setShowSelect(true);
  };

  const handleValueChange = (e) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    const newValues = selectedOptions.join(" ");

    if (selectedColumn !== null && selectedTable) {
      const updatedData = {
        ...tableData,
        [selectedSet]: {
          ...tableData[selectedSet],
          [selectedTable]: tableData[selectedSet][selectedTable].map((row) => {
            const updatedRow = [...row];
            updatedRow[selectedColumn] = updatedRow[selectedColumn]
              ? updatedRow[selectedColumn] + " " + newValues
              : newValues;
            return updatedRow;
          }),
        },
      };

      setHistory({
        ...history,
        [selectedSet]: {
          ...history[selectedSet],
          [selectedTable]: [
            ...history[selectedSet][selectedTable],
            tableData[selectedSet][selectedTable],
          ],
        },
      });

      setTableData(updatedData);
      setSelectedColumn(null);
      setSelectedTable(null);
      setShowSelect(false);
    }
  };

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
    if (selectedTable && history[selectedSet][selectedTable].length > 0) {
      setTableData({
        ...tableData,
        [selectedSet]: {
          ...tableData[selectedSet],
          [selectedTable]:
            history[selectedSet][selectedTable][
              history[selectedSet][selectedTable].length - 1
            ],
        },
      });
      setHistory({
        ...history,
        [selectedSet]: {
          ...history[selectedSet],
          [selectedTable]: history[selectedSet][selectedTable].slice(0, -1),
        },
      });
    }
  };

  const handleSelectChange = (e) => {
    setSelectedSet(e.target.value);
  };

  const volver = () => {
    navigate("/");
  };

  return (
    <div className="bg-black text-white w-full mx-auto relative">
      <select
        className="fixed bg-black top-0 right-0"
        name="sets"
        id="sets"
        value={selectedSet}
        onChange={handleSelectChange}
      >
        <option value="set1">SET1</option>
        <option value="set2">SET2</option>
        <option value="set3">SET3</option>
      </select>
      <main>
        <div className="flex flex-col text-left mt-4 w-full">
          <div>
            <h2 className="text-center font-bold text-blue-600">
              {equipoLocal}
            </h2>
            <table className="w-full mx-auto text-left relative">
              <thead>
                <tr>
                  {[
                    "ENF",
                    "EAT",
                    "EAT",
                    "ESA",
                    "ERP",
                    "EBL",
                    "PSA",
                    "PCA",
                    "PAT",
                    "PBL",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`text-red-600 cursor-pointer ${
                        selectedColumn !== null && selectedTable === "local"
                          ? "bg-gray-700"
                          : ""
                      }`}
                      onClick={() => handleHeaderClick(index, "local")}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData[selectedSet].local.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="relative">
                        <FormatCellContent content={cell} />
                        {selectedColumn === cellIndex &&
                          selectedTable === "local" &&
                          showSelect && (
                            <Select
                              options={jugadoresLocal}
                              onChange={handleValueChange}
                            />
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-full absolute mt-44">
            <h2 className="text-center font-bold text-blue-600">
              {equipoVisitante}
            </h2>
            <table className="w-full mx-auto text-left relative">
              <thead>
                <tr>
                  {[
                    "ENF",
                    "EAT",
                    "EAT",
                    "ESA",
                    "ERP",
                    "EBL",
                    "PSA",
                    "PCA",
                    "PAT",
                    "PBL",
                  ].map((header, index) => (
                    <th
                      key={index}
                      className={`text-red-600 cursor-pointer ${
                        selectedColumn !== null && selectedTable === "visitante"
                          ? "bg-gray-700"
                          : ""
                      }`}
                      onClick={() => handleHeaderClick(index, "visitante")}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData[selectedSet].visitante.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className="relative">
                        <FormatCellContent content={cell} />
                        {selectedColumn === cellIndex &&
                          selectedTable === "visitante" &&
                          showSelect && (
                            <Select
                              options={jugadoresVisitante}
                              onChange={handleValueChange}
                            />
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="fixed bottom-0 right-0 mt-4 space-x-4 pr-4">
            <button onClick={handleReset} className="bg-red-500 p-2 rounded">
              Resetear
            </button>
            <button onClick={handleUndo} className="bg-yellow-500 p-2 rounded">
              Deshacer
            </button>
            <button onClick={volver} className="bg-blue-500 p-2 rounded">
              Volver
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
