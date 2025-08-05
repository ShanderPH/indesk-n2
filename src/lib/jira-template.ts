import { BugReport } from '@/types'
import { formatDate } from './utils'

export function generateJiraTemplate(bugReport: BugReport): string {
  const {
    title,
    severity,
    category,
    environment,
    igreja,
    reportedBy,
    email,
    userId,
    stepsToReproduce,
    actualResult,
    expectedResult,
    frequency,
    url,
    logUrl,
    browser,
    os,
    device,
    affectedUsers,
    systemImpact,
    affectedModules,
    evidences,
  } = bugReport

  const template = `
h1. 🐛 ${title}

h2. 📋 Informações Gerais
||Campo||Valor||
|*Severidade*|{color:${getSeverityColor(severity)}}${severity}{color}|
|*Categoria*|${getCategoryIcon(category)} ${category}|
|*Ambiente*|{color:${getEnvironmentColor(environment)}}${environment}{color}|
|*Igreja*|${igreja}|
|*Reportado por*|${reportedBy} (${email})|
|*ID do Usuário*|{{${userId}}}|
|*Frequência*|${frequency}|
|*Usuários Afetados*|${affectedUsers}|
|*Impacto no Sistema*|{color:${getImpactColor(systemImpact)}}${systemImpact}{color}|

h2. 🔧 Informações Técnicas
||Campo||Valor||
|*URL*|[${url}|${url}]|
${logUrl ? `|*URL do Log*|[${logUrl}|${logUrl}]|` : ''}
|*Navegador*|${browser}|
|*Sistema Operacional*|${os}|
|*Dispositivo*|${getDeviceIcon(device)} ${device}|
|*Módulos Afetados*|${affectedModules.join(', ')}|

h2. 🔄 Reprodução do Bug
h3. Passos para Reproduzir:
${stepsToReproduce.map((step) => `# ${step}`).join('\n')}

h3. ✅ Resultado Esperado:
${expectedResult}

h3. ❌ Resultado Atual:
${actualResult}

${evidences.length > 0 ? `
h2. 📎 Evidências
${evidences.map(evidence => `
h4. ${evidence.description}
*Tipo:* ${evidence.type}
${evidence.url ? `[Visualizar Evidência|${evidence.url}]` : ''}
`).join('')}
` : ''}

h2. 📊 Análise de Impacto
*Severidade:* {color:${getSeverityColor(severity)}}${severity}{color}
*Impacto:* ${systemImpact}
*Usuários Afetados:* ${affectedUsers}
*Módulos:* ${affectedModules.join(', ')}

---
*Reportado em:* ${formatDate(new Date())}
*Sistema:* ${browser} em ${os} (${device})
`

  return template.trim()
}

export function generateMarkdownTemplate(bugReport: BugReport): string {
  const {
    title,
    severity,
    category,
    environment,
    igreja,
    reportedBy,
    email,
    userId,
    stepsToReproduce,
    actualResult,
    expectedResult,
    frequency,
    url,
    logUrl,
    browser,
    os,
    device,
    affectedUsers,
    systemImpact,
    affectedModules,
    evidences,
  } = bugReport

  const template = `
# 🐛 ${title}

## 📋 Informações Gerais
- **Severidade:** ${severity}
- **Categoria:** ${getCategoryIcon(category)} ${category}
- **Ambiente:** ${environment}
- **Igreja:** ${igreja}
- **Reportado por:** ${reportedBy} (${email})
- **ID do Usuário:** \`${userId}\`
- **Frequência:** ${frequency}
- **Usuários Afetados:** ${affectedUsers}
- **Impacto no Sistema:** ${systemImpact}

## 🔧 Informações Técnicas
- **URL:** [${url}](${url})
${logUrl ? `- **URL do Log:** [${logUrl}](${logUrl})` : ''}
- **Navegador:** ${browser}
- **Sistema Operacional:** ${os}
- **Dispositivo:** ${getDeviceIcon(device)} ${device}
- **Módulos Afetados:** ${affectedModules.join(', ')}

## 🔄 Reprodução do Bug

### Passos para Reproduzir:
${stepsToReproduce.map((step, index) => `${index + 1}. ${step}`).join('\n')}

### ✅ Resultado Esperado:
${expectedResult}

### ❌ Resultado Atual:
${actualResult}

${evidences.length > 0 ? `
## 📎 Evidências
${evidences.map(evidence => `
### ${evidence.description}
**Tipo:** ${evidence.type}
${evidence.url ? `[Visualizar Evidência](${evidence.url})` : ''}
`).join('')}
` : ''}

## 📊 Análise de Impacto
- **Severidade:** ${severity}
- **Impacto:** ${systemImpact}
- **Usuários Afetados:** ${affectedUsers}
- **Módulos:** ${affectedModules.join(', ')}

---
**Reportado em:** ${formatDate(new Date())}  
**Sistema:** ${browser} em ${os} (${device})
`

  return template.trim()
}

export function generateJSONTemplate(bugReport: BugReport): string {
  return JSON.stringify(
    {
      ...bugReport,
      createdAt: new Date().toISOString(),
      generatedTemplate: {
        jira: generateJiraTemplate(bugReport),
        markdown: generateMarkdownTemplate(bugReport),
      },
    },
    null,
    2
  )
}

function getSeverityColor(severity: string): string {
  switch (severity) {
    case 'BLOQUEADOR':
      return 'red'
    case 'CRÍTICO':
      return 'red'
    case 'ALTO':
      return 'orange'
    case 'MÉDIO':
      return 'yellow'
    case 'BAIXO':
      return 'green'
    default:
      return 'gray'
  }
}

function getEnvironmentColor(environment: string): string {
  switch (environment) {
    case 'PRODUÇÃO':
      return 'red'
    case 'HOMOLOGAÇÃO':
      return 'yellow'
    case 'DESENVOLVIMENTO':
      return 'green'
    default:
      return 'gray'
  }
}

function getImpactColor(impact: string): string {
  switch (impact) {
    case 'ALTO':
      return 'red'
    case 'MÉDIO':
      return 'yellow'
    case 'BAIXO':
      return 'green'
    default:
      return 'gray'
  }
}

function getCategoryIcon(category: string): string {
  switch (category) {
    case 'FUNCIONAL':
      return '⚙️'
    case 'VISUAL':
      return '🎨'
    case 'PERFORMANCE':
      return '⚡'
    case 'SEGURANÇA':
      return '🔒'
    default:
      return '🐛'
  }
}

function getDeviceIcon(device: string): string {
  switch (device) {
    case 'DESKTOP':
      return '🖥️'
    case 'MOBILE':
      return '📱'
    case 'TABLET':
      return '📋'
    default:
      return '💻'
  }
}