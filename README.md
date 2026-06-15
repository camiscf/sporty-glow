# 🌿 Vida Gamificada

Um app pessoal de hábitos, metas e prêmios — feito pra transformar a rotina em algo que motiva, não que cobra. Você cumpre hábitos, ganha XP/moedas, sobe de nível, mantém streaks e troca as moedas por prêmios reais que você mesma define.

---

## ✨ O que ele faz

- **Hábitos diários** com XP por conclusão — marque com um toque, ganhe pontos.
- **Níveis e evolução** — a cada 200 XP você sobe de nível, de "Despertar" até "Arquiteta da Vida".
- **Streak (dias seguidos)** — mantenha a sequência viva cumprindo ao menos um hábito por dia.
- **Metas semanais** — cada hábito tem uma meta de dias por semana, com barra de progresso. Reseta toda segunda.
- **Conquistas (badges)** — desbloqueadas automaticamente ao atingir marcos.
- **Prêmios reais** — gaste moedas (XP) em recompensas da vida real que você cadastra. Você decide o que quer ganhar e quanto custa.
- **Edição de hábitos** — mude nome, ícone, XP e meta semanal, ou crie e apague hábitos.
- **Salvamento automático** — tudo fica guardado no próprio navegador (localStorage).
- **Responsivo** — funciona bem no celular, tablet e computador.

---

## 🎯 A filosofia por trás

O app foi desenhado em torno de uma regra: **medir o sucesso por uma coisa, não por dez.**

Existe um hábito-âncora ("Primeira hora sem celular", destacado em dourado). Cumprir só ele já conta como uma vitória do dia e mantém o streak vivo. Isso protege contra a sensação de fracasso que faz a gente largar tudo quando um dia não sai perfeito.

Os prêmios são movidos por **vontade de ganhar**, não por punição. A ideia é usar recompensas que te nutrem (descanso, lazer, autocuidado) como combustível positivo.

---

## 📁 Arquivos do projeto

| Arquivo | Função |
|---|---|
| `index.html` | O app inteiro (HTML + React + estilos num arquivo só) |
| `manifest.json` | Faz o app ter nome e ícone ao ser adicionado à tela inicial |
| `icon-512.png` | Ícone grande (512×512) |
| `icon-180.png` | Ícone para tela inicial do iOS (180×180) |
| `icon.svg` | Versão vetorial do ícone (fonte) |

> Os quatro primeiros precisam ficar **na mesma pasta** para tudo funcionar.

---

## 🚀 Como rodar

### Localmente (testar no computador)
Abra o `index.html` direto no navegador. Funciona sem instalar nada.

### Publicar no Vercel (acesso pelo celular)

**Jeito fácil — arrastar e soltar:**
1. Coloque os 4 arquivos (`index.html`, `manifest.json`, `icon-512.png`, `icon-180.png`) numa pasta.
2. Crie uma conta grátis em [vercel.com](https://vercel.com).
3. Arraste a pasta para a área de deploy do Vercel.
4. Ele gera um link público (ex: `seu-app.vercel.app`).

**Jeito via GitHub (atualiza sozinho):**
1. Suba os arquivos num repositório no GitHub.
2. Conecte o repositório ao Vercel.
3. Cada alteração no GitHub republica o app automaticamente.

### Adicionar à tela inicial do celular
Abra o link no navegador do celular → menu → **"Adicionar à tela inicial"**. O app vira um ícone e abre em tela cheia, como um app nativo.

---

## ✏️ Como usar

- **Marcar hábito:** toque no hábito na aba *Hábitos*. Ganha XP na hora.
- **Editar hábitos:** na aba *Hábitos*, toque em *✏️ Editar*. Mude nome, ícone, XP e meta; adicione ou apague hábitos. Toque em *✓ Concluir* quando terminar.
- **Ver metas da semana:** aba *Metas*.
- **Criar/resgatar prêmios:** aba *🎁 Prêmios*. Cadastre recompensas e resgate quando tiver moedas suficientes.
- **Ver conquistas:** aba *Conquistas*.
- **Marcar o dia:** o ideal é marcar tudo num momento fixo à noite (ex: depois de escovar os dentes).

---

## ⚙️ Detalhes técnicos

- **Stack:** HTML + React 18 (via CDN) + Babel standalone. Sem build, sem instalação.
- **Persistência:** `localStorage` (chave `vida-gamificada-v3`). Os dados ficam no navegador/aparelho onde o app é aberto.
- **Sem backend:** roda 100% no navegador.

### ⚠️ Sobre os dados
Como usa `localStorage`, os dados ficam **só naquele navegador, naquele aparelho**. Limpar o cache/histórico do navegador apaga o progresso. Para uso pessoal num aparelho só, funciona muito bem — mas não conte com ele como backup permanente, e não sincroniza entre dispositivos diferentes.

---

## 🔧 Personalizar

- **Hábitos iniciais:** edite a lista `DEFAULT_HABITS` no `index.html`.
- **Prêmios iniciais:** edite `DEFAULT_REWARDS`.
- **Nomes dos níveis:** edite o array `LEVELS`.
- **Conquistas:** edite o array `BADGES`.
- **XP por nível:** mude a constante `XP_PER_LEVEL` (padrão: 200).
- **Cores:** ajuste as variáveis CSS no `:root` (paleta verde-lima sobre fundo escuro).

---

## 💚 Feito para uso pessoal

Este é um projeto pessoal de organização de rotina. Use, adapte e ajuste como fizer sentido pra sua vida.