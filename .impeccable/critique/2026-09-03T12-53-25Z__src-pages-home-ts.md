---
target: homepage
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-03T12-53-25Z
slug: src-pages-home-ts
---
# Impeccable Critique — Homepage

## Design Health Score

| # | Heurística | Nota | Questão principal |
|---|---|---:|---|
| 1 | Visibilidade do status do sistema | 2 | Há loading, erro e retry nos depoimentos, mas o estado ativo da navegação é pouco confiável e o handoff ao WhatsApp não confirma sucesso. |
| 2 | Correspondência com o mundo real | 3 | A linguagem é direta, porém termos como MVP, API, webhook e nativo/híbrido exigem conhecimento técnico. |
| 3 | Controle e liberdade | 3 | Âncoras, Escape nos menus e alternativa por e-mail ajudam; o usuário não revisa nem recupera claramente um WhatsApp bloqueado. |
| 4 | Consistência e padrões | 3 | O sistema editorial é coeso, mas ciano, amarelo e verde competem com a regra do esmeralda e os CTAs variam de tratamento. |
| 5 | Prevenção de erros | 2 | Tipos e campos obrigatórios ajudam, mas faltam orientação por campo, apoio ao telefone e contexto de privacidade. |
| 6 | Reconhecimento em vez de memorização | 3 | Rótulos e seções são claros; sete destinos no topo e controles visualmente só com ícone elevam o esforço de varredura. |
| 7 | Flexibilidade e eficiência | n/a | Em uma landing page de persuasão, aceleradores para usuários experientes não são requisito significativo. |
| 8 | Estética e design minimalista | 3 | Boa hierarquia e espaço; repetição de capacidades, excesso de destinos e claims não comprovados alongam o funil. |
| 9 | Reconhecimento, diagnóstico e recuperação de erros | 2 | Depoimentos têm retry claro; o formulário depende de mensagens genéricas e não oferece recuperação robusta do WhatsApp. |
| 10 | Ajuda e documentação | n/a | Documentação não é requisito relevante desta landing page. |
| **Total** |  | **21/32** | **Aceitável (65,6%); melhorias importantes permanecem.** |

## Veredito de especificidade

**Avaliação qualitativa:** moderadamente autoral, ainda não inconfundivelmente Move Up. A alternância preto/branco, o esmeralda operacional, a sequência de serviços por regras e a timeline MOVE dão mais identidade que a landing page típica de agência. Porém o primeiro viewport e os pontos de conversão continuam intercambiáveis: “ideia vira sistema”, amplitude genérica de capacidades, chip de status, estatísticas de confiança e formulário convencional poderiam pertencer a quase qualquer software house. O elemento mais proprietário — MOVE como modo de trabalhar — aparece tarde.

**Varredura determinística:** `detect.mjs --json src/pages/home.ts` encerrou com código 0 e retornou `[]`: 0 achados, 0 regras e 0 localizações. Não houve falso positivo. Isso confirma uma boa base formal, mas não contradiz problemas de estratégia, confiança e arquitetura persuasiva que dependem de julgamento.

**Overlays visuais:** não há overlay confiável visível. O ambiente não expôs automação de navegador/tab mutável; portanto não foi possível abrir a aplicação local, fazer o preflight de injeção ou apresentar a camada `[Human]`. O sinal alternativo foi a varredura CLI limpa combinada à inspeção estática do código e do sistema visual.

## Impressão geral

A página parece organizada, madura e tecnicamente cuidadosa. Seu maior ativo é transformar entrega de software em uma sequência legível; sua maior oportunidade é fazer essa ideia comandar a narrativa desde o hero e substituir promessas genéricas por evidência verificável. Hoje, o meio da página tem mais personalidade e credibilidade que o começo e o fim.

## O que funciona

- **MOVE é caráter de produto:** o acrônimo, a ordem e o progresso transformam uma consultoria abstrata em um processo compreensível e controlável.
- **A sequência editorial de serviços é forte:** números, divisores e colunas assimétricas criam ritmo sem recorrer a cards genéricos.
- **A intenção de acessibilidade é consistente:** semântica, foco visível, `inert`/ARIA, redução de movimento, live regions, retry e alvos de toque generosos estão presentes.

## Questões prioritárias

### [P1] Certeza comercial sem sustentação reduz confiança

**Por que importa:** “5.0”, “+50 mil usuários”, resposta em um dia útil, “sem retrabalho” e “no prazo combinado” não estão apoiados nas evidências documentadas do projeto. Para um comprador cauteloso, um único número questionável contamina logos e depoimentos legítimos.

**Correção:** remover os claims até que tenham fonte ou substituí-los por evidências disponíveis: cliente nomeado, problema, artefato entregue e resultado documentado. Qualificar compromissos de processo em vez de garantir desfechos.

**Comando sugerido:** `$impeccable clarify`.

### [P1] O clímax de contato não reduz risco nem conclui com segurança

