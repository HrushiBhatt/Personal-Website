interface TechChipProps {
  label: string;
}

export function TechChip({ label }: TechChipProps) {
  return (
    <span className="inline-block font-mono text-[10px] tracking-wide px-2.5 py-1 rounded-full border border-white/8 text-white/35 bg-white/3 whitespace-nowrap">
      {label}
    </span>
  );
}
