import { generateJiraTemplate, generateMarkdownTemplate } from '@/lib/jira-template'
import { BugReport } from '@/types'

const mockBugReport: BugReport = {
  title: 'Test Bug Report',
  severity: 'ALTO',
  category: 'FUNCIONAL',
  environment: 'PRODUÇÃO',
  igreja: 'Igreja Teste',
  reportedBy: 'João Silva',
  email: 'joao@teste.com',
  userId: 'user123',
  stepsToReproduce: ['Passo 1', 'Passo 2', 'Passo 3'],
  actualResult: 'Resultado atual do bug',
  expectedResult: 'Resultado esperado',
  frequency: 'SEMPRE',
  url: 'https://teste.com/bug',
  browser: 'Chrome 120',
  os: 'Windows 11',
  device: 'DESKTOP',
  evidences: [],
  affectedUsers: 10,
  systemImpact: 'MÉDIO',
  affectedModules: ['Autenticação', 'Dashboard'],
}

describe('JIRA Template Generator', () => {
  describe('generateJiraTemplate', () => {
    it('should generate a valid JIRA template', () => {
      const template = generateJiraTemplate(mockBugReport)
      
      expect(template).toContain('Test Bug Report')
      expect(template).toContain('ALTO')
      expect(template).toContain('Igreja Teste')
      expect(template).toContain('João Silva')
      expect(template).toContain('Passo 1')
      expect(template).toContain('Passo 2')
      expect(template).toContain('Passo 3')
      expect(template).toContain('Chrome 120')
      expect(template).toContain('Windows 11')
    })

    it('should include all required sections', () => {
      const template = generateJiraTemplate(mockBugReport)
      
      expect(template).toContain('Informações Gerais')
      expect(template).toContain('Informações Técnicas')
      expect(template).toContain('Reprodução do Bug')
      expect(template).toContain('Análise de Impacto')
    })
  })

  describe('generateMarkdownTemplate', () => {
    it('should generate a valid Markdown template', () => {
      const template = generateMarkdownTemplate(mockBugReport)
      
      expect(template).toContain('# 🐛 Test Bug Report')
      expect(template).toContain('## 📋 Informações Gerais')
      expect(template).toContain('**Severidade:** ALTO')
      expect(template).toContain('[https://teste.com/bug](https://teste.com/bug)')
    })
  })
})