import Link from "next/link";
import { StatsCards, QuickStats } from "@/components/dashboard/stats-cards";
import { RecentBugs } from "@/components/dashboard/recent-bugs";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, TrendingUp, Users, Clock, Bug } from "lucide-react";

// Mock data for demonstration
const mockStats = {
  total: 124,
  byCategory: {
    'FUNCIONAL': 45,
    'VISUAL': 32,
    'PERFORMANCE': 28,
    'SEGURANÇA': 19
  },
  bySeverity: {
    'BLOQUEADOR': 5,
    'CRÍTICO': 12,
    'ALTO': 34,
    'MÉDIO': 48,
    'BAIXO': 25
  },
  byEnvironment: {
    'PRODUÇÃO': 67,
    'HOMOLOGAÇÃO': 35,
    'DESENVOLVIMENTO': 22
  }
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 bg-app min-h-screen">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-app-primary">
          Dashboard - Bug Reports JIRA
        </h1>
        <p className="text-xl text-app-secondary max-w-3xl mx-auto">
          Sistema avançado para geração automatizada de relatórios de bug formatados para JIRA.
          Atendendo 10.000+ igrejas com eficiência e qualidade.
        </p>
        <div className="flex justify-center">
          <Link href="/new">
            <Button size="lg" className="text-lg px-8 py-3">
              <Plus className="w-5 h-5 mr-2" />
              Criar Novo Bug Report
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Stats */}
      <StatsCards stats={mockStats} />

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bugs - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentBugs bugs={[]} />
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>⚡ Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/new" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Bug Report
                </Button>
              </Link>
              <Link href="/history" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  Ver Histórico
                </Button>
              </Link>
              <Link href="/templates" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Bug className="w-4 h-4 mr-2" />
                  Templates JIRA
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status Geral</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-600">Online</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Templates Ativos</span>
                <span className="text-sm font-medium">3</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Igrejas Ativas</span>
                <span className="text-sm font-medium">10,247</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bugs Este Mês</span>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">124</span>
                  <TrendingUp className="w-3 h-3 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>💡 Dicas Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Use títulos descritivos para facilitar a identificação</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Adicione screenshots sempre que possível</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Detalhe os passos de reprodução claramente</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Indique o número de usuários afetados</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Overview */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Recursos do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Bug className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Templates JIRA</h3>
              <p className="text-sm text-gray-600">Geração automática de templates formatados</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium">Multi-usuário</h3>
              <p className="text-sm text-gray-600">Suporte para 10.000+ igrejas</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium">Analytics</h3>
              <p className="text-sm text-gray-600">Métricas e relatórios detalhados</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-medium">Auto-save</h3>
              <p className="text-sm text-gray-600">Salvamento automático de rascunhos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
