import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ElegirEquipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [equipoSeleccionado1, setEquipoSeleccionado1] = useState("");
  const [equipoSeleccionado2, setEquipoSeleccionado2] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const equiposGuardados = JSON.parse(localStorage.getItem("equipos")) || [];
    setEquipos(equiposGuardados);
  }, []);

  const equiposDisponibles2 = equipos.filter(
    (equipo) => equipo !== equipoSeleccionado1
  );

  const handleSelect1 = (e) => {
    setEquipoSeleccionado1(e.target.value);
  };

  const handleSelect2 = (e) => {
    setEquipoSeleccionado2(e.target.value);
  };

  const handleJugar = () => {
    if (equipoSeleccionado1 && equipoSeleccionado2) {
      // Guardar equipos seleccionados en localStorage
      localStorage.setItem("equipoSeleccionado1", equipoSeleccionado1);
      localStorage.setItem("equipoSeleccionado2", equipoSeleccionado2);
      navigate("/partido");
    } else {
      alert("Por favor, selecciona ambos equipos.");
    }
  };

  return (
    <div className="flex items-center justify-center top-10 absolute text-black gap-2 w-full">
      <div className="mb-4">
        <label
          htmlFor="select1"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <select
          id="select1"
          value={equipoSeleccionado1}
          onChange={handleSelect1}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        >
          <option value="">Seleccione un equipo</option>
          {equipos.map((equipo, index) => (
            <option key={index} value={equipo}>
              {equipo}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-2xl text-white text-center mb-6">vs</h1>
      <div className="mb-4">
        <label
          htmlFor="select2"
          className="block text-sm font-medium text-gray-700"
        ></label>
        <select
          id="select2"
          value={equipoSeleccionado2}
          onChange={handleSelect2}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
        >
          <option value="">Seleccione un equipo</option>
          {equiposDisponibles2.map((equipo, index) => (
            <option key={index} value={equipo}>
              {equipo}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleJugar}
        className="w-1/4 flex justify-center mb-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        Jugar
      </button>
    </div>
  );
};
