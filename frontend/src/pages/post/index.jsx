import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert, Table, Badge, Pagination } from "react-bootstrap";
import { useApiService } from "../../services/api";

const PostModal = ({ showModal, handleClose, postEditado }) => {
  const api = useApiService();

  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [tagsSelecionadas, setTagsSelecionadas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [tags, setTags] = useState([]);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [saving, setSaving] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showPostModal, setShowPostModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postSelecionado, setPostSelecionado] = useState(null);

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        const response = await api.get("/api/usuarios");
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };
    carregarUsuarios();
  }, []);

  useEffect(() => {
    const carregarTags = async () => {
      try {
        const response = await api.get("/api/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Erro ao carregar tags:", error);
      }
    };
    carregarTags();
  }, []);

  useEffect(() => {
    const carregarPosts = async () => {
      setLoading(true);
      try {
        const response = await api.get("/api/posts");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarPosts();
  }, [showModal]);

  useEffect(() => {
    if (postEditado) {
      setTitulo(postEditado.title);
      setConteudo(postEditado.content);
      setAutor(postEditado.user_id);
      setTagsSelecionadas(postEditado.tags || []);
    } else {
      setTitulo("");
      setConteudo("");
      setAutor("");
      setTagsSelecionadas([]);
    }
    setErro("");
    setMensagem("");
  }, [showModal, postEditado]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let response;
      const postData = {
        titulo,
        conteudo,
        user_id: autor,
        tags: JSON.stringify(tagsSelecionadas),
      };

      if (postEditado) {
        response = await api.put(`/api/posts/${postEditado.id}`, postData);
      } else {
        response = await api.post("/api/post/insert", postData);
      }

      if (response.data.error) {
        setErro(response.data.error);
      } else {
        setMensagem("Post salvo com sucesso!");
        setShowPostModal(false);
      }
    } catch (error) {
      setErro("Erro ao tentar salvar o post.");
    } finally {
      setSaving(false);
    }
  };

  const toggleTag = (tagName) => {
    setTagsSelecionadas((prevTags) =>
      prevTags.includes(tagName)
        ? prevTags.filter((tag) => tag !== tagName)
        : [...prevTags, tagName]
    );
  };

  const handleShowDeleteModal = (post) => {
    setPostSelecionado(post);
    setShowDeleteModal(true);
  };

  const confirmarExclusao = async () => {
    if (!postSelecionado) return;

    try {
      await api.delete(`/api/post/${postSelecionado.id}`);
      setPosts(posts.filter((p) => p.id !== postSelecionado.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  // Paginação: Calcular posts atuais
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <Button className="mb-3" variant="primary" onClick={() => setShowPostModal(true)}>
        Novo Post
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Data</th>
            <th style={{ width: "160px", textAlign: "center" }}>Opções</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.name}</td>
              <td>{new Date(post.created_at).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm" onClick={() => handleShowDeleteModal(post)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Paginação */}
      <Pagination>
        {Array.from({ length: Math.ceil(posts.length / postsPerPage) }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      <Modal show={showPostModal} onHide={() => setShowPostModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{postEditado ? "Editar Post" : "Cadastrar Novo Post"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {erro && <Alert variant="danger">{erro}</Alert>}
          {mensagem && <Alert variant="success">{mensagem}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAutor">
              <Form.Label>Autor</Form.Label>
              <Form.Select value={autor} onChange={(e) => setAutor(e.target.value)} required>
                <option value="">Selecione um autor</option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="formTitulo">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConteudo">
              <Form.Label>Post</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Escreva seu post aqui..."
                value={conteudo}
                onChange={(e) => setConteudo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTags">
              <Form.Label>Tags</Form.Label>
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    pill
                    className={`m-1 p-2 ${tagsSelecionadas.includes(tag.name) ? "bg-primary text-white" : "bg-light text-dark"}`}
                    onClick={() => toggleTag(tag.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={saving}>
              {saving ? "Salvando..." : postEditado ? "Salvar Alterações" : "Salvar"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPostModal(false)}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir o post "{postSelecionado?.title}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmarExclusao}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostModal;