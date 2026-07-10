import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

export function Button({ variant = "primary", className, type = "button", ref, ...props }: { variant?: Variant; ref?: React.Ref<HTMLButtonElement> } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button ref={ref} type={type} className={cn("button", variant, className)} {...props} />;
}
