import { createContext, useContext, useState } from "react";

const TableContext = createContext();

export const useTable = () => useContext(TableContext);

export const TableProvider = ({ children }) => {
  const [selectedTable, setSelectedTable] = useState(1);

  return (
    <TableContext.Provider value={{ selectedTable, setSelectedTable }}>
      {children}
    </TableContext.Provider>
  );
};