# Documentação da Página de Usuário (`Usuario.jsx`)

## 1. Visão Geral e Objetivo
A página de **Usuário** (`/usuario`) é o painel de perfil do cineasta no **CiNEPLANNER**. Ela combina elementos de perfil de rede social de filmes com um sistema de **gamificação (XP e Níveis)** e personalização visual do avatar com itens cosméticos (chapéus, acessórios e mascotes).

---

## 2. Estrutura dos Arquivos

* **`src/Usuario.jsx`**: Arquivo principal da tela em formato React monobloco.
* **`src/css/usuario.css`**: Folha de estilo escopada sob o id `#pagina-usuario` para evitar vazamento de estilos para outras telas.
* **`src/components/Menu.jsx`**: Navbar padrão da aplicação.
* **`src/components/Rodape.jsx`**: Rodapé padrão da aplicação.
* **`src/supabse.js`**: Cliente de conexão com a API e banco de dados do Supabase.

---

## 3. Funcionalidades e Estados da Tela

### A. Progresso e Gamificação (XP)
* **Barra de XP**: Calcula dinamicamente a porcentagem concluída para o próximo nível com base no `xpTotal` e na regra de `600 XP` por nível.
* **Level Badge**: Exibe o nível atual do usuário (`usuario.nivel`).

### B. Perfil do Avatar e Cosméticos
* **Avatar**: Exibe a foto do perfil lida do campo `url_img` do banco (com fallback de imagem caso esteja vazio ou quebrado).
* **Acessórios Equipados**: Exibe os cosméticos vinculados às chaves estrangeiras:
  * Chapéu sobre o avatar (`id_item_chapeu`)
  * Item na mão (`id_item_mao`)
  * Mascote de companhia ao lado (`id_item_mascote`)

### C. Sistema de Biografia Alternável
* **Modo de Leitura**: Exibe a bio como parágrafo `<p>` com botão de "Editar Bio".
* **Modo de Edição**: Transforma a área em uma `<textarea>` posicionada acima dos botões "Salvar Bio" e "Cancelar".
* **Persistência**: Ao salvar, atualiza a bio no estado local e grava a alteração na coluna `bio` da tabela `usuario` no Supabase.

### D. Carrosséis de Filmes
* **Filmes Favoritos**: Carrossel horizontal interativo com botões de rolagem suave (`scrollBy`).
* **Assistir Mais Tarde**: Segundo carrossel para acompanhamento de filmes salvos.

---

## 4. Conexão com o Banco de Dados (Supabase)

### Tabelas Consumidas
* **`public.usuario`**: `id`, `nome`, `username`, `email`, `bio`, `xp_total`, `nivel`, `url_img`, `id_item_chapeu`, `id_item_mao`, `id_item_mascote`.
* **`public.itens`**: Tabela de itens cosméticos contendo `id`, `tipo`, `url_imagem` e `valor_xp`.
* **`public.filmes`**: Tabela principal de filmes (`id`, `titulo`, `genero`, `nota`, `poster_url`).
* **`public.usuario_filmes`** *(recomendado)*: Tabela de vínculo entre usuário e filmes.

---

## 5. Sugestões de Melhorias

### 🛠️ 1. Autenticação Dinâmica (Substituir ID Fixo)
* **Situação Atual**: A busca no Supabase usa o estado inicial estático do ID.
* **Sugestão**: Integrar com a sessão do `supabase.auth.getUser()` para carregar automaticamente o ID do usuário que fez login na página `/login`.

### 🍿 2. Gerenciamento das Listas de Filmes
* **Sugestão**: Adicionar um botão de remoção ou de alteração direta nos cards (ex: um ícone de lixeira ou de "já assistido") que envie uma requisição para a tabela `usuario_filmes` no Supabase.

### 🎭 3. Inventário / Troca de Cosméticos
* **Sugestão**: Criar um modal de "Equipar Itens", onde o usuário possa visualizar os itens cosméticos da tabela `itens` que ele desbloqueou com seu nível/XP e escolher qual chapéu, item de mão ou mascote deseja exibir.

### 🖼️ 4. Upload de Foto de Perfil (`url_img`)
* **Sugestão**: Permitir que o usuário insira a URL da sua foto ou faça upload direto de uma imagem para o Supabase Storage ao clicar no avatar.
