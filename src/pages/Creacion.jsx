import React, { useState, useEffect } from "react";
import { ElegirEquipos } from "../components/ElegirEquipos";

export const Creacion = () => {
  const [equipo, setEquipo] = useState("");
  const [equipos, setEquipos] = useState([]);
  const [jugador, setJugador] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState("");
  const [jugadores, setJugadores] = useState({});
  const [alertaEquipo, setAlertaEquipo] = useState("");
  const [alertaJugador, setAlertaJugador] = useState("");

  useEffect(() => {
    const equiposGuardados = JSON.parse(localStorage.getItem("equipos")) || [];
    setEquipos(equiposGuardados);
    const jugadoresGuardados =
      JSON.parse(localStorage.getItem("jugadores")) || {};
    setJugadores(jugadoresGuardados);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (equipo.trim()) {
      if (equipos.includes(equipo)) {
        setAlertaEquipo("Este equipo ya existe.");
        return;
      }
      const nuevosEquipos = [...equipos, equipo];
      setEquipos(nuevosEquipos);
      localStorage.setItem("equipos", JSON.stringify(nuevosEquipos));
      setEquipo("");
      setAlertaEquipo("");
    }
  };

  const handleDelete = (equipoAEliminar) => {
    const equiposActualizados = equipos.filter(
      (equipo) => equipo !== equipoAEliminar
    );
    setEquipos(equiposActualizados);
    localStorage.setItem("equipos", JSON.stringify(equiposActualizados));

    const { [equipoAEliminar]: _, ...jugadoresActualizados } = jugadores;
    setJugadores(jugadoresActualizados);
    localStorage.setItem("jugadores", JSON.stringify(jugadoresActualizados));
  };

  const handleAddJugador = () => {
    if (jugador.trim() && equipoSeleccionado) {
      setJugadores((prevJugadores) => {
        const jugadoresDelEquipo = prevJugadores[equipoSeleccionado] || [];
        if (jugadoresDelEquipo.includes(jugador)) {
          setAlertaJugador("Este jugador ya está en el equipo.");
          return prevJugadores;
        }
        const nuevosJugadores = [...jugadoresDelEquipo, jugador];
        const jugadoresActualizados = {
          ...prevJugadores,
          [equipoSeleccionado]: nuevosJugadores,
        };

        localStorage.setItem(
          "jugadores",
          JSON.stringify(jugadoresActualizados)
        );
        setAlertaJugador("");
        return jugadoresActualizados;
      });
      setJugador("");
    }
  };

  const handleSelectEquipo = (e) => {
    setEquipoSeleccionado(e.target.value);
  };

  const handleDeleteJugador = (jugadorAEliminar) => {
    setJugadores((prevJugadores) => {
      const jugadoresDelEquipo = prevJugadores[equipoSeleccionado].filter(
        (j) => j !== jugadorAEliminar
      );
      const jugadoresActualizados = {
        ...prevJugadores,
        [equipoSeleccionado]: jugadoresDelEquipo,
      };

      localStorage.setItem("jugadores", JSON.stringify(jugadoresActualizados));
      return jugadoresActualizados;
    });
  };

  return (
    <main className="flex items-start justify-center mt-20">
      <ElegirEquipos></ElegirEquipos>
      {/* EQUIPOS */}
      <div className="bg-white p-4 rounded-lg shadow-md text-black w-1/2 max-w-lg top-24 left-0 ">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="equipo"
              name="equipo"
              value={equipo}
              onChange={(e) => setEquipo(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Nombre del equipo"
              required
            />
          </div>
          {alertaEquipo && (
            <div className="mb-4 text-red-600">{alertaEquipo}</div>
          )}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Agregar Equipo
            </button>
          </div>
        </form>
        <div>
          <label
            htmlFor="equipoSelect"
            className="block text-sm font-medium text-gray-700"
          >
            Equipos
          </label>
          <ul className="mt-2 space-y-2">
            {equipos.map((equipo, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <span>{equipo}</span>
                <button
                  onClick={() => handleDelete(equipo)}
                  className="ml-4 px-2 py-1 border border-red-600 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* JUGADORES */}
      <div className="w-1/2 max-w-lg p-4 ml-4 bg-white rounded-lg shadow-md text-black  right-0 top-24">
        <div className="mb-4">
          <select
            id="equipoSelect"
            value={equipoSeleccionado}
            onChange={handleSelectEquipo}
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
        <div className="mb-4">
          <input
            type="text"
            id="jugador"
            name="jugador"
            value={jugador}
            onChange={(e) => setJugador(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Número del jugador"
            required
          />
        </div>
        {alertaJugador && (
          <div className="mb-4 text-red-600">{alertaJugador}</div>
        )}
        <div className="mb-4">
          <button
            onClick={handleAddJugador}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Agregar Jugador
          </button>
        </div>
        {equipoSeleccionado && (
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Jugadores en {equipoSeleccionado}
            </h3>
            <ul className="mt-2 space-y-2">
              {jugadores[equipoSeleccionado]?.map((jugador, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md shadow-sm"
                >
                  <span>{jugador}</span>
                  <button
                    onClick={() => handleDeleteJugador(jugador)}
                    className="ml-4 px-2 py-1 border border-red-600 rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
};
