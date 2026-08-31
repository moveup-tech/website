---
name: Move Up Tecnologia
description: Sistema editorial de alto contraste para apresentar software sob medida com clareza e confiança.
colors:
  ink: "#09090b"
  canvas: "#ffffff"
  emerald-signal: "#34d399"
  emerald-action: "#047857"
  cyan-emphasis: "#06b6d4"
  muted-copy: "#a1a1aa"
  quiet-copy: "#52525b"
  rule: "#27272a"
  light-rule: "#e4e4e7"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7778
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.25
rounded:
  md: "0.375rem"
  lg: "0.5rem"
  xl: "0.75rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
  section: "6rem"
  section-wide: "8rem"
components:
  button-primary:
    backgroundColor: "rgb(4 120 87 / 0.25)"
    textColor: "{colors.emerald-signal}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  button-primary-hover:
    backgroundColor: "rgb(4 120 87 / 0.5)"
    textColor: "{colors.emerald-signal}"
    rounded: "{rounded.md}"
    padding: "1rem 1.5rem"
  status-chip:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0.5rem 1rem"
---

# Design System: Move Up Tecnologia

## Overview

**Creative North Star: "A Linha de Produção Editorial"**

A Move Up apresenta tecnologia como um percurso legível até a produção. O sistema combina superfícies editoriais de alto contraste, grandes títulos densos, regras finas e espaços generosos para comunicar precisão sem parecer frio ou excessivamente técnico.

O esmeralda funciona como sinal operacional: marca ações, palavras decisivas, ícones e numeração. A composição evita ornamento e usa ritmo, alinhamento e inversões de superfície para separar capítulos. A seção de serviços é a expressão mais completa dessa lógica: uma tese compacta ancora a leitura enquanto linhas numeradas descrevem uma sequência de capacidades, não uma coleção de cartões intercambiáveis.

**Key Characteristics:**

- Contraste preto e branco com zinc como escala de apoio.
- Esmeralda raro e funcional; ciano reservado ao destaque legado do hero.
- Títulos grandes, pesados e de tracking fechado.
- Estrutura por regras, listas e capítulos em vez de caixas decorativas.
- Espaçamento amplo e leitura progressiva da proposta à produção.

## Colors

A paleta é quase monocromática; cores saturadas aparecem como sinais pequenos e intencionais sobre superfícies de alto contraste.

### Primary

- **Sinal Esmeralda:** indica produção, capacidade, ação, numeração e ícones que orientam a leitura.
- **Ação Esmeralda Profunda:** cria o fundo translúcido do botão principal e ganha densidade no hover.

### Secondary

- **Pulso Ciano:** destaca uma única palavra no hero; não compete com o esmeralda nas seções editoriais posteriores.

### Neutral

- **Tinta Quase Preta:** superfície escura principal e texto de máxima ênfase sobre fundos claros.
- **Canvas Branco:** superfície clara e texto de máxima ênfase sobre fundos escuros.
- **Texto Silencioso:** texto secundário sobre superfícies escuras.
- **Texto Quieto:** texto secundário sobre superfícies claras.
- **Regra Escura:** divisores discretos em capítulos escuros.
- **Regra Clara:** divisores discretos em capítulos claros.

**The Signal, Not Paint Rule.** O esmeralda marca informação acionável ou estrutural; nunca preenche grandes áreas sem uma função clara.

**The Binary Surface Rule.** Cada capítulo escolhe uma superfície dominante clara ou escura e mantém contraste inequívoco dentro dela.

## Typography

**Display Font:** pilha sans-serif nativa da plataforma

**Body Font:** pilha sans-serif nativa da plataforma

**Label/Mono Font:** pilha monospace nativa da plataforma

**Character:** A família sans nativa mantém o produto direto e rápido, enquanto peso forte, entrelinha curta e tracking negativo dão aos títulos uma presença editorial. O monospace aparece somente onde a interface comunica sequência ou dado operacional.

### Hierarchy

- **Display:** peso forte, escala fluida e entrelinha compacta; reservado às teses principais de uma seção.
- **Headline:** peso forte e tracking fechado; abre capítulos menores sem perder autoridade.
- **Title:** peso semibold e tracking levemente negativo; nomeia serviços e itens estruturais.
- **Body:** tamanho confortável e entrelinha ampla; explica valor em blocos curtos com largura limitada.
- **Label:** escala pequena, algarismos tabulares e família monospace; usada na numeração sequencial dos serviços.

**The Compressed Thesis Rule.** Títulos principais usam entrelinha apertada e tracking negativo; textos explicativos respiram com entrelinha ampla.

