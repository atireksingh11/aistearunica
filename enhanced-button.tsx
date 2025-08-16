import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EnhancedButtonProps extends ButtonProps {
  animation?: "lift" | "glow" | "scale" | "none"
  loading?: boolean
}

export function EnhancedButton({
  children,
  className,
  animation = "lift",
  loading = false,
  disabled,
  ...props
}: EnhancedButtonProps) {
  const getAnimationClass = () => {
    switch (animation) {
      case "lift":
        return "hover-lift"
      case "glow":
        return "hover-glow"
      case "scale":
        return "hover-scale"
      default:
        return ""
    }
  }

  return (
    <Button
      className={cn(
        getAnimationClass(),
        "transition-all duration-300 focus-ring",
        loading && "cursor-not-allowed opacity-70",
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
