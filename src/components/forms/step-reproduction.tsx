'use client'

import { UseFormReturn } from 'react-hook-form'
import { BugReportFormData } from '@/lib/validations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectOption } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FREQUENCY_OPTIONS, 
  DEVICE_OPTIONS, 
  SYSTEM_IMPACT_OPTIONS,
  JIRA_MODULES 
} from '@/lib/constants'
import { Plus, X, Globe } from 'lucide-react'

interface StepReproductionProps {
  form: UseFormReturn<BugReportFormData>
  addStep: (step?: string) => void
  removeStep: (index: number) => void
  updateStep: (index: number, value: string) => void
  addModule: (module: string) => void
  removeModule: (module: string) => void
}

export function StepReproduction({ 
  form, 
  addStep, 
  removeStep, 
  updateStep, 
  addModule, 
  removeModule 
}: StepReproductionProps) {
  const { register, setValue, watch, formState: { errors } } = form
  const formData = watch()

  const handleAddModule = (module: string) => {
    if (!formData.affectedModules?.includes(module)) {
      addModule(module)
    }
  }

  return (
    <div className="space-y-6">
      {/* Reprodução */}
      <Card>
        <CardHeader>
          <CardTitle>🔄 Reprodução do Bug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Passos para Reproduzir *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addStep()}
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Passo
              </Button>
            </div>
            
            {formData.stepsToReproduce?.map((step, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder={`Passo ${index + 1}`}
                    value={step}
                    onChange={(e) => updateStep(index, e.target.value)}
                  />
                </div>
                {formData.stepsToReproduce.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeStep(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {errors.stepsToReproduce && (
              <p className="text-sm text-red-600">{errors.stepsToReproduce.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="actualResult">Resultado Atual *</Label>
              <Textarea
                id="actualResult"
                placeholder="O que acontece quando você segue os passos"
                rows={4}
                {...register('actualResult')}
                error={errors.actualResult?.message}
              />
              {errors.actualResult && (
                <p className="text-sm text-red-600">{errors.actualResult.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedResult">Resultado Esperado *</Label>
              <Textarea
                id="expectedResult"
                placeholder="O que deveria acontecer"
                rows={4}
                {...register('expectedResult')}
                error={errors.expectedResult?.message}
              />
              {errors.expectedResult && (
                <p className="text-sm text-red-600">{errors.expectedResult.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="frequency">Frequência *</Label>
            <Select
              options={FREQUENCY_OPTIONS as unknown as SelectOption[]}
              value={formData.frequency}
              onValueChange={(value) => setValue('frequency', value as BugReportFormData['frequency'])}
              placeholder="Selecione a frequência"
            />
            {errors.frequency && (
              <p className="text-sm text-red-600">{errors.frequency.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Informações Técnicas */}
      <Card>
        <CardHeader>
          <CardTitle>💻 Informações Técnicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="url">URL da Página *</Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                id="url"
                placeholder="https://sistema.igreja.com/pagina"
                className="pl-10"
                {...register('url')}
                error={errors.url?.message}
              />
            </div>
            {errors.url && (
              <p className="text-sm text-red-600">{errors.url.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logUrl">URL do Log (Opcional)</Label>
            <Input
              id="logUrl"
              placeholder="Link para logs ou evidências adicionais"
              {...register('logUrl')}
              error={errors.logUrl?.message}
            />
            {errors.logUrl && (
              <p className="text-sm text-red-600">{errors.logUrl.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="browser">Navegador *</Label>
              <Input
                id="browser"
                placeholder="Chrome 120, Firefox 119, etc."
                {...register('browser')}
                error={errors.browser?.message}
              />
              {errors.browser && (
                <p className="text-sm text-red-600">{errors.browser.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="os">Sistema Operacional *</Label>
              <Input
                id="os"
                placeholder="Windows 11, macOS 14, etc."
                {...register('os')}
                error={errors.os?.message}
              />
              {errors.os && (
                <p className="text-sm text-red-600">{errors.os.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="device">Dispositivo *</Label>
              <Select
                options={DEVICE_OPTIONS as unknown as SelectOption[]}
                value={formData.device}
                onValueChange={(value) => setValue('device', value as BugReportFormData['device'])}
                placeholder="Selecione o dispositivo"
              />
              {errors.device && (
                <p className="text-sm text-red-600">{errors.device.message}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Impacto */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Análise de Impacto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="affectedUsers">Usuários Afetados *</Label>
              <Input
                id="affectedUsers"
                type="number"
                min="1"
                placeholder="Número de usuários"
                {...register('affectedUsers', { valueAsNumber: true })}
                error={errors.affectedUsers?.message}
              />
              {errors.affectedUsers && (
                <p className="text-sm text-red-600">{errors.affectedUsers.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemImpact">Impacto no Sistema *</Label>
              <Select
                options={SYSTEM_IMPACT_OPTIONS as unknown as SelectOption[]}
                value={formData.systemImpact}
                onValueChange={(value) => setValue('systemImpact', value as BugReportFormData['systemImpact'])}
                placeholder="Selecione o impacto"
              />
              {errors.systemImpact && (
                <p className="text-sm text-red-600">{errors.systemImpact.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Módulos Afetados *</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.affectedModules?.map((module) => (
                <Badge key={module} variant="secondary" className="cursor-pointer">
                  {module}
                  <X 
                    className="w-3 h-3 ml-1" 
                    onClick={() => removeModule(module)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {JIRA_MODULES.filter(module => !formData.affectedModules?.includes(module)).map((module) => (
                <Button
                  key={module}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddModule(module)}
                >
                  + {module}
                </Button>
              ))}
            </div>
            {errors.affectedModules && (
              <p className="text-sm text-red-600">{errors.affectedModules.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}