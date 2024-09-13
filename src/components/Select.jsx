import React from "react";

/**
 * Componente Select con soporte para desplazamiento.
 * @param {Object} props - Props del componente.
 * @param {Array} props.options - Opciones para el select.
 * @param {string} props.selectedOption - Opción seleccionada.
 * @param {Function} props.onChange - Función de cambio.
 * @returns {JSX.Element} - Elemento JSX del select.
 */
const Select = ({ options, selectedOption, onChange }) => {
  return (
    <select
      value={selectedOption}
      onChange={onChange}
      multiple
      className="absolute top-0 left-0 mt-1 bg-gray-800 text-white border border-gray-600 rounded z-10"
      style={{
        textAlign: "center",
        width: "30px",
        height: "auto",
        maxHeight: "80px",
        overflowY: "auto",
      }}
      size="10"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
