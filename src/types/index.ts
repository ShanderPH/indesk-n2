export interface BugReport {
  id?: string
  // Classificação e Impacto
  title: string
  severity: 'BLOQUEADOR' | 'CRÍTICO' | 'ALTO' | 'MÉDIO' | 'BAIXO'
  category: 'FUNCIONAL' | 'VISUAL' | 'PERFORMANCE' | 'SEGURANÇA'
  environment: 'PRODUÇÃO' | 'HOMOLOGAÇÃO' | 'DESENVOLVIMENTO'
  
  // Informações do Cliente
  igreja: string
  reportedBy: string
  email: string
  userId: string
  
  // Reprodução
  stepsToReproduce: string[]
  actualResult: string
  expectedResult: string
  frequency: 'SEMPRE' | 'INTERMITENTE' | 'PRIMEIRA_VEZ'
  
  // Técnico
  url: string
  logUrl?: string
  browser: string
  os: string
  device: 'DESKTOP' | 'MOBILE' | 'TABLET'
  
  // Evidências
  evidences: Evidence[]
  
  // Métricas
  affectedUsers: number
  systemImpact: 'ALTO' | 'MÉDIO' | 'BAIXO'
  affectedModules: string[]
  
  // Metadados
  createdAt?: Date
  updatedAt?: Date
  status?: 'DRAFT' | 'SUBMITTED' | 'IN_PROGRESS' | 'RESOLVED'
}

export interface Evidence {
  id: string
  description: string
  file?: File
  url?: string
  type: 'IMAGE' | 'VIDEO' | 'LOG'
  size?: number
  createdAt?: Date
}

export interface FormStep {
  id: number
  title: string
  description: string
  isCompleted?: boolean
  isActive?: boolean
}

export interface BugReportStats {
  total: number
  byCategory: Record<string, number>
  bySeverity: Record<string, number>
  byEnvironment: Record<string, number>
  recentReports: BugReport[]
}

export interface JiraTemplate {
  id: string
  name: string
  template: string
  isDefault?: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ToastMessage {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  duration?: number
}

export type FormStepKey = 'basic' | 'client' | 'reproduction' | 'review'

export interface ValidationError {
  field: string
  message: string
}

export interface UploadProgress {
  file: File
  progress: number
  status: 'uploading' | 'completed' | 'error'
  error?: string
}