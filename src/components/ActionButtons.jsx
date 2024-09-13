import React from "react";

export const ActionButtons = ({ onReset, onUndo, onBack }) => {
  return (
    <div className="fixed bottom-0 right-0 mt-4 space-x-4 pr-4">
      <button onClick={onReset} className="bg-red-500 p-2 rounded">
        Resetear
      </button>
      <button onClick={onUndo} className="bg-yellow-500 p-2 rounded">
        Terminar
      </button>
      <button onClick={onBack} className="bg-blue-500 p-2 rounded">
        Volver
      </button>
    </div>
  );
};
