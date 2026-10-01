# Contexto do Projeto

Antes de fazer qualquer coisa, leia os arquivos `agents.md`, `arquitetura.md` e `backlog.md`.

Contexto geral do Projeto CiNEPLANNER, projeto do grupo vermelho. Site de comentários e avaliação sobre filmes.

## Tecnologias

- HTML
- CSS
- camelCase para os nomes dos arquivos

Não use e nem instale nada neste projeto.

Este projeto NÃO USA JavaScript.

**JAMAIS** Faça uma estilização nos arquivos `.jsx`, utilize apenas os `.css`.

- Faça uma NAVBAR igual para todas as páginas criadas do projeto (com exceção à tela de login e de cadastro), use o arquivo `index.html` para fazer igual em todas.
    - Imagem da logo "CiNEPLANNER" em vermelho.
- Faça o RODAPÉ sempre exatamente idêntico ao do rodapé `index.html`.

## Referências

- Veja a referência na pasta `referencias`.
- Não se prenda à referência, apenas use como inspiração. No geral, faça mais detalhado e mais bonito.
- Não use as imagens da referência.
- No lugar das imagens use placeholders.
- Todas as seções devem ser separadas por comentários.
- O HTML e o CSS devem ser em arquivos separados dentro da pasta `frontend`.
- Os arquivos CSS devem ficar dentro da pasta `css`, que está dentro da pasta `frontend`.

## Cores

- Use vermelho para os destaques.
- Use preto como padrão e para a navbar.
- Use cinza claro para o fundo sem imagem.
- Use SEMPRE as mesmas cores para todas as páginas.
- Utilize o `index.html` como referência para as cores.

# Páginas

## index.html

Contendo:

- Tela inicial.
- Cabeçalho/hero com uma imagem de fundo e uma frase qualquer.
- Em seguida, uma seção de filmes com maior nota.
- Na seção de filmes, utilizar 4 cards por linha.
- Depois que o cabeçalho acabar, deverá aparecer uma navbar com as opções:
    - Gênero
    - Mais popular
    - Lançamentos
    - Em cartaz
- Nos cards de cada filme, na parte inferior deverá aparecer:
    - Nome do filme
    - Gênero do filme
    - Nota do filme

## resenha.html

Quando se clica em um filme na página inicial, deve aparecer uma página com:

- Foto do filme ampliada do lado esquerdo.
- Nota com estrelas embaixo do poster.
- Do lado direito da foto:
    - Título do filme maior.
    - Gênero do filme.
    - Sinopse do filme.
    - Elenco do filme.
- Embaixo deverá ter a seção de comentários dos usuários.
- Cada comentário deve mostrar:
    - Foto do usuário.
    - Nome.
    - Quantidade de curtidas.
    - Comentário.
- Embaixo do comentário deverá existir uma seção de respostas.
- A seção de respostas será expandida caso clique no comentário.
- Dentro da seção de respostas deverá ter um campo para que o usuário responda, se quiser.
- No final da seção de comentários deverá existir uma área para o usuário escrever seu próprio comentário.

## registro.html

A tela de registro contém:

- Campo para o nome do usuário.
- Campo para o e-mail.
- Campo para a senha.
- Campo para confirmar a senha.
- Botão de confirmar.

## login.html

A tela de login contém:

- Campo para o e-mail.
- Campo para a senha.
- Botão de confirmar.

# Regras de CSS

## Layout geral

- O site deve ocupar 100% da largura da tela.
- Não deixar o conteúdo principal preso dentro de uma div/container com largura limitada.
- Evitar larguras fixas que façam o site ficar menor que a tela.
- Utilizar `width: 100%` quando necessário.
- O container principal deve aproveitar toda a largura disponível.
- Remover margens laterais desnecessárias.
- O site deve ter um layout moderno, organizado e bem distribuído.
- O conteúdo não deve parecer espremido no centro por causa de uma div com `max-width` ou largura fixa.

## Container principal

- Corrigir o container principal caso ele esteja limitando a largura do site.
- Evitar utilizar uma largura fixa como `1200px`, `1280px` ou semelhante quando isso fizer o site não ocupar a tela inteira.
- Quando necessário, utilizar:
    - `width: 100%`
    - `max-width: none`
    - `margin: 0`
- O conteúdo deve ser organizado utilizando Flexbox e/ou Grid.
- Não utilizar `position: absolute` para simplesmente empurrar elementos para os lados.

## Rodapé

