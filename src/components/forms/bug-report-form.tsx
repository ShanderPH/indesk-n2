/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useBugForm } from '@/hooks/use-bug-form'
import { FormProgress } from './form-progress'
import { StepBasicInfo } from './step-basic-info'
import { StepClientInfo } from './step-client-info'
import { StepReproduction } from './step-reproduction'
import { EvidenceUpload } from './evidence-upload'
import { StepReview } from './step-review'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast-provider'
import { ArrowLeft, ArrowRight, RotateCcw, Save } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export function BugReportForm() {
  const {
    form,
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    addStep,
    removeStep,
    updateStep,
    addModule,
    removeModule,
    resetForm,
    isAutoSaving,
    lastSaved,
    isStepValid,
    formData
  } = useBugForm()
  
  const { addToast } = useToast()

  const handleNextStep = async () => {
    const success = await nextStep()
    if (!success) {
      addToast({
        type: 'error',
        title: 'Formulário Incompleto',
        description: 'Por favor, preencha todos os campos obrigatórios antes de continuar.'
      })
    }
  }

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // Here you would typically send the data to your API
      console.log('Form submitted:', data)
      
      addToast({
        type: 'success',
        title: 'Bug Report Criado!',
        description: 'O template JIRA foi gerado com sucesso.'
      })
    } catch {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível processar o formulário.'
      })
    }
  })

  const handleReset = () => {
    resetForm()
    addToast({
      type: 'success',
      title: 'Formulário Limpo',
      description: 'Todos os dados foram removidos.'
    })
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <StepBasicInfo form={form as any} />
      case 2:
        return <StepClientInfo form={form as any} />
      case 3:
        return (
          <div className="space-y-6">
            <StepReproduction 
              form={form as any}
              addStep={addStep}
              removeStep={removeStep}
              updateStep={updateStep}
              addModule={addModule}
              removeModule={removeModule}
            />
            <EvidenceUpload form={form as any} />
          </div>
        )
      case 4:
        return <StepReview form={form as any} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🐛 Gerador de Bug Reports JIRA
        </h1>
        <p className="text-gray-600">
          Crie relatórios detalhados de bugs para a equipe de desenvolvimento
        </p>
      </div>

      {/* Auto-save indicator */}
      {(isAutoSaving || lastSaved) && (
        <Card>
          <CardContent className="py-3">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              {isAutoSaving ? (
                <>
                  <Save className="w-4 h-4 animate-spin" />
                  <span>Salvando rascunho...</span>
                </>
              ) : lastSaved ? (
                <>
                  <Save className="w-4 h-4" />
                  <span>Rascunho salvo em {formatDate(lastSaved)}</span>
                </>
              ) : null}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress */}
      <FormProgress
        currentStep={currentStep}
        isStepValid={isStepValid}
        onStepClick={goToStep}
      />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {renderCurrentStep()}

        {/* Navigation */}
        <Card>
          <CardContent className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Limpar
                </Button>
              </div>

              <div className="flex space-x-2">
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                  >
                    Próximo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!isStepValid(4)}
                  >
                    Gerar Template
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="bg-gray-50">
          <CardContent className="py-4">
            <details>
              <summary className="cursor-pointer font-medium">Debug Info</summary>
              <pre className="mt-2 text-xs overflow-auto">
                {JSON.stringify({ currentStep, formData }, null, 2)}
              </pre>
            </details>
          </CardContent>
        </Card>
      )}
    </div>
  )
}