**Por que importa:** o formulário pede dados pessoais e abre o WhatsApp em nova janela, sem explicar uso dos dados, quem responderá, próximo passo ou o que fazer se o popup falhar.

**Correção:** adicionar uma nota curta de uso dos dados e expectativa de resposta; detectar falha de `window.open`; preservar os campos e oferecer link manual/copiar mensagem; anunciar sucesso ou fallback de forma explícita.

**Comando sugerido:** `$impeccable harden`.

### [P2] A narrativa começa genérica e enterra o ativo mais proprietário

**Por que importa:** eficiência e amplitude de canais descrevem a categoria; MOVE explica por que escolher esta empresa. Encontrá-lo só depois de clientes e Sobre reduz diferenciação na primeira impressão.

**Correção:** levar uma prévia compacta do MOVE ao hero ou imediatamente abaixo dele e fazer a promessa principal refletir o método ou uma transformação operacional concreta.

**Comando sugerido:** `$impeccable bolder` ou `$impeccable shape`.

### [P2] A arquitetura de prova é ampla, porém rasa e repetitiva

**Por que importa:** logos aparecem sem contexto; Sobre repete o hero; Serviços repete novamente; os depoimentos chegam muito depois e dependem de carregamento dinâmico.

**Correção:** condensar a enumeração de capacidades e criar 1–2 narrativas curtas de caso ligando cliente, problema operacional, entrega e resultado — somente com fatos comprovados.

**Comando sugerido:** `$impeccable distill`.

### [P2] Navegação e escolhas estão superexpostas

**Por que importa:** sete links no desktop têm o mesmo peso; seis serviços e sete tipos de projeto impõem decisões sem orientação; o estado ativo parece comparar hash com rota, não acompanhar scroll.

**Correção:** reduzir a navegação principal para 4–5 destinos por intenção, mover o restante ao menu/rodapé, agrupar tipos de projeto em linguagem do comprador e implementar scroll-spy com estado atual confiável.

**Comando sugerido:** `$impeccable layout` e `$impeccable clarify`.

## Red flags por persona

**Jordan, comprador de software pela primeira vez:** precisa escolher entre Web, Mobile, Desktop, Integração, Automação e Consultoria antes de saber qual solução resolve seu problema. “MVP”, APIs e webhooks presumem fluência técnica. Os sete links do topo não sugerem um caminho. “Não sei ainda” ajuda, mas aparece apenas no formulário final.

**Sam, usuário de teclado/leitor de tela/baixa visão:** foco e semântica são bons, mas tema, telefone e menu dependem visualmente apenas de ícones; a seção atual não é comunicada de forma confiável; o erro genérico fica separado dos campos; o ponto pulsante do hero não está oculto de tecnologia assistiva.

**Marina, decisora cautelosa de PME/compras:** encontra afirmações fortes sem fonte, logos sem explicação do trabalho e depoimentos ausentes do HTML inicial. No contato, fornece nome, e-mail e telefone sem privacidade, processo comercial ou responsável pela resposta. Pode preferir o e-mail — ou adiar o contato.

## Carga cognitiva

Moderada, com 3 de 8 falhas: chunking, escolhas mínimas e divulgação progressiva. Os maiores pontos de carga são 7 destinos no cabeçalho, 7 opções de tipo de projeto e 6 ofertas de serviço. A página não é visualmente bagunçada; o problema é a repetição cumulativa e a falta de priorização.

## Jornada emocional

O arco pretendido é promissor: promessa → clientes → explicação → método → capacidades → depoimentos → contato. O pico provável é a timeline MOVE. O primeiro vale surge nos claims de alta certeza sem prova; o segundo, no contato, quando dados pessoais são solicitados sem privacidade ou desfecho robusto. O fim é transacional quando deveria ser humano e tranquilizador.

## Observações menores

- `text-xm` na nota do CTA parece ser uma utility inválida e pode herdar um tamanho inesperado.
- “Excelente customerprofissional” nos dados locais de depoimentos é um erro de credibilidade se for exibido.
- O hero usa ciano, amarelo e verde na mesma zona, enfraquecendo a regra “signal, not paint”.
- O empty state dos depoimentos não oferece uma prova alternativa nem link para trabalhos.
- O título da página usa “Moveup”, enquanto produto e design usam “Move Up”.
- O mesmo `dark.svg` funciona sobre header/rodapé escuros, mas o nome do arquivo favorece uso incorreto futuro.

## Perguntas a considerar

1. Se MOVE é a ideia mais própria da empresa, por que o visitante a encontra só depois de promessas genéricas e logos?
2. Qual único problema a homepage deve vencer primeiro: substituir operação manual, lançar produto digital ou recuperar sistema existente?
3. Uma história de projeto nomeada e verificável seria mais convincente que todos os números e superlativos atuais juntos?
4. No instante em que alguém fornece telefone e e-mail, o que precisa ser dito para o handoff parecer seguro, específico e humano?
5. O pico emocional final deve ser “entendi como vocês trabalham” ou apenas “achei o formulário”?
