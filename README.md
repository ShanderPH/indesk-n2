# 🐛 JIRA Bug Creator

Sistema avançado de geração de bug reports para JIRA, desenvolvido para a equipe N2 que atende 10.000+ igrejas.

## 🚀 Características

- **Multi-step Form**: Formulário inteligente com 4 etapas para coleta estruturada de informações
- **Auto-save**: Salvamento automático de rascunhos no localStorage
- **Template JIRA**: Geração automática de templates formatados para JIRA
- **Upload de Evidências**: Drag & drop para imagens, vídeos e logs com compressão automática
- **Mobile First**: Design responsivo otimizado para todos os dispositivos (320px - 4K)
- **Validação Inteligente**: Validação em tempo real com Zod
- **Dashboard Analytics**: Métricas e estatísticas de bugs reportados
- **Modo Escuro**: Suporte a temas claro e escuro
- **Performance**: Otimizado com bundle splitting e lazy loading

## 🛠️ Stack Tecnológica

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Forms**: React Hook Form + Zod validation
- **State**: Context API + Custom hooks
- **UI Components**: Headless UI + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Testing**: Jest + Testing Library
- **Deploy**: Vercel-ready

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Instale as dependências
npm install

# Execute em desenvolvimento
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Scripts Disponíveis

```bash
# Desenvolvimento com Turbopack
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start

# Linting
npm run lint

# Testes
npm run test
npm run test:watch
npm run test:coverage

# Verificação de tipos
npm run type-check
```

## 🧪 Testes

O projeto inclui suite completa de testes:

```bash
# Executar todos os testes
npm run test

# Testes em modo watch
npm run test:watch

# Coverage report
npm run test:coverage
```

## 📱 Design Responsivo

O sistema foi desenvolvido com abordagem Mobile First:

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px - 1440px
- **Large**: 1440px+
- **4K**: 3840px+ (suporte completo)

## 🎯 Funcionalidades Principais

### 1. Formulário Multi-Step

#### Etapa 1: Informações Básicas
- Título descritivo do bug
- Severidade (Bloqueador → Baixo)
- Categoria (Funcional, Visual, Performance, Segurança)
- Ambiente (Produção, Homologação, Desenvolvimento)

#### Etapa 2: Informações do Cliente
- Nome da igreja
- Usuário que reportou
- E-mail de contato
- ID do usuário no sistema

#### Etapa 3: Reprodução e Evidências
- Passos detalhados para reprodução
- Resultado atual vs esperado
- Frequência do problema
- Informações técnicas (URL, navegador, OS, dispositivo)
- Upload de evidências (imagens, vídeos, logs)
- Análise de impacto (usuários afetados, módulos)

#### Etapa 4: Revisão e Geração
- Validação completa do formulário
- Preview do template JIRA
- Exportação em múltiplos formatos (JIRA, Markdown, JSON)
- Cópia para clipboard

### 2. Sistema de Templates

O sistema gera automaticamente templates formatados:

- **JIRA Format**: Com marcação específica do JIRA (tabelas, cores, links)
- **Markdown**: Para documentação e GitHub issues
- **JSON**: Para integração com APIs e sistemas externos

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Build automático ao fazer push
git push origin main
```

### Manual

```bash
# Build para produção
npm run build

# Teste local da build
npm start
```

## 🔮 Roadmap

### Fase 2 - Integração JIRA (Planejado)
- [ ] API Routes para JIRA
- [ ] Autenticação JIRA
- [ ] Criação automática de tickets
- [ ] Webhook handlers

### Fase 3 - IA e Automação (Futuro)
- [ ] Integração OpenAI para sugestões
- [ ] Auto-categorização de bugs
- [ ] Análise de sentimento
- [ ] Detecção de duplicatas

---

Desenvolvido com ❤️ para a equipe N2 e 10.000+ igrejas atendidas.
