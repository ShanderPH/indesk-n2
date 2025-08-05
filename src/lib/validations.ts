import { z } from 'zod'

export const evidenceSchema = z.object({
  id: z.string(),
  description: z.string().min(1, 'Descrição da evidência é obrigatória'),
  file: z.any().optional(),
  url: z.string().url('URL inválida').optional(),
  type: z.enum(['IMAGE', 'VIDEO', 'LOG']),
  size: z.number().optional(),
  createdAt: z.date().optional(),
})

export const bugReportSchema = z.object({
  id: z.string().optional(),
  
  // Classificação e Impacto
  title: z.string()
    .min(10, 'Título deve ter pelo menos 10 caracteres')
    .max(200, 'Título não pode exceder 200 caracteres'),
  severity: z.enum(['BLOQUEADOR', 'CRÍTICO', 'ALTO', 'MÉDIO', 'BAIXO']),
  category: z.enum(['FUNCIONAL', 'VISUAL', 'PERFORMANCE', 'SEGURANÇA']),
  environment: z.enum(['PRODUÇÃO', 'HOMOLOGAÇÃO', 'DESENVOLVIMENTO']),
  
  // Informações do Cliente
  igreja: z.string().min(3, 'Nome da igreja é obrigatório'),
  reportedBy: z.string().min(2, 'Nome do usuário é obrigatório'),
  email: z.string().email('E-mail inválido'),
  userId: z.string().min(1, 'ID do usuário é obrigatório'),
  
  // Reprodução
  stepsToReproduce: z.array(z.string().min(1))
    .min(1, 'Pelo menos 1 etapa de reprodução é obrigatória'),
  actualResult: z.string().min(10, 'Resultado atual deve ter pelo menos 10 caracteres'),
  expectedResult: z.string().min(10, 'Resultado esperado deve ter pelo menos 10 caracteres'),
  frequency: z.enum(['SEMPRE', 'INTERMITENTE', 'PRIMEIRA_VEZ']),
  
  // Técnico
  url: z.string().url('URL inválida'),
  logUrl: z.string().url('URL do log inválida').optional().or(z.literal('')),
  browser: z.string().min(1, 'Navegador é obrigatório'),
  os: z.string().min(1, 'Sistema operacional é obrigatório'),
  device: z.enum(['DESKTOP', 'MOBILE', 'TABLET']),
  
  // Evidências
  evidences: z.array(evidenceSchema).default([]),
  
  // Métricas
  affectedUsers: z.number().min(1, 'Número de usuários afetados deve ser maior que 0'),
  systemImpact: z.enum(['ALTO', 'MÉDIO', 'BAIXO']),
  affectedModules: z.array(z.string()).min(1, 'Pelo menos 1 módulo afetado é obrigatório'),
  
  // Metadados
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.enum(['DRAFT', 'SUBMITTED', 'IN_PROGRESS', 'RESOLVED']).optional(),
})

// Esquemas parciais para validação por etapa
export const basicInfoSchema = bugReportSchema.pick({
  title: true,
  severity: true,
  category: true,
  environment: true,
})

export const clientInfoSchema = bugReportSchema.pick({
  igreja: true,
  reportedBy: true,
  email: true,
  userId: true,
})

export const reproductionSchema = bugReportSchema.pick({
  stepsToReproduce: true,
  actualResult: true,
  expectedResult: true,
  frequency: true,
  url: true,
  logUrl: true,
  browser: true,
  os: true,
  device: true,
  evidences: true,
  affectedUsers: true,
  systemImpact: true,
  affectedModules: true,
})

export const jiraTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Nome do template é obrigatório'),
  template: z.string().min(1, 'Template não pode estar vazio'),
  isDefault: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type BugReportFormData = z.infer<typeof bugReportSchema>
export type BasicInfoFormData = z.infer<typeof basicInfoSchema>
export type ClientInfoFormData = z.infer<typeof clientInfoSchema>
export type ReproductionFormData = z.infer<typeof reproductionSchema>
export type EvidenceFormData = z.infer<typeof evidenceSchema>
export type JiraTemplateFormData = z.infer<typeof jiraTemplateSchema>