**The Mono Means Sequence Rule.** Monospace serve à numeração e a metadados operacionais, não a parágrafos ou decoração.

## Layout

O conteúdo vive em um container central de largura máxima ampla, com padding lateral compacto no mobile e maior a partir de telas pequenas. Seções editoriais usam respiro vertical generoso: seis rem em telas menores e oito rem no desktop.

Composições começam em uma coluna. No desktop, a seção Sobre divide tese e lista de capacidades em proporção aproximada de dois para um; Serviços divide título e sequência em duas colunas assimétricas, mantendo a introdução fixa durante a leitura quando há altura disponível. Cada linha de serviço progride de um empilhamento simples para uma grade de número, título e descrição. Os breakpoints observados são 640px para ajustes intermediários e 1024px para a composição em múltiplas colunas.

**The Reading Path Rule.** O layout deve revelar uma ordem clara — tese, evidência, ação — mesmo antes da leitura do texto.

**The One Axis Rule.** Em telas pequenas, todo conteúdo retorna a um fluxo vertical simples; nenhuma composição depende de sobreposição para permanecer legível.

## Elevation & Depth

O sistema é plano por padrão e não usa sombras como vocabulário recorrente. Profundidade vem de inversões tonais, transparência controlada no cabeçalho fixo, divisores e contraste entre capítulos. Estados interativos mudam densidade de cor, não simulam elevação física.

**The Flat-by-Default Rule.** Superfícies se separam por tom, espaço ou regra; sombras não substituem hierarquia.

## Shapes

As formas são discretamente arredondadas em controles compactos, enquanto seções, listas e superfícies editoriais permanecem retangulares. Botões usam cantos moderados, badges usam cantos suaves e o ponto de status é circular. Regras de um pixel organizam listas sem criar caixas.

**The Controls-Only Curve Rule.** Arredondamento pertence a controles e indicadores; blocos editoriais mantêm silhueta reta.

## Components

### Buttons

Contidos, técnicos e seguros: o botão destaca a ação por cor e densidade, não por volume.

- **Shape:** cantos moderadamente curvos e largura ajustada ao conteúdo.
- **Primary:** fundo esmeralda profundo translúcido, texto em esmeralda luminoso e padding horizontal generoso.
- **Hover / Focus:** o hover aumenta a opacidade do fundo com transição de cor curta; o foco deve permanecer claramente visível sem alterar a geometria.
- **Icon support:** ícones lineares podem aparecer antes ou depois do texto, sempre alinhados pelo centro.

### Navigation

O cabeçalho é fixo e translúcido sobre uma base preta. O logotipo ancora a esquerda; links claros ocupam o centro e a ação principal fecha a composição. O estado ativo troca o texto para esmeralda. Em adaptações móveis, preserve logotipo e ação principal e compacte ou recolha os links sem quebrar a primeira viewport.

### Status Chip

Um badge compacto combina borda zinc suave, superfície contrastante, texto pequeno e um ponto esmeralda pulsante. É reservado a mensagens curtas de disponibilidade ou posicionamento, nunca a parágrafos.

### Capability List

Listas de capacidades usam regras horizontais, ícones Lucide lineares em esmeralda e rótulos de peso médio. O padrão oferece escaneabilidade sem converter cada capacidade em cartão.

### Service Sequence

A sequência de serviços é o componente editorial de assinatura. Uma regra superior abre a lista; cada linha é numerada em monospace esmeralda e separada por uma regra inferior. No desktop, número, nome e explicação formam três colunas; no mobile, empilham na mesma ordem. Não há fundo individual, raio ou sombra por item.

## Do's and Don'ts

### Do:

- **Do** use superfícies preto/branco e zinc para criar capítulos inequívocos.
- **Do** limite o esmeralda a ações, palavras decisivas, ícones e marcadores estruturais.
- **Do** mantenha títulos compactos e textos explicativos mais arejados.
- **Do** apresente conjuntos de capacidades como listas ordenadas por regras e ritmo quando a leitura sequencial importar.
- **Do** preserve a progressão responsiva de coluna única para grids assimétricos apenas quando houver espaço.

### Don't:

- **Don't** transforme serviços em uma grade de cartões intercambiáveis.
- **Don't** use sombras, gradientes ou grandes campos saturados para fabricar profundidade.
- **Don't** aplique esmeralda e ciano simultaneamente como acentos equivalentes na mesma seção.
- **Don't** arredonde seções ou linhas editoriais como se fossem controles.
- **Don't** invente claims, selos ou métricas para preencher áreas visuais.
