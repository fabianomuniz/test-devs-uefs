import { useEffect, useState } from "react";
import { Table, Button, Spinner, Alert, Pagination, Modal, Form } from "react-bootstrap";
import { useApiService } from "../../services/api";

const ListagemTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagAtual, setTagAtual] = useState({ id: null, name: "" });
  const itemsPerPage = 10;

  const api = useApiService();

  useEffect(() => {
    carregarTags();
  }, []);

  const carregarTags = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tags");
      setTags(response.data);
    } catch (error) {
      setErro("Erro ao carregar tags.");
      console.error("Erro ao carregar tags:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNovo = () => {
    setTagAtual({ id: null, name: "" });
    setShowModal(true);
  };

  const handleEditar = (tag) => {
    setTagAtual(tag);
    setShowModal(true);
  };

  const handleSalvar = async () => {
    try {
      if (tagAtual.id) {
        await api.post(`/api/tags/update/${tagAtual.id}`, { name: tagAtual.name });
      } else {
        await api.post("/api/tags/insert", { name: tagAtual.name });
      }
      carregarTags();
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao salvar tag:", error);
      setErro("Erro ao salvar a tag.");
    }
  };

  const handleExcluir = (tag) => {
    setTagAtual(tag);
    setShowDeleteModal(true);
  };

  const confirmarExclusao = async () => {
    try {
      await api.delete(`/api/tag/${tagAtual.id}`);
      carregarTags();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao excluir tag:", error);
      setErro("Erro ao excluir a tag.");
    }
  };

  const totalPages = Math.ceil(tags.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTags = tags.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container mt-4">
      <h2>Listagem de Tags</h2>
      <Button variant="primary" className="mb-3" onClick={handleNovo}>
        Novo
      </Button>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status" />
          <p>Carregando dados...</p>
        </div>
      )}

      {erro && <Alert variant="danger">{erro}</Alert>}

      {!loading && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Tag</th>
                <th style={{ width: "160px", textAlign: "center" }}>Opções</th>
              </tr>
            </thead>
            <tbody>
              {currentTags.length > 0 ? (
                currentTags.map((tag) => (
                  <tr key={tag.id}>
                    <td>{tag.name}</td>
                    <td className="text-center">
                      <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditar(tag)}>
                        Editar
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleExcluir(tag)}>
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">Não há tags cadastradas</td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{tagAtual.id ? "Editar Tag" : "Nova Tag"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome da Tag</Form.Label>
              <Form.Control
                type="text"
                value={tagAtual.name}
                onChange={(e) => setTagAtual({ ...tagAtual, name: e.target.value })}
                placeholder="Digite o nome da tag"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleSalvar}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir a tag "{tagAtual.name}"?</Modal.Body>
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

export default ListagemTags;