import { Button, Container, Modal } from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { CadastrarEditarLivro } from '../components/cadastrar-livro/cadastrar-editar-livro';
import { ApiConstants } from '../constants/api.constants';
import { Livro } from '../models/Livro';
import styles from '../styles/Home.module.scss';

export default function Home() {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [modalCadastroAberto, setModalCadastroAberto] = useState(false);

  function abrirModalCadastro() {
    setModalCadastroAberto(true);
  }

  function fecharModalCadastro() {
    setModalCadastroAberto(false);
  }

  async function buscarLivros() {
    const response = await fetch(ApiConstants.API_LIVROS);
    const livros = await response.json();
    setLivros(livros);
  }

  useEffect(() => {
    buscarLivros();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Livros</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container maxWidth="md">
        <h1>Livros</h1>
        <ul>
          {livros.map((livro) => (
            <li key={livro.id}>{livro.titulo}</li>
          ))}
        </ul>

        <Button variant="outlined" onClick={() => abrirModalCadastro()}>
          {' '}
          Cadastrar{' '}
        </Button>
      </Container>

      <Modal
        onClose={() => fecharModalCadastro()}
        closeAfterTransition
        open={modalCadastroAberto}
      >
        <CadastrarEditarLivro
          onClose={fecharModalCadastro}
          onAtualizarLista={buscarLivros}
        />
      </Modal>
    </div>
  );
}
