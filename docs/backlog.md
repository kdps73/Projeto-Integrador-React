# Backlog do Projeto CiNEPLANNER

## Funcionalidades Já Implementadas (Etapa 1: Front-end e Design)

Conforme a análise do `docs/contexto.md` e do repositório atual, as seguintes features já estão com a estrutura inicial construída no projeto (utilizando a estrutura do React + Vite, com foco apenas no HTML/CSS):

### Componentes Globais
- [x] **Navbar Global:** Barra de navegação preta com a logo vermelha do "CiNEPLANNER", aplicada nas páginas principais (ausente em Login/Registro).
- [x] **Rodapé Global:** Rodapé padronizado incluído em todas as páginas necessárias, idêntico à referência inicial.

### Páginas
- [x] **Página Inicial (`App.jsx` referente ao `index.html` do contexto):**
  - Cabeçalho (hero) com imagem de fundo e frase de boas-vindas.
  - Barra de filtros com os dropdowns para: Gênero, Mais popular, Lançamentos e Em cartaz.
  - Seção com grade de filmes avaliados exibindo cards (com imagem, título, gênero e nota).

- [x] **Página de Resenha de Filmes (`Resenha.jsx` referente ao `resenha.html` do contexto):**
  - Apresentação visual com pôster do filme à esquerda e notas (estrelas) abaixo.
  - Bloco à direita contendo: Título, gênero, sinopse descritiva e grade do elenco principal.
  - Seção interativa de comentários contendo:
    - Informações do usuário (foto, nome e curtidas).
    - Botão/expansão de respostas para comentários.
    - Formulários para respostas diretas em comentários.
    - Área no final da página destinada a um novo comentário principal.

- [x] **Página de Registro (`Registro.jsx` referente ao `registro.html` do contexto):**
  - Formulário contendo os campos exigidos: nome do usuário, e-mail, senha, confirmação de senha e botão de ação.

- [x] **Página de Login (`Login.jsx` referente ao `login.html` do contexto):**
  - Formulário contendo os campos exigidos: e-mail, senha e botão de ação.

- [x] **Página de Perfil do Usuário (`Usuario.jsx`):**
  - Card de perfil com nível, XP, avatar e acessórios cosméticos (chapéu, item na mão e mascote).
  - Edição de biografia em tempo real com alternância entre `<textarea>` e parágrafo `<p>`.
  - Integração com Supabase: Busca dados do usuário (incluindo `url_img` e itens FK) e atualiza a coluna `bio`.
  - Carrosséis interativos para filmes favoritos e filmes para assistir mais tarde.

## Próximas Etapas (Ref.: `docs/arquitetura.md`)
- [/] **Etapa 2 - Busca na API:** Conectada a busca do Supabase na tela de Usuário (perfil, itens e filmes). Faltam conexões completas nas telas de Resenha, Início e Listas.
- [/] **Etapa 3 - Inserção de Dados:** Inserida atualização de bio no Supabase. Pendente criação da tabela `usuario_filmes` e inserção de novos comentários e avaliações.
- [ ] **Etapa 4 - Testes e Finalização:** Ajustes de QA, revisão final do build e publicação.
