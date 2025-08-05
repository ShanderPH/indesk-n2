'use client'

import { UseFormReturn } from 'react-hook-form'
import { BugReportFormData } from '@/lib/validations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectOption } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { SEVERITY_OPTIONS, CATEGORY_OPTIONS, ENVIRONMENT_OPTIONS } from '@/lib/constants'

interface StepBasicInfoProps {
  form: UseFormReturn<BugReportFormData>
}

export function StepBasicInfo({ form }: StepBasicInfoProps) {
  const { register, setValue, watch, formState: { errors } } = form
  const formData = watch()

  return (
    <Card>
      <CardHeader>
        <CardTitle>📋 Informações Básicas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Título do Bug *</Label>
          <Input
            id="title"
            placeholder="Ex: Login não funciona após atualização"
            {...register('title')}
            error={errors.title?.message}
          />
          {errors.title && (
            <p className="text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="severity">Severidade *</Label>
            <Select
              options={SEVERITY_OPTIONS as unknown as SelectOption[]}
              value={formData.severity}
              onValueChange={(value) => setValue('severity', value as BugReportFormData['severity'])}
              placeholder="Selecione a severidade"
            />
            {errors.severity && (
              <p className="text-sm text-red-600">{errors.severity.message}</p>
            )}
            <div className="text-xs text-gray-500 space-y-1">
              <div><strong>Bloqueador:</strong> Sistema inoperante</div>
              <div><strong>Crítico:</strong> Funcionalidade principal afetada</div>
              <div><strong>Alto:</strong> Impacto significativo</div>
              <div><strong>Médio:</strong> Impacto moderado</div>
              <div><strong>Baixo:</strong> Impacto mínimo</div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Categoria *</Label>
            <Select
              options={CATEGORY_OPTIONS as unknown as SelectOption[]}
              value={formData.category}
              onValueChange={(value) => setValue('category', value as BugReportFormData['category'])}
              placeholder="Selecione a categoria"
            />
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="environment">Ambiente *</Label>
          <Select
            options={ENVIRONMENT_OPTIONS as unknown as SelectOption[]}
            value={formData.environment}
            onValueChange={(value) => setValue('environment', value as BugReportFormData['environment'])}
            placeholder="Selecione o ambiente"
          />
          {errors.environment && (
            <p className="text-sm text-red-600">{errors.environment.message}</p>
          )}
          <p className="text-xs text-gray-500">
            Ambiente onde o bug foi identificado
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-800 mb-2">💡 Dicas para um bom título:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Seja específico e descritivo</li>
            <li>• Inclua a funcionalidade afetada</li>
            <li>• Evite palavras como &quot;não funciona&quot; sem contexto</li>
            <li>• Exemplo: &quot;Botão de salvar não responde na tela de cadastro de membros&quot;</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}