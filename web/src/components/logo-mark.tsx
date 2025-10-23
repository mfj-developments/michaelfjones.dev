import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export default function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block aspect-square", className)}
      style={{
        background: "linear-gradient(135deg, var(--text-gradient-start), var(--text-gradient-end))",
        backgroundColor: "var(--text-gradient-mid)",
        WebkitMaskImage: "url('/mfj-logo-big.svg')",
        maskImage: "url('/mfj-logo-big.svg')",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}
