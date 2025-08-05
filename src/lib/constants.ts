export const SEVERITY_OPTIONS = [
  { value: 'BLOQUEADOR', label: 'Bloqueador', color: 'bg-red-500' },
  { value: 'CRÍTICO', label: 'Crítico', color: 'bg-red-400' },
  { value: 'ALTO', label: 'Alto', color: 'bg-orange-500' },
  { value: 'MÉDIO', label: 'Médio', color: 'bg-yellow-500' },
  { value: 'BAIXO', label: 'Baixo', color: 'bg-green-500' },
] as const

export const CATEGORY_OPTIONS = [
  { value: 'FUNCIONAL', label: 'Funcional', icon: '⚙️' },
  { value: 'VISUAL', label: 'Visual', icon: '🎨' },
  { value: 'PERFORMANCE', label: 'Performance', icon: '⚡' },
  { value: 'SEGURANÇA', label: 'Segurança', icon: '🔒' },
] as const

export const ENVIRONMENT_OPTIONS = [
  { value: 'PRODUÇÃO', label: 'Produção', color: 'bg-red-100 text-red-800' },
  { value: 'HOMOLOGAÇÃO', label: 'Homologação', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'DESENVOLVIMENTO', label: 'Desenvolvimento', color: 'bg-green-100 text-green-800' },
] as const

export const FREQUENCY_OPTIONS = [
  { value: 'SEMPRE', label: 'Sempre' },
  { value: 'INTERMITENTE', label: 'Intermitente' },
  { value: 'PRIMEIRA_VEZ', label: 'Primeira vez' },
] as const

export const DEVICE_OPTIONS = [
  { value: 'DESKTOP', label: 'Desktop', icon: '🖥️' },
  { value: 'MOBILE', label: 'Mobile', icon: '📱' },
  { value: 'TABLET', label: 'Tablet', icon: '📋' },
] as const

export const SYSTEM_IMPACT_OPTIONS = [
  { value: 'ALTO', label: 'Alto', color: 'bg-red-100 text-red-800' },
  { value: 'MÉDIO', label: 'Médio', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'BAIXO', label: 'Baixo', color: 'bg-green-100 text-green-800' },
] as const

export const EVIDENCE_TYPES = [
  { value: 'IMAGE', label: 'Imagem', accept: 'image/*' },
  { value: 'VIDEO', label: 'Vídeo', accept: 'video/*' },
  { value: 'LOG', label: 'Log', accept: '.txt,.log' },
] as const

export const FORM_STEPS = [
  { id: 1, title: 'Informações Básicas', description: 'Título, severidade e categoria' },
  { id: 2, title: 'Detalhes do Cliente', description: 'Igreja, usuário e contato' },
  { id: 3, title: 'Reprodução do Bug', description: 'Passos e evidências' },
  { id: 4, title: 'Revisão e Envio', description: 'Validação final e geração' },
] as const

export const AUTO_SAVE_KEY = 'bug-report-draft'
export const AUTO_SAVE_INTERVAL = 30000 // 30 seconds

export const JIRA_MODULES = [
  'Autenticação',
  'Dashboard',
  'Relatórios',
  'Configurações',
  'Usuários',
  'Permissões',
  'Backup',
  'Integrações',
  'Mobile App',
  'API',
] as const