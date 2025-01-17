import { Button, Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/system';
import Axios from 'axios';
import Head from 'next/head';
import { useState } from 'react';
import { ApiConstants } from '../../constants/api.constants';
import { Livro } from '../../models/Livro';
import styles from './cadastrar-editar-livro.module.scss';

type CadastrarEditarLivroProps = {
  onClose: () => void;
  onAtualizarLista: () => void;
  editandoLivro?: Livro;
};

export function CadastrarEditarLivro({
  onClose,
  onAtualizarLista,
  editandoLivro,
}: CadastrarEditarLivroProps) {
  const formDefault = {
    titulo: '',
    autor: '',
    ano: '',
  };

  const [form, setForm] = useState<any>(editandoLivro ?? formDefault);

  function handleChange(event: any) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function cadastrarLivro() {
    const response = await Axios.request({
      method: 'POST',
      url: `${ApiConstants.API_URL}/livros`,
      data: form,
    });

    if (response.status == 200) {
      onAtualizarLista();
      onClose();
    }
  }

  async function editarLivro() {
    const response = await Axios.request({
      method: 'PATCH',
      url: `${ApiConstants.API_URL}/livros/${editandoLivro?.id}`,
      data: form,
    });

    if (response.status == 200) {
      onAtualizarLista();
      onClose();
    }
  }

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Head>
        <title>{`${editandoLivro ? 'Editar' : 'Cadastrar'} Livro`}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* FORMULARIO DE CADASTRO */}
      <Box component="form" autoComplete="off">
        <Typography
          variant="h4"
          component="h1"
          sx={{ textAlign: 'center', mb: 2 }}
        >
          Cadastrar Livro
        </Typography>

        {/* Close Button */}
        <Button
          variant="contained"
          color="error"
          sx={{ position: 'absolute', top: 0, right: 0 }}
          onClick={onClose}
        >
          X
        </Button>

        <div>
          <TextField
            required
            variant="outlined"
            label="Título"
            name="titulo"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            required
            variant="outlined"
            label="Autor"
            name="autor"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="Descricao"
            name="descricao"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            required
            variant="outlined"
            label="Editora"
            name="editora"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            required
            variant="outlined"
            label="Ano"
            name="ano"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            label="URL da capa"
            name="urlCapa"
            fullWidth
            margin="normal"
            onChange={handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={cadastrarLivro}
          >
            Cadastrar
          </Button>
        </div>
      </Box>
    </Container>
  );
}
