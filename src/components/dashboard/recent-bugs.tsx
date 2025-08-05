'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BugReport } from '@/types'
import { formatDate } from '@/lib/utils'
import { Eye, ExternalLink, MoreHorizontal } from 'lucide-react'

interface RecentBugsProps {
  bugs: BugReport[]
}

const mockBugs: BugReport[] = [
  {
    id: '1',
    title: 'Login não funciona após atualização do sistema',
    severity: 'CRÍTICO',
    category: 'FUNCIONAL',
    environment: 'PRODUÇÃO',
    igreja: 'Igreja Batista Central',
    reportedBy: 'João Silva',
    email: 'joao@igreja.com',
    userId: 'usr_123',
    stepsToReproduce: ['Acessar página de login', 'Inserir credenciais', 'Clicar em entrar'],
    actualResult: 'Página carrega indefinidamente',
    expectedResult: 'Usuário deveria ser autenticado',
    frequency: 'SEMPRE',
    url: 'https://sistema.igreja.com/login',
    browser: 'Chrome 120',
    os: 'Windows 11',
    device: 'DESKTOP',
    evidences: [],
    affectedUsers: 50,
    systemImpact: 'ALTO',
    affectedModules: ['Autenticação'],
    createdAt: new Date('2024-01-15'),
    status: 'SUBMITTED'
  },
  {
    id: '2',
    title: 'Relatório de dizimos não carrega corretamente',
    severity: 'MÉDIO',
    category: 'VISUAL',
    environment: 'PRODUÇÃO',
    igreja: 'Igreja Pentecostal Renovada',
    reportedBy: 'Maria Santos',
    email: 'maria@igreja.com',
    userId: 'usr_456',
    stepsToReproduce: ['Acessar relatórios', 'Selecionar dizimos', 'Filtrar por mês'],
    actualResult: 'Dados não aparecem na tela',
    expectedResult: 'Relatório deveria exibir os dados',
    frequency: 'INTERMITENTE',
    url: 'https://sistema.igreja.com/relatorios',
    browser: 'Firefox 119',
    os: 'macOS 14',
    device: 'DESKTOP',
    evidences: [],
    affectedUsers: 5,
    systemImpact: 'MÉDIO',
    affectedModules: ['Relatórios'],
    createdAt: new Date('2024-01-14'),
    status: 'IN_PROGRESS'
  },
  {
    id: '3',
    title: 'Cadastro de membros lento no mobile',
    severity: 'BAIXO',
    category: 'PERFORMANCE',
    environment: 'PRODUÇÃO',
    igreja: 'Igreja Metodista São Paulo',
    reportedBy: 'Pedro Costa',
    email: 'pedro@igreja.com',
    userId: 'usr_789',
    stepsToReproduce: ['Abrir app mobile', 'Ir para cadastro', 'Preencher formulário'],
    actualResult: 'Demora mais de 10 segundos para salvar',
    expectedResult: 'Deveria salvar em até 3 segundos',
    frequency: 'SEMPRE',
    url: 'https://app.igreja.com/cadastro',
    browser: 'Mobile Safari',
    os: 'iOS 17',
    device: 'MOBILE',
    evidences: [],
    affectedUsers: 20,
    systemImpact: 'BAIXO',
    affectedModules: ['Cadastros'],
    createdAt: new Date('2024-01-13'),
    status: 'RESOLVED'
  }
]

export function RecentBugs({ bugs = mockBugs }: RecentBugsProps) {
  const getSeverityColor = (severity: string): "destructive" | "warning" | "secondary" | "outline" => {
    switch (severity) {
      case 'BLOQUEADOR':
        return 'destructive'
      case 'CRÍTICO':
        return 'destructive'
      case 'ALTO':
        return 'warning'
      case 'MÉDIO':
        return 'secondary'
      case 'BAIXO':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'bg-blue-100 text-blue-800'
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800'
      case 'RESOLVED':
        return 'bg-green-100 text-green-800'
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'SUBMITTED':
        return 'Enviado'
      case 'IN_PROGRESS':
        return 'Em Andamento'
      case 'RESOLVED':
        return 'Resolvido'
      case 'DRAFT':
        return 'Rascunho'
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>🐛 Bugs Recentes</CardTitle>
          <Button variant="outline" size="sm">
            Ver Todos
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bugs.slice(0, 5).map((bug) => (
            <div
              key={bug.id}
              className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900 line-clamp-1">
                    {bug.title}
                  </h4>
                  <div className="flex items-center space-x-2 ml-4">
                    <Badge variant={getSeverityColor(bug.severity)}>
                      {bug.severity}
                    </Badge>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bug.status || 'DRAFT')}`}>
                      {getStatusLabel(bug.status || 'DRAFT')}
                    </span>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex items-center space-x-4">
                    <span>🏛️ {bug.igreja}</span>
                    <span>👤 {bug.reportedBy}</span>
                    <span>📱 {bug.device}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span>📊 {bug.affectedUsers} usuários afetados</span>
                    <span>📅 {formatDate(bug.createdAt || new Date())}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {bug.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {bug.environment}
                  </Badge>
                  {bug.evidences && bug.evidences.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      📎 {bug.evidences.length} evidências
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-1 ml-4">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {bugs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <div className="w-12 h-12 mx-auto mb-4 opacity-50 flex items-center justify-center text-2xl">🐛</div>
              <p>Nenhum bug reportado ainda</p>
              <p className="text-sm">Comece criando seu primeiro report!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}