"use client";

import { ReactNode, useState } from "react";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => ReactNode);
  className?: string;
}

interface ResponsiveTableProps<T> {
  data: T[];
  columns: Column<T>[];
  mobileCardTitle: (item: T) => ReactNode;
  mobileCardSubtitle?: (item: T) => ReactNode;
  actions?: (item: T) => ReactNode;
}

export default function ResponsiveTable<T extends { id: string | number }>({
  data,
  columns,
  mobileCardTitle,
  mobileCardSubtitle,
  actions,
}: ResponsiveTableProps<T>) {
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const toggleExpand = (id: string | number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="w-full">
      {/* Desktop Table View */}
      <div className="hidden md:block glass rounded-2xl overflow-hidden border border-white/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              {columns.map((col, idx) => (
                <th key={idx} className={`p-4 font-bold text-xs uppercase tracking-widest text-foreground/50 ${col.className}`}>
                  {col.header}
                </th>
              ))}
              {actions && <th className="p-4 text-right"></th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                {columns.map((col, idx) => (
                  <td key={idx} className={`p-4 text-sm ${col.className}`}>
                    {typeof col.accessor === "function" 
                      ? col.accessor(item) 
                      : (item[col.accessor] as ReactNode)}
                  </td>
                ))}
                {actions && (
                  <td className="p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    {actions(item)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack View */}
      <div className="md:hidden space-y-4">
        {data.map((item) => (
          <div key={item.id} className="glass rounded-2xl border border-white/10 overflow-hidden">
            <div 
              onClick={() => toggleExpand(item.id)}
              className="p-5 flex justify-between items-center cursor-pointer active:bg-white/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="font-bold text-foreground">{mobileCardTitle(item)}</div>
                  {mobileCardSubtitle && (
                    <div className="text-xs text-foreground/50 mt-1">{mobileCardSubtitle(item)}</div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {actions && <div onClick={(e) => e.stopPropagation()}>{actions(item)}</div>}
                {expandedId === item.id ? <ChevronUp className="w-5 h-5 text-foreground/40" /> : <ChevronDown className="w-5 h-5 text-foreground/40" />}
              </div>
            </div>

            <AnimatePresence>
              {expandedId === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 pt-0 border-t border-white/5 bg-white/5"
                >
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {columns.map((col, idx) => (
                      <div key={idx} className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">{col.header}</p>
                        <div className="text-sm font-medium">
                          {typeof col.accessor === "function" 
                            ? col.accessor(item) 
                            : (item[col.accessor] as ReactNode)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
