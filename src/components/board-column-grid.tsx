"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

function getColumnCount() {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 1024px)").matches) return 4;
  return 2;
}

function splitIntoColumns<T>(items: T[], columnCount: number): T[][] {
  return Array.from({ length: columnCount }, (_, columnIndex) =>
    items.filter((_, index) => index % columnCount === columnIndex),
  );
}

interface BoardColumnGridProps<T> {
  items: T[];
  getKey: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
  columnClassName?: string;
}

export function BoardColumnGrid<T>({
  items,
  getKey,
  renderItem,
  className,
  columnClassName,
}: BoardColumnGridProps<T>) {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const mediaLg = window.matchMedia("(min-width: 1024px)");

    const update = () => setColumnCount(getColumnCount());
    update();

    mediaLg.addEventListener("change", update);
    return () => {
      mediaLg.removeEventListener("change", update);
    };
  }, []);

  const columns = useMemo(
    () => splitIntoColumns(items, columnCount),
    [items, columnCount],
  );

  return (
    <div
      className={cn(
        "grid items-start gap-3 sm:gap-5 md:gap-6",
        columnCount === 2 && "grid-cols-2",
        columnCount === 4 && "grid-cols-4",
        className,
      )}
    >
      {columns.map((columnItems, columnIndex) => (
        <div
          key={columnIndex}
          className={cn("flex min-w-0 flex-col gap-4 sm:gap-5 md:gap-6", columnClassName)}
        >
          {columnItems.map((item) => (
            <div key={getKey(item)} className="w-full min-w-0">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
