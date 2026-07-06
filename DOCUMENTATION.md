# Documentação Técnica - Hostel Santa Teresa

Este documento detalha a arquitetura, funcionalidades e diagramas de processo do sistema de gerenciamento do Hostel Santa Teresa.

---

## 1. Tecnologias Utilizadas
- **Framework:** Next.js (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4.0
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Gerenciamento de Estado:** React Context API (para i18n)

---

## 2. Diagrama de Casos de Uso de Negócio (Mermaid)

Este diagrama descreve as interações dos atores com os principais processos de negócio do hostel.

```mermaid
graph TD
    C[Cliente]
    F[Funcionário]
    A[Administrador]

    subgraph Sistema_Hostel_Santa_Teresa
        UC1(Buscar Disponibilidade)
        UC2(Realizar Reserva)
        UC3(Cadastrar Ocupantes)
        UC4(Aceitar Termos de Uso)
        UC5(Realizar Pagamento)
        UC6(Avaliar Estadia)
        UC7(Gerenciar Quartos/Camas)
        UC8(Configurar Preços Sazonais)
        UC9(Gerenciar Equipe)
        UC10(Realizar Check-in/out)
    end

    C --> UC1
    C --> UC2
    UC2 -. include .-> UC3
    UC2 -. include .-> UC4
    UC2 -. include .-> UC5
    C --> UC6

    F --> UC10
    F --> UC7

    A --> F
    A --> UC8
    A --> UC9
```

---

## 3. Diagrama de Estados da Reserva

Descreve o ciclo de vida de uma reserva e a disponibilidade das camas no sistema.

```mermaid
stateDiagram-v2
    [*] --> Disponivel : Cama Criada
    Disponivel --> Selecionada : Cliente clica na cama
    Selecionada --> Disponivel : Cliente remove seleção
    Selecionada --> EmCadastro : Clica em "Continuar"
    EmCadastro --> AguardandoPagamento : Formulário preenchido
    AguardandoPagamento --> Alugada : Pagamento Confirmado
    AguardandoPagamento --> Selecionada : Cancelar / Voltar

    state Alugada {
        [*] --> Reservada
        Reservada --> Ocupada : Check-in realizado
        Ocupada --> [*] : Check-out realizado
    }

    Alugada --> Disponivel : Cancelamento / Check-out
```

---

## 4. Mapeamento de Requisitos

### Requisitos Funcionais (Principais)
- **RF01 (Cadastro):** Implementado no fluxo de reserva com campos obrigatórios brasileiros.
- **RF04/05 (Visualização):** Grid interativo de camas em `/booking`.
- **RF09/10 (Descontos):** Lógica implementada em `src/lib/pricing.ts`.
- **RF11 (Pagamento):** Simulação de checkout online integrada.
- **RF15 (Mapa):** Exibição em `/recommendations` e Home.
- **RF19 (Usuários Online):** Componente `LiveCounter` no Header.

### Requisitos Não Funcionais
- **RNF01 (Intuitivo):** Design focado em "boxes" e navegação simplificada.
- **RNF07-11 (Multi-idioma):** Sistema de i18n em 5 línguas.
- **Multi-dispositivo:** Layout 100% responsivo com Tailwind CSS.

---

## 5. Estrutura de Arquivos
- `/src/app`: Rotas e páginas (Home, Booking, Admin, Recommendations).
- `/src/components`: Componentes reutilizáveis (Hero, SearchBar, Layout).
- `/src/lib`: Lógica de negócio (i18n, pricing).
- `/src/context`: Gerenciamento de estado global (LanguageContext).
