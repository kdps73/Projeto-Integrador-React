-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.itens (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  tipo smallint,
  url_imagem text,
  valor_xp bigint,
  CONSTRAINT itens_pkey PRIMARY KEY (id)
);
CREATE TABLE public.usuario (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome text,
  username text,
  email text,
  telefone text,
  senha_hash text,
  bio text,
  xp_total bigint,
  nivel bigint,
  criado timestamp with time zone DEFAULT now(),
  id_item_chapeu bigint,
  id_item_mao bigint,
  id_item_mascote bigint,
  url_img text,
  CONSTRAINT usuario_pkey PRIMARY KEY (id),
  CONSTRAINT usuario_id_item_chapeu_fkey FOREIGN KEY (id_item_chapeu) REFERENCES public.itens(id),
  CONSTRAINT usuario_id_item_mao_fkey FOREIGN KEY (id_item_mao) REFERENCES public.itens(id),
  CONSTRAINT usuario_id_item_mascote_fkey FOREIGN KEY (id_item_mascote) REFERENCES public.itens(id)
);
CREATE TABLE public.filmes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  titulo text,
  sinopse text,
  ano_lancamento date,
  duracao double precision,
  classificacao text,
  poster_url text,
  franquia text,
  CONSTRAINT filmes_pkey PRIMARY KEY (id)
);
CREATE TABLE public.comentarios (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_usuario bigint,
  id_filme bigint,
  conteudo text,
  criado timestamp with time zone DEFAULT now(),
  CONSTRAINT comentarios_pkey PRIMARY KEY (id),
  CONSTRAINT comentarios_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id),
  CONSTRAINT comentarios_id_filme_fkey FOREIGN KEY (id_filme) REFERENCES public.filmes(id)
);
CREATE TABLE public.curtidas (
  id_usuario bigint NOT NULL,
  id_comentario bigint NOT NULL,
  criado timestamp with time zone DEFAULT now(),
  CONSTRAINT curtidas_pkey PRIMARY KEY (id_usuario, id_comentario),
  CONSTRAINT curtidas_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id),
  CONSTRAINT curtidas_id_comentario_fkey FOREIGN KEY (id_comentario) REFERENCES public.comentarios(id)
);
CREATE TABLE public.avaliacoes (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  id_filme bigint,
  id_usuario bigint,
  nota bigint,
  CONSTRAINT avaliacoes_pkey PRIMARY KEY (id),
  CONSTRAINT avaliacoes_id_filme_fkey FOREIGN KEY (id_filme) REFERENCES public.filmes(id),
  CONSTRAINT avaliacoes_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id)
);
CREATE TABLE public.elenco (
  id_filme bigint,
  ator text,
  personagens ARRAY,
  url_img text,
  CONSTRAINT elenco_id_filme_fkey FOREIGN KEY (id_filme) REFERENCES public.filmes(id)
);