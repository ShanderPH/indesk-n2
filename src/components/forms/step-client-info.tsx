'use client'

import { UseFormReturn } from 'react-hook-form'
import { BugReportFormData } from '@/lib/validations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface StepClientInfoProps {
  form: UseFormReturn<BugReportFormData>
}

export function StepClientInfo({ form }: StepClientInfoProps) {
  const { register, formState: { errors } } = form

  return (
    <Card>
      <CardHeader>
        <CardTitle>👥 Informações do Cliente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="igreja">Nome da Igreja *</Label>
          <Input
            id="igreja"
            placeholder="Ex: Igreja Batista Central"
            {...register('igreja')}
            error={errors.igreja?.message}
          />
          {errors.igreja && (
            <p className="text-sm text-red-600">{errors.igreja.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reportedBy">Reportado por *</Label>
            <Input
              id="reportedBy"
              placeholder="Nome completo do usuário"
              {...register('reportedBy')}
              error={errors.reportedBy?.message}
            />
            {errors.reportedBy && (
              <p className="text-sm text-red-600">{errors.reportedBy.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              placeholder="usuario@igreja.com"
              {...register('email')}
              error={errors.email?.message}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="userId">ID do Usuário *</Label>
          <Input
            id="userId"
            placeholder="ID único do usuário no sistema"
            {...register('userId')}
            error={errors.userId?.message}
          />
          {errors.userId && (
            <p className="text-sm text-red-600">{errors.userId.message}</p>
          )}
          <p className="text-xs text-gray-500">
            ID interno do usuário para facilitar a investigação
          </p>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">⚠️ Dados Importantes:</h4>
          <ul className="text-sm text-amber-700 space-y-1">
            <li>• Verifique se os dados estão corretos</li>
            <li>• O e-mail será usado para contato sobre o bug</li>
            <li>• O ID do usuário ajuda na investigação técnica</li>
            <li>• Mantenha a privacidade dos dados pessoais</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}