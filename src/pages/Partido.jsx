import React, { useState, useEffect } from "react";
import Select from "../components/Select";
import FormatCellContent from "../components/FormatCellContent";

export const Partido = () => {
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [tableDataLocal, setTableDataLocal] = useState(
    JSON.parse(localStorage.getItem("tableDataLocal")) ||
      Array(1).fill(Array(10).fill(""))
  );
  const [tableDataVisitante, setTableDataVisitante] = useState(
    JSON.parse(localStorage.getItem("tableDataVisitante")) ||
      Array(1).fill(Array(10).fill(""))
  );
  const [jugadoresLocal, setJugadoresLocal] = useState([]);
  const [jugadoresVisitante, setJugadoresVisitante] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [historyLocal, setHistoryLocal] = useState([]);
  const [historyVisitante, setHistoryVisitante] = useState([]);

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
    localStorage.setItem("tableDataLocal", JSON.stringify(tableDataLocal));
    localStorage.setItem(
      "tableDataVisitante",
      JSON.stringify(tableDataVisitante)
    );
  }, [tableDataLocal, tableDataVisitante]);

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
      if (selectedTable === "local") {
        const updatedData = tableDataLocal.map((row) => {
          const updatedRow = [...row];
          updatedRow[selectedColumn] = updatedRow[selectedColumn]
            ? updatedRow[selectedColumn] + " " + newValues
            : newValues;
          return updatedRow;
        });
        setHistoryLocal([...historyLocal, tableDataLocal]);
        setTableDataLocal(updatedData);
      } else if (selectedTable === "visitante") {
        const updatedData = tableDataVisitante.map((row) => {
          const updatedRow = [...row];
          updatedRow[selectedColumn] = updatedRow[selectedColumn]
            ? updatedRow[selectedColumn] + " " + newValues
            : newValues;
          return updatedRow;
        });
        setHistoryVisitante([...historyVisitante, tableDataVisitante]);
        setTableDataVisitante(updatedData);
      }
      setSelectedColumn(null);
      setSelectedTable(null);
      setShowSelect(false);
    }
  };

  const handleReset = () => {
    setTableDataLocal(Array(1).fill(Array(10).fill("")));
    setTableDataVisitante(Array(1).fill(Array(10).fill("")));
    setHistoryLocal([]);
    setHistoryVisitante([]);
    localStorage.removeItem("tableDataLocal");
    localStorage.removeItem("tableDataVisitante");
  };

  const handleUndo = () => {
    if (selectedTable === "local" && historyLocal.length > 0) {
      setTableDataLocal(historyLocal[historyLocal.length - 1]);
      setHistoryLocal(historyLocal.slice(0, -1));
    } else if (selectedTable === "visitante" && historyVisitante.length > 0) {
      setTableDataVisitante(historyVisitante[historyVisitante.length - 1]);
      setHistoryVisitante(historyVisitante.slice(0, -1));
    }
  };

  return (
    <div className="bg-black text-white w-full mx-auto relative">
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
                {tableDataLocal.map((row, rowIndex) => (
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
                {tableDataVisitante.map((row, rowIndex) => (
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

          <div className="fixed bottom-0 right-0 mt-4 space-x-4">
            <button
              onClick={handleUndo}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
            >
              Deshacer
            </button>
            <button
              onClick={handleReset}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
              Resetear
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
