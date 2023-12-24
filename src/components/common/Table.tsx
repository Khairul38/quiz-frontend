import React, { ReactNode } from "react";

interface TableProps {
  title?: string;
  count?: string;
  children?: ReactNode;
  className?: string;
}

interface TableHeadProps {
  children?: ReactNode;
}

interface TableBodyProps {
  children?: ReactNode;
}

interface TableRowProps {
  children?: ReactNode;
}

interface TableCellProps {
  head?: boolean;
  shrink?: boolean;
  children?: ReactNode;
  left?: boolean;
  center?: boolean;
  right?: boolean;
  className?: string;
}

const Table: React.FC<TableProps> = ({ title, count, children, className }) => {
  return (
    <div
      className={`${
        className
          ? className
          : "relative bg-white border border-blue-200 rounded-lg dark:bg-gray-700 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 "
      }`}
    >
      <header className="px-5 py-4">
        <h2 className="font-semibold text-lg uppercase text-gray-900 dark:text-white">
          {title} <span className="text-blue-500 font-medium">{count}</span>
        </h2>
      </header>
      <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        <table className="table-auto w-full">{children}</table>
      </div>
    </div>
  );
};

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return (
    <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200 dark:border-gray-800 dark:bg-gray-800/60 dark:text-slate-400">
      {children}
    </thead>
  );
};

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="text-sm divide-y divide-slate-200 dark:divide-gray-800 text-gray-900 dark:text-gray-300">
      {children}
    </tbody>
  );
};

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr>{children}</tr>;
};

const TableCell: React.FC<TableCellProps> = ({
  head,
  shrink,
  children,
  left,
  center,
  right,
  className,
}) => {
  const classes = ["px-5 first:pl-5 last:pr-5 py-3 whitespace-nowrap"];
  if (shrink) classes.push("w-px");

  if (left) classes.push("text-left");
  else if (center) classes.push("text-center");
  else if (right) classes.push("text-right");

  return head ? (
    <th className={classes.join(" ")}>{children}</th>
  ) : (
    <td className={classes.join(" ")}>{children}</td>
  );
};

export { Table, TableHead, TableBody, TableRow, TableCell };
