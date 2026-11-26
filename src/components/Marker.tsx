type Props = { index: string; label: React.ReactNode; className?: string; as?: 'h2' | 'h3' | 'p' };

/** Swiss section header: (01) — LABEL, sitting on a hairline. */
export function Marker({ index, label, className = '', as: Tag = 'h2' }: Props) {
  return (
    <div className={`flex items-baseline gap-4 border-t border-hairline pt-3 ${className}`}>
      <span className="ui-label text-[0.6875rem] text-steel-300">{index}</span>
      <Tag className="font-sans text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ice-100">
        {label}
      </Tag>
    </div>
  );
}
