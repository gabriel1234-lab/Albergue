# Documentação: Hostel Santa Teresa

Esta documentação detalha a arquitetura, as tecnologias e as funcionalidades principais do sistema de gerenciamento e reserva do Hostel Santa Teresa.

---

## 1. Visão Geral
O projeto é uma aplicação web moderna focada na experiência do usuário e na eficiência administrativa. O objetivo é facilitar reservas de leitos em Santa Teresa, Rio de Janeiro, oferecendo suporte multilíngue e um motor de precificação dinâmico.

## 2. Stack Tecnológica
- **Frontend**: [Next.js 16](https://nextjs.org/) (App Router)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [Tailwind CSS 4](https://tailwindcss.com/) (Padrão de design moderno e utilitário)
- **Animações**: [Framer Motion](https://www.framer.com/motion/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Runtime**: Node.js / Bun

## 3. Arquitetura de Pastas
```text
src/
├── app/            # Rotas e Páginas (Next.js App Router)
├── components/     # Componentes React reutilizáveis
│   ├── home/       # Componentes específicos da Landing Page
│   ├── layout/     # Header, Footer, etc.
│   └── ui/         # Componentes básicos (Botões, Inputs)
├── context/        # Gerenciamento de estado (Idioma, Autenticação)
├── lib/            # Lógica de negócio (i18n, Precificação, Utils)
└── types/          # Definições de tipos TypeScript
```

## 4. Funcionalidades Principais

### 4.1 Sistema Multilíngue (i18n)
O sistema utiliza um `LanguageContext` customizado que gerencia 5 idiomas:
- Português (PT)
- Inglês (EN)
- Francês (FR)
- Alemão (DE)
- Mandarim (ZH)

**Lógica**: As traduções são armazenadas em `src/lib/i18n.ts` em um dicionário tipado. O componente `Header` permite a troca em tempo real sem recarregar a página.

### 4.2 Motor de Precificação Dinâmica
Localizado em `src/lib/pricing.ts`, o motor calcula valores com base em:
1. **Base**: R$ 80,00 por leito/dia.
2. **Sazonalidade**: Acréscimo de 50% em alta temporada.
3. **Desconto de Grupo**:
   - 5 a 9 leitos: 5% de desconto.
   - 10+ leitos: 10% de desconto.
4. **Reserva de Quarto Inteiro**: 15% de desconto acumulativo.

### 4.3 Dashboard Administrativo
Área protegida para gestão de:
- **Quartos**: Controle de 20 quartos e 230 leitos.
- **Preços**: Ajuste de tarifas sazonais.
- **Funcionários**: Cadastro e permissões.

## 5. Design e Identidade
O design segue o tema **"Alma Boêmia"**, utilizando uma paleta de cores vibrante:
- **Vermelho (#FF6B6B)**: Energia e paixão.
- **Azul (#0056B3)**: Confiança e profissionalismo.
- **Imagens**: Integração de pontos turísticos reais (Bondinho, Escadaria Selarón) para imersão cultural.

---

## 6. Como Executar o Projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Gere a build de produção:
   ```bash
   npm run build
   ```
