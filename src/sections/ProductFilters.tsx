import type { FragranceFamily } from "@/types";
import { useLanguage } from "@/hooks/useLanguage";

interface ProductFiltersProps {
  activeFilter: FragranceFamily | "all";
  onFilterChange: (filter: FragranceFamily | "all") => void;
  count: number;
}

const filters: { key: FragranceFamily | "all"; labelKey: string }[] = [
  { key: "all", labelKey: "shop.filters.all" },
  { key: "floral", labelKey: "shop.filters.floral" },
  { key: "oriental", labelKey: "shop.filters.oriental" },
  { key: "woody", labelKey: "shop.filters.woody" },
  { key: "sweet", labelKey: "shop.filters.sweet" },
  { key: "fresh", labelKey: "shop.filters.fresh" },
];

export function ProductFilters({ activeFilter, onFilterChange, count }: ProductFiltersProps) {
  const { t } = useLanguage();

  return (
    <div className="sticky top-20 z-100 bg-ivory border-b border-gold-light py-4 shadow-sm">
      <div className="container-main flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter.key
                  ? "bg-gold text-oud border border-gold"
                  : "bg-transparent text-oud border border-gold-light hover:bg-sand"
              }`}
            >
              {t(filter.labelKey)}
            </button>
          ))}
        </div>
        <p className="text-xs text-oud/50">
          {count} {t("shop.results")}
        </p>
      </div>
    </div>
  );
}