- O rodapé NÃO deve ficar preso dentro da div/container principal que limita a página.
- O rodapé deve ficar fora do container principal quando necessário.
- O rodapé deve ocupar 100% da largura da tela.
- O rodapé deve continuar exatamente igual ao rodapé existente no `index.html`.
- Não modificar o visual original do rodapé.
- A separação do container principal e do rodapé deve permitir que ambos ocupem corretamente a largura da tela.

Exemplo de estrutura esperada:

<div class="containerPrincipal">
    conteúdo da página
</div>

<footer>
    rodapé
</footer>

O rodapé não deve ficar preso dentro de uma div que tenha largura limitada.

## Navbar

A navbar deve ocupar toda a largura da tela.

Na navbar:

- A logo "CiNEPLANNER" deve ficar mais para a esquerda.
- Os elementos da navegação devem ficar bem distribuídos.
- O botão "Entrar" deve ficar mais para a direita.
- A barra de pesquisa deve ficar um pouco menor.
- A barra de pesquisa não deve ocupar espaço excessivo.
- Não deixar a navbar espremida dentro de um container pequeno.
- Utilizar Flexbox para organizar os elementos.
- Manter alinhamento vertical entre os elementos.
- Manter espaçamentos consistentes.

A ideia é que a navbar fique aproximadamente assim:

[ LOGO ]       [ opções/menu ] [ pesquisa menor ]       [ ENTRAR ]

A logo deve ficar próxima à esquerda da tela e o botão de entrar próximo à direita.

## Conteúdo principal / Hero

- Os textos principais do hero devem continuar centralizados.
- NÃO mover os textos do hero para a esquerda apenas para compensar o problema do container.
- O texto deve permanecer visualmente no meio da tela.
- O título e a frase principal devem ficar centralizados.
- O conteúdo do hero deve aproveitar a largura da tela sem perder o alinhamento central.

## Cards de filmes

- Utilizar Grid ou Flexbox.
- Na página inicial devem existir 4 cards por linha em telas grandes.
- Os cards devem ter espaçamento uniforme.
- Os cards devem manter tamanhos visualmente semelhantes.
- O nome, gênero e nota devem ficar organizados na parte inferior do card.
- Utilizar vermelho para destaques e notas quando apropriado.
- O design deve ser moderno e organizado.
- Não deixar os cards espremidos por causa de um container com largura limitada.

## Responsividade

- O site deve se adaptar a diferentes tamanhos de tela.
- Não utilizar medidas que façam o conteúdo quebrar em telas menores.
- O layout deve se ajustar utilizando Flexbox e Grid.
- A navbar deve se adaptar ao tamanho disponível.
- Os cards devem diminuir a quantidade por linha em telas menores quando necessário.
- Evitar overflow horizontal.

## Organização do CSS

- Manter o CSS organizado.
- Evitar estilos duplicados.
- Reutilizar classes quando os elementos possuírem o mesmo comportamento visual.
- Separar visualmente as seções utilizando comentários no CSS quando apropriado.
- Manter nomes de classes claros.
- Não criar arquivos ou dependências desnecessárias.
- Não instalar bibliotecas.
- Não utilizar JavaScript.

## Identidade visual

Todas as páginas devem manter a mesma identidade visual do CiNEPLANNER.

Utilizar:

- Vermelho para destaques.
- Preto para elementos padrão e navbar.
- Cinza claro para fundos sem imagem.
- Mesmas cores em todas as páginas.
- Mesmos padrões de espaçamento e componentes sempre que possível.

O objetivo é deixar o CiNEPLANNER com aparência moderna, bonita, organizada e consistente, sem fugir da referência visual do projeto.

## Regra importante sobre posicionamento

Não resolver problemas de layout simplesmente adicionando vários `margin-left`, `margin-right`, `top` ou `left`.

Primeiro verificar se o problema está sendo causado por:

- `div`/container com largura limitada;
- `max-width`;
- `width` fixa;
- `margin` automático;
- `padding` excessivo;
- Flexbox;
- Grid;
- alinhamento dos elementos.

Corrigir a estrutura do layout primeiro e depois ajustar os espaçamentos.

O resultado desejado é:

- Página ocupando a tela inteira.
- Navbar ocupando a tela inteira.
- Logo mais à esquerda.
- Pesquisa um pouco menor.
- Botão "Entrar" mais à direita.
- Textos principais centralizados.
- Conteúdo principal bem distribuído.
- Rodapé fora do container limitado e ocupando toda a largura da tela.
- Todas as páginas mantendo o mesmo padrão visual.