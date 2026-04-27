# Sporty Glow

> Tracker pessoal do desafio **75 Hard** — PWA mobile-first, com offline e sem backend.

Um app que eu construí pra mim mesma fazer o tracking dos hábitos diários do 75 Hard. Em vez de planilha ou app genérico, fiz um produto sob medida: meus hábitos, meu visual, meu fluxo. Funciona instalado no celular como app nativo, sem login, sem servidor, sem assinatura.

<p align="center">
  <img src="docs/hero.png" alt="Sporty Glow — Home, Hábitos e Stats" width="800" />
</p>

## Sobre o desafio

O **75 Hard** é um programa mental de 75 dias com 5 regras inegociáveis: dois treinos por dia (um obrigatoriamente outdoor), dieta restrita, hidratação, leitura e foto de progresso. O ponto: se falhar uma regra, volta pro dia 1.

Ferramentas existentes não cabiam pra mim — ou eram caras, ou cheias de features que eu não uso, ou simplesmente feias. Esse projeto foi a desculpa pra resolver o problema do meu jeito.

## Features

- **Day X / 75** — anel de progresso com o dia atual e percentual concluído
- **Checklist diário** — toque pra marcar/desmarcar cada hábito do dia
- **Hábitos editáveis** — criar, editar, deletar; escolher ícone e meta
- **Stats** — streak atual, dias perfeitos, % por hábito, calendário e gráfico de linha (hábitos/dia + média)
- **Data de início configurável** — pra começar quando você decidir, não no dia da instalação
- **PWA instalável** — abre como app nativo no iOS e Android
- **Offline-first** — service worker faz cache de tudo, abre sem internet
- **Zero backend** — dados em `localStorage`, sem login, sem coleta

## Stack

| Tecnologia | Por quê |
|---|---|
| **React 18 + TypeScript** | Type safety pra refactor sem medo, ecossistema maduro |
| **Vite** | Dev server instantâneo, build pequeno e rápido |
| **Tailwind CSS** | Tokens de design (cores, spacing, typography) direto do protótipo virando classes |
| **vite-plugin-pwa** | Manifest + service worker via Workbox em uma linha de config |
| **SVG puro** | Anel de progresso e gráfico de linha sem dependência de chart lib (~2KB vs ~70KB de uma recharts) |
| **localStorage** | Persistência simples, suficiente pra um device |

Bundle final: **52KB gzipped**, 1 chunk.

## Decisões de design

**PWA em vez de nativo.** Uso pessoal, single-user — não vale o custo de provisionar Apple Developer, manter dois codebases ou passar por review. PWA resolve 100% das necessidades reais (instalação como ícone, funciona offline, gestos touch).

**Sem backend.** Não preciso sincronizar entre devices. `localStorage` evita custo de hospedagem, autenticação, política de privacidade e zero superfície de ataque. O JSON pode ser exportado pelo DevTools se eu quiser backup.

**Sem chart lib.** O gráfico de linha (hábitos/dia + média) é SVG renderizado direto. Mantém o bundle pequeno, controle total sobre estilo e me dá mais um pedaço de SVG pra portfolio.

**Tema "Grit & Glow".** Turquesa + glassmorphism — o nome do desafio é "Hard" mas a interface não precisa ser punitiva. Visual energético e acolhedor encoraja a abrir o app todo dia. Tipografia pareada: **Noto Serif** pra headlines (lado "Glow"), **Lexend** pro funcional (lado "Grit").

## Screenshots

| Home | Hábitos | Stats |
|---|---|---|
| ![Home](docs/home.png) | ![Hábitos](docs/habits.png) | ![Stats](docs/stats.png) |

> _Tirar screenshots: rodar `npm run dev`, abrir no DevTools mobile (iPhone 14), salvar em `docs/`._

## Arquitetura

```
src/
  App.tsx              # shell: top bar, bottom nav, roteamento por estado
  storage.ts           # useAppState() — hook único com localStorage
  types.ts             # Habit, DailyLog, AppState, ICON_OPTIONS
  utils.ts             # datas, dia do desafio, frases motivacionais
  components/
    Icon.tsx           # wrapper Material Symbols
    ProgressRing.tsx   # anel SVG do Day X/75
    LineChart.tsx      # gráfico SVG hábitos/dia + média
  screens/
    Home.tsx           # dashboard com ring + grid de hoje
    Habits.tsx         # checklist + CRUD de hábitos
    Stats.tsx          # streak, dias perfeitos, gráfico, calendário
    Settings.tsx       # data de início, reset
```

**Modelo de dados** (uma chave em `localStorage`):

```ts
type AppState = {
  startDate: string                 // YYYY-MM-DD
  totalDays: number                 // 75
  habits: Habit[]                   // {id, name, meta, icon}[]
  logs: Record<string, DailyLog>    // por data: {date, completed: {habitId: bool}}
}
```

## Rodando localmente

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # gera dist/
npm run preview      # serve dist/ em :4173
```

## Deploy

Qualquer host estático serve. Recomendo Vercel:

```bash
npm i -g vercel
vercel               # primeira vez
vercel --prod        # atualizações
```

Alternativas: arrastar `dist/` em [Netlify Drop](https://app.netlify.com/drop), ou GitHub Pages (ajustar `base` no `vite.config.ts` se subpath).

## Instalando no celular

Depois de hospedado em https:

- **iOS Safari:** compartilhar → "Adicionar à Tela de Início"
- **Android Chrome:** menu → "Instalar app"

A partir daí abre como app nativo, com ícone, splash screen e funciona offline.

## Próximos passos

- [ ] Notificações de lembrete (Web Push API)
- [ ] Export/import de backup pela UI (sem precisar do DevTools)
- [ ] Modo dark
- [ ] Animação de celebração quando completa todos os hábitos do dia
- [ ] Compartilhar progresso (gerar imagem do Day X/75 pra stories)

## Licença

MIT — usa, copia, modifica.
