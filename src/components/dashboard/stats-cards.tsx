'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Bug, 
  AlertTriangle, 
  Clock, 
  CheckCircle,
  TrendingUp,
  Users
} from 'lucide-react'

interface StatsCardsProps {
  stats: {
    total: number
    byCategory: Record<string, number>
    bySeverity: Record<string, number>
    byEnvironment: Record<string, number>
  }
}

export function StatsCards({ stats }: StatsCardsProps) {
  const criticalBugs = (stats.bySeverity?.['CRÍTICO'] || 0) + (stats.bySeverity?.['BLOQUEADOR'] || 0)
  const productionBugs = stats.byEnvironment?.['PRODUÇÃO'] || 0
  const functionalBugs = stats.byCategory?.['FUNCIONAL'] || 0

  const cards = [
    {
      title: 'Total de Bugs',
      value: stats.total,
      icon: Bug,
      description: 'Bugs reportados no mês',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Críticos/Bloqueadores',
      value: criticalBugs,
      icon: AlertTriangle,
      description: 'Requerem atenção imediata',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'Em Produção',
      value: productionBugs,
      icon: Clock,
      description: 'Afetando usuários finais',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Funcionais',
      value: functionalBugs,
      icon: CheckCircle,
      description: 'Problemas de funcionalidade',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <Card key={card.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-app-secondary">
                {card.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-4 h-4 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-app-primary mb-1">
                {card.value}
              </div>
              <p className="text-xs text-app-muted">
                {card.description}
              </p>
              
              {/* Trend indicator (mock data) */}
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-success">
                  +12% vs mês anterior
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-app-secondary">Hoje</p>
            <p className="text-xl font-semibold text-app-primary">3</p>
          </div>
          <Bug className="w-8 h-8 text-info" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-app-secondary">Esta Semana</p>
            <p className="text-xl font-semibold text-app-primary">15</p>
          </div>
          <Clock className="w-8 h-8 text-warning" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-app-secondary">Resolvidos</p>
            <p className="text-xl font-semibold text-app-primary">42</p>
          </div>
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-app-secondary">Igrejas</p>
            <p className="text-xl font-semibold text-app-primary">156</p>
          </div>
          <Users className="w-8 h-8 text-purple-600" />
        </div>
      </Card>
    </div>
  )
}