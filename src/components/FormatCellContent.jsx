import React from "react";

/**
 * Esta función convierte el contenido de las celdas a un formato vertical.
 * @param {string} content - Contenido de la celda.
 * @returns {JSX.Element} - Elemento JSX con el contenido vertical.
 */
const FormatCellContent = ({ content }) => {
  const numbers = content.split(" ").filter(Boolean); // Elimina cualquier valor vacío
  let newContent = [];

  for (let i = 0; i < numbers.length; i += 3) {
    newContent.push(<div key={i}>{numbers.slice(i, i + 3).join(" ")}</div>);
  }

  return <div>{newContent}</div>;
};

export default FormatCellContent;
