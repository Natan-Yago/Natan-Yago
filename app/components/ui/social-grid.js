const cx = (...classes) => classes.filter(Boolean).join(" ");
import SpotlightBorder from "./spotlight-border";

export default function SocialGrid({
  items = [],
  className = "",
  borderColor = "hsl(var(--primary))",
  spotlightSize = "30% 30px",
}) {
  return (
    <div
      role="list"
      className={cx(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px bg-border",
        className
      )}
    >
      {items.map((label) => (
        <div role="listitem" key={label}>
          <SpotlightBorder
            className="h-full w-full"
            borderColor={borderColor}
            spotlightSize={spotlightSize}
            radiusClass="rounded-none"
          >
            <div className="bg-background text-xs md:text-sm text-muted-foreground flex items-center justify-center px-4 py-6 min-h-[56px]">
              {label}
            </div>
          </SpotlightBorder>
        </div>
      ))}
    </div>
  );
}
