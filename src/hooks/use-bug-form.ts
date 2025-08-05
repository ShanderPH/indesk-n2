/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BugReportFormData, bugReportSchema } from '@/lib/validations'
import { FormStepKey } from '@/types'
import { AUTO_SAVE_KEY, AUTO_SAVE_INTERVAL } from '@/lib/constants'
import { saveToLocalStorage, loadFromLocalStorage, removeFromLocalStorage } from '@/lib/utils'

const initialFormData: Partial<BugReportFormData> = {
  title: '',
  severity: 'MÉDIO',
  category: 'FUNCIONAL',
  environment: 'PRODUÇÃO',
  igreja: '',
  reportedBy: '',
  email: '',
  userId: '',
  stepsToReproduce: [''],
  actualResult: '',
  expectedResult: '',
  frequency: 'SEMPRE',
  url: '',
  logUrl: '',
  browser: '',
  os: '',
  device: 'DESKTOP',
  evidences: [],
  affectedUsers: 1,
  systemImpact: 'MÉDIO',
  affectedModules: [],
}

export function useBugForm() {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [isAutoSaving, setIsAutoSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  const form = useForm<BugReportFormData>({
    resolver: zodResolver(bugReportSchema),
    defaultValues: initialFormData,
    mode: 'onChange',
  })

  const { watch, setValue, getValues, trigger, formState } = form

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (formState.isDirty) {
      setIsAutoSaving(true)
      try {
        const formData = getValues()
        saveToLocalStorage(AUTO_SAVE_KEY, {
          ...formData,
          lastSaved: new Date().toISOString(),
        })
        setLastSaved(new Date())
      } catch (error) {
        console.error('Error auto-saving form:', error)
      } finally {
        setIsAutoSaving(false)
      }
    }
  }, [formState.isDirty, getValues])

  // Load saved draft on mount
  useEffect(() => {
    const savedData = loadFromLocalStorage<BugReportFormData & { lastSaved: string }>(AUTO_SAVE_KEY)
    if (savedData) {
      Object.entries(savedData).forEach(([key, value]) => {
        if (key !== 'lastSaved' && value !== undefined) {
          setValue(key as keyof BugReportFormData, value, { shouldDirty: false })
        }
      })
      setLastSaved(new Date(savedData.lastSaved))
    }
  }, [setValue])

  // Auto-save interval
  useEffect(() => {
    const interval = setInterval(autoSave, AUTO_SAVE_INTERVAL)
    return () => clearInterval(interval)
  }, [autoSave])

  // Watch form changes for auto-save
  useEffect(() => {
    const subscription = watch(() => {
      // Debounce auto-save on changes
      const timeoutId = setTimeout(autoSave, 2000)
      return () => clearTimeout(timeoutId)
    })
    return () => subscription.unsubscribe()
  }, [watch, autoSave])

  const validateStep = async (step: number): Promise<boolean> => {
    switch (step) {
      case 1:
        return await trigger(['title', 'severity', 'category', 'environment'])
      case 2:
        return await trigger(['igreja', 'reportedBy', 'email', 'userId'])
      case 3:
        return await trigger([
          'stepsToReproduce',
          'actualResult',
          'expectedResult',
          'frequency',
          'url',
          'browser',
          'os',
          'device',
          'affectedUsers',
          'systemImpact',
          'affectedModules',
        ])
      case 4:
        return await trigger()
      default:
        return false
    }
  }

  const nextStep = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1)
      autoSave()
    }
    return isValid
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = async (step: number) => {
    if (step >= 1 && step <= 4) {
      // Validate all previous steps
      for (let i = 1; i < step; i++) {
        const isValid = await validateStep(i)
        if (!isValid) return false
      }
      setCurrentStep(step)
      return true
    }
    return false
  }

  const addStep = (stepValue: string = '') => {
    const currentSteps = getValues('stepsToReproduce')
    setValue('stepsToReproduce', [...currentSteps, stepValue], { shouldDirty: true })
  }

  const removeStep = (index: number) => {
    const currentSteps = getValues('stepsToReproduce')
    if (currentSteps.length > 1) {
      setValue(
        'stepsToReproduce',
        currentSteps.filter((_, i) => i !== index),
        { shouldDirty: true }
      )
    }
  }

  const updateStep = (index: number, value: string) => {
    const currentSteps = getValues('stepsToReproduce')
    const updatedSteps = [...currentSteps]
    updatedSteps[index] = value
    setValue('stepsToReproduce', updatedSteps, { shouldDirty: true })
  }

  const addModule = (module: string) => {
    const currentModules = getValues('affectedModules')
    if (!currentModules.includes(module)) {
      setValue('affectedModules', [...currentModules, module], { shouldDirty: true })
    }
  }

  const removeModule = (module: string) => {
    const currentModules = getValues('affectedModules')
    setValue(
      'affectedModules',
      currentModules.filter((m) => m !== module),
      { shouldDirty: true }
    )
  }

  const clearDraft = () => {
    removeFromLocalStorage(AUTO_SAVE_KEY)
    setLastSaved(null)
  }

  const resetForm = () => {
    form.reset(initialFormData)
    setCurrentStep(1)
    clearDraft()
  }

  const getStepKey = (step: number): FormStepKey => {
    switch (step) {
      case 1:
        return 'basic'
      case 2:
        return 'client'
      case 3:
        return 'reproduction'
      case 4:
        return 'review'
      default:
        return 'basic'
    }
  }

  const getStepProgress = () => {
    return Math.round((currentStep / 4) * 100)
  }

  const isStepValid = (step: number): boolean => {
    const stepKey = getStepKey(step)
    const stepErrors = Object.keys(formState.errors).filter((errorKey) => {
      switch (stepKey) {
        case 'basic':
          return ['title', 'severity', 'category', 'environment'].includes(errorKey)
        case 'client':
          return ['igreja', 'reportedBy', 'email', 'userId'].includes(errorKey)
        case 'reproduction':
          return [
            'stepsToReproduce',
            'actualResult',
            'expectedResult',
            'frequency',
            'url',
            'browser',
            'os',
            'device',
            'affectedUsers',
            'systemImpact',
            'affectedModules',
          ].includes(errorKey)
        case 'review':
          return true
        default:
          return false
      }
    })
    return stepErrors.length === 0
  }

  return {
    form,
    currentStep,
    setCurrentStep,
    nextStep,
    prevStep,
    goToStep,
    validateStep,
    addStep,
    removeStep,
    updateStep,
    addModule,
    removeModule,
    resetForm,
    clearDraft,
    isAutoSaving,
    lastSaved,
    getStepKey,
    getStepProgress,
    isStepValid,
    formData: watch(),
  }
}