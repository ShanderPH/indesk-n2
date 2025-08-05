import * as React from "react"
import { cn } from "@/lib/utils"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"

export interface ToastProps {
  id: string
  type?: "success" | "error" | "warning" | "info"
  title: string
  description?: string
  duration?: number
  onClose?: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({
  id,
  type = "info",
  title,
  description,
  duration = 5000,
  onClose,
}) => {
  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.(id)
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, id, onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  }

  const Icon = icons[type]

  return (
    <div
      className={cn(
        "relative flex w-full items-start gap-3 rounded-lg border p-4 shadow-lg animate-fade-in",
        {
          "border-green-200 bg-green-50 text-green-800": type === "success",
          "border-red-200 bg-red-50 text-red-800": type === "error",
          "border-yellow-200 bg-yellow-50 text-yellow-800": type === "warning",
          "border-blue-200 bg-blue-50 text-blue-800": type === "info",
        }
      )}
    >
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <h4 className="font-medium">{title}</h4>
        {description && (
          <p className="mt-1 text-sm opacity-90">{description}</p>
        )}
      </div>
      <button
        onClick={() => onClose?.(id)}
        className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export { Toast }