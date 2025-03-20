import React, { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Pagination, Modal, Form } from "react-bootstrap";
import { useApiService } from "../../services/api";

const Listagem = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false); // Estado para controlar o modal de exclusão
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState(""); // Estado para exibir mensagens de sucesso
  const [usuarioEditado, setUsuarioEditado] = useState(null);
  const [usuarioExcluir, setUsuarioExcluir] = useState(null); // Armazenar o usuário a ser excluído
  const [loading, setLoading] = useState(true); // Estado para exibir "Carregando dados..."
  const [saving, setSaving] = useState(false); // Estado para indicar que os dados estão sendo salvos
  const api = useApiService();

  // Carregar lista de usuários
  const carregarUsuarios = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/usuarios");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  // Fechar modal e resetar estado
  const handleClose = () => {
    setShowModal(false);
    setErro("");
    setMensagem("");
    setNome("");
    setEmail("");
    setUsuarioEditado(null);
  };

  // Fechar modal de exclusão
  const handleCloseExcluir = () => {
    setShowModalExcluir(false);
    setUsuarioExcluir(null);
  };

  // Abrir modal para cadastro ou edição
  const handleShow = (usuario = null) => {
    setMensagem(""); // Limpar mensagens antigas
    setErro("");
    if (usuario) {
      setUsuarioEditado(usuario);
      setNome(usuario.name);
      setEmail(usuario.email);
    }
    setShowModal(true);
  };

  // Função para excluir o usuário
  const handleExcluir = async () => {
    if (!usuarioExcluir) return;
    
    try {
      await api.delete(`/api/usuario/delete/${usuarioExcluir.id}`);
      setMensagem("Usuário excluído com sucesso!");
      carregarUsuarios(); // Atualiza a lista de usuários após exclusão
    } catch (error) {
      setErro("Erro ao excluir o usuário.");
    } finally {
      handleCloseExcluir(); // Fecha o modal de exclusão
    }
  };

  // Enviar dados para API (Cadastro ou Edição)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let response;
      if (usuarioEditado) {
        response = await api.post(`/api/usuario/edit/${usuarioEditado.id}`, { nome, email });
      } else {
        response = await api.post("/api/usuario/insert", { nome, email });
      }

      if (response.data.error) {
        setErro(response.data.error);
      } else {
        setMensagem(response.data.message || "Operação realizada com sucesso!");
        carregarUsuarios(); // Atualiza a lista sem fechar o modal
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErro(error.response.data.error);
      } else {
        setErro("Erro ao tentar salvar os dados.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Listagem de Usuários</h2>
      <button className="btn btn-primary" onClick={() => handleShow(null)}>Novo</button>

      {loading ? (
        <div className="mt-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Carregando...</span>
          </Spinner>
          <p>Carregando dados...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th style={{ width: "190px", textAlign: "center" }}>Opções</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>
                  <button className="btn btn-success me-2" onClick={() => handleShow(usuario)}>
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => { setUsuarioExcluir(usuario); setShowModalExcluir(true); }}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de Cadastro/Edição */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{usuarioEditado ? "Editar Usuário" : "Cadastrar Novo Usuário"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {erro && <Alert variant="danger">{erro}</Alert>}
          {mensagem && <Alert variant="success">{mensagem}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNome">
              <Form.Label>Nome</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Digite o nome" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Digite o email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={saving}>
              {saving ? "Salvando..." : usuarioEditado ? "Salvar Alterações" : "Salvar"}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Fechar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Exclusão */}
      <Modal show={showModalExcluir} onHide={handleCloseExcluir}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Você tem certeza que deseja excluir este usuário?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseExcluir}>Cancelar</Button>
          <Button variant="danger" onClick={handleExcluir}>Excluir</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Listagem;