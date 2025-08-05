'use client'

import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { FORM_STEPS } from '@/lib/constants'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FormProgressProps {
  currentStep: number
  isStepValid: (step: number) => boolean
  onStepClick: (step: number) => void
}

export function FormProgress({ currentStep, isStepValid, onStepClick }: FormProgressProps) {
  const progress = Math.round(((currentStep - 1) / (FORM_STEPS.length - 1)) * 100)

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Progresso do Formulário</h2>
        <Badge variant="outline">{progress}% Concluído</Badge>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="flex justify-between">
        {FORM_STEPS.map((step) => {
          const isCompleted = currentStep > step.id
          const isActive = currentStep === step.id
          const isValid = isStepValid(step.id)
          const isClickable = step.id <= currentStep || isCompleted

          return (
            <button
              key={step.id}
              onClick={() => isClickable && onStepClick(step.id)}
              disabled={!isClickable}
              className={cn(
                "flex flex-col items-center text-center space-y-2 p-2 rounded-lg transition-all",
                "disabled:cursor-not-allowed disabled:opacity-50",
                isClickable && "hover:bg-gray-50 cursor-pointer",
                isActive && "bg-blue-50 border border-blue-200"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                  isCompleted
                    ? "bg-green-500 text-white"
                    : isActive
                    ? "bg-blue-500 text-white"
                    : isValid
                    ? "bg-gray-200 text-gray-700"
                    : "bg-red-100 text-red-600 border border-red-300"
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{step.id}</span>
                )}
              </div>
              
              <div className="max-w-[120px]">
                <p className={cn(
                  "text-xs font-medium",
                  isActive ? "text-blue-600" : "text-gray-600"
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {step.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}