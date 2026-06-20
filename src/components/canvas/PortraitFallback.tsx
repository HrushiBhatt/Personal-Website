interface Props { className?: string }

export function PortraitFallback({ className }: Props) {
  return (
    <div className={`rounded-full overflow-hidden bg-[#141416] ${className ?? ''}`}>
      <img
        src="/images/profile.jpg"
        alt="Hrushi Bhatt"
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}
