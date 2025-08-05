'use client'

import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { BugReportFormData } from '@/lib/validations'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/toast-provider'
import { 
  generateJiraTemplate, 
  generateMarkdownTemplate, 
  generateJSONTemplate 
} from '@/lib/jira-template'
import { 
  Copy, 
  Download, 
  Eye, 
  EyeOff, 
  FileText, 
  Code, 
  FileJson,
  Check,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface StepReviewProps {
  form: UseFormReturn<BugReportFormData>
}

export function StepReview({ form }: StepReviewProps) {
  const { watch, formState: { errors, isValid } } = form
  const formData = watch()
  const { addToast } = useToast()
  
  const [selectedFormat, setSelectedFormat] = useState<'jira' | 'markdown' | 'json'>('jira')
  const [isPreviewExpanded, setIsPreviewExpanded] = useState(true)

  const templates = {
    jira: generateJiraTemplate(formData as any),
    markdown: generateMarkdownTemplate(formData as any),
    json: generateJSONTemplate(formData as any)
  }

  const formatLabels = {
    jira: 'JIRA',
    markdown: 'Markdown',
    json: 'JSON'
  }

  const formatIcons = {
    jira: FileText,
    markdown: FileText,
    json: FileJson
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      addToast({
        type: 'success',
        title: 'Copiado!',
        description: 'Template copiado para a área de transferência'
      })
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Não foi possível copiar o template'
      })
    }
  }

  const downloadTemplate = (format: string, content: string) => {
    const extensions = { jira: 'txt', markdown: 'md', json: 'json' }
    const extension = extensions[format as keyof typeof extensions] || 'txt'
    const filename = `bug-report-${Date.now()}.${extension}`
    
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const getValidationSummary = () => {
    const totalErrors = Object.keys(errors).length
    const hasRequiredFields = formData.title && formData.igreja && formData.email
    const hasSteps = formData.stepsToReproduce?.length > 0
    
    return {
      isComplete: isValid && hasRequiredFields && hasSteps,
      totalErrors,
      missingRequired: !hasRequiredFields,
      missingSteps: !hasSteps
    }
  }

  const validation = getValidationSummary()

  return (
    <div className="space-y-6">
      {/* Validation Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {validation.isComplete ? (
              <Check className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span>Validação do Formulário</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Status Geral:</span>
              <Badge variant={validation.isComplete ? "success" : "destructive"}>
                {validation.isComplete ? "Completo" : "Incompleto"}
              </Badge>
            </div>
            
            {validation.totalErrors > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2">
                  ⚠️ {validation.totalErrors} erro(s) encontrado(s):
                </h4>
                <ul className="text-sm text-red-700 space-y-1">
                  {Object.entries(errors).map(([field, error]) => (
                    <li key={field}>• {field}: {error?.message}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {validation.isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">
                  ✅ Formulário completo e pronto para gerar o template JIRA!
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Form Summary */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Resumo do Bug Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Informações Básicas</h4>
              <ul className="space-y-1">
                <li><strong>Título:</strong> {formData.title || 'Não informado'}</li>
                <li><strong>Severidade:</strong> 
                  <Badge variant="outline" className="ml-2">{formData.severity}</Badge>
                </li>
                <li><strong>Categoria:</strong> {formData.category}</li>
                <li><strong>Ambiente:</strong> {formData.environment}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Cliente</h4>
              <ul className="space-y-1">
                <li><strong>Igreja:</strong> {formData.igreja || 'Não informado'}</li>
                <li><strong>Usuário:</strong> {formData.reportedBy || 'Não informado'}</li>
                <li><strong>E-mail:</strong> {formData.email || 'Não informado'}</li>
                <li><strong>Usuários Afetados:</strong> {formData.affectedUsers || 0}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Técnico</h4>
              <ul className="space-y-1">
                <li><strong>Passos:</strong> {formData.stepsToReproduce?.length || 0} etapas</li>
                <li><strong>Dispositivo:</strong> {formData.device}</li>
                <li><strong>Navegador:</strong> {formData.browser || 'Não informado'}</li>
                <li><strong>Evidências:</strong> {formData.evidences?.length || 0} arquivos</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Impacto</h4>
              <ul className="space-y-1">
                <li><strong>Impacto:</strong> 
                  <Badge variant="outline" className="ml-2">{formData.systemImpact}</Badge>
                </li>
                <li><strong>Frequência:</strong> {formData.frequency}</li>
                <li><strong>Módulos:</strong> {formData.affectedModules?.length || 0}</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Template Generator */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>🎯 Template Gerado</CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewExpanded(!isPreviewExpanded)}
              >
                {isPreviewExpanded ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Format Selector */}
          <div className="flex space-x-2">
            {Object.entries(formatLabels).map(([format, label]) => {
              const Icon = formatIcons[format as keyof typeof formatIcons]
              return (
                <Button
                  key={format}
                  type="button"
                  variant={selectedFormat === format ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFormat(format as any)}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </Button>
              )
            })}
          </div>

          {/* Template Actions */}
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(templates[selectedFormat])}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copiar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => downloadTemplate(selectedFormat, templates[selectedFormat])}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Template Preview */}
          {isPreviewExpanded && (
            <div className="space-y-2">
              <Label>Preview do Template {formatLabels[selectedFormat]}</Label>
              <Textarea
                value={templates[selectedFormat]}
                readOnly
                rows={20}
                className="font-mono text-xs"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Próximos Passos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-800 mb-2">📝 Como usar o template:</h4>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Copie o template JIRA gerado acima</li>
                <li>Acesse o sistema JIRA da equipe</li>
                <li>Crie uma nova issue do tipo "Bug"</li>
                <li>Cole o template na descrição</li>
                <li>Anexe as evidências manualmente</li>
                <li>Configure os campos personalizados</li>
                <li>Salve e atribua à equipe responsável</li>
              </ol>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-medium text-amber-800 mb-2">⚠️ Lembrete Importante:</h4>
              <p className="text-sm text-amber-700">
                Este template foi gerado automaticamente. Revise as informações antes 
                de criar o ticket no JIRA e certifique-se de que todas as evidências 
                foram anexadas corretamente.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}