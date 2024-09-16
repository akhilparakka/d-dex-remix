export const columns = [
  {
    accessorKey: "market",
    header: "Pair",
    enableSorting: false,
    cell: (props) => {
      const value = props.getValue();
      const parts = value.split(" / ");
      const prefix1 = parts[0].split(":")[0];
      const prefix2 = parts[1].split(":")[0];

      return <p>{`${prefix1}/${prefix2}`}</p>;
    },
  },
  {
    accessorKey: "newest_price",
    header: "Price",
    enableSorting: false,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "price_change_24hr",
    header: "24Hr",
    enableSorting: false,
    cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: "base_volume_24hr",
    header: "Volume",
    enableSorting: true,
    cell: (props) => <p>{props.getValue()}</p>,
  },
];
