import { useMemo, useState, useEffect } from "react";
import { columns } from "../common/constants";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
} from "@tanstack/react-table";

const MarketTable = ({ data }) => {
  const [sorting, setSorting] = useState([
    { id: "base_volume_24hr", desc: true },
  ]);
  const [filterText, setFilterText] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const filteredData = useMemo(() => {
    const lowerCaseFilterText = filterText.toLowerCase();
    const filterWords = lowerCaseFilterText.split(" ");

    return data.filter((row) => {
      const [part1, part2] = row.market.split(" / ");
      const lowerCasePart1 = part1.toLowerCase();
      const lowerCasePart2 = part2.toLowerCase();

      return filterWords.every(
        (word) => lowerCasePart1.includes(word) || lowerCasePart2.includes(word)
      );
    });
  }, [filterText]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const handleFilterClick = (filter) => {
    setFilterText(filter);
    setActiveFilter(filter);
  };

  const handleTopVolumeClick = () => {
    setFilterText("");
    setActiveFilter("");
  };

  return (
    <div className="market_table_container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    cursor: header.column.getCanSort() ? "pointer" : "default",
                  }}
                >
                  {header.column.columnDef.header}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;
