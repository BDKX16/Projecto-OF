import "./Modal.css";

const Modal = () => {
  return (
    <div className="overlay">
      <div className="modal-container">
        <div className="encabezado">
          <h3>Titulo</h3>
          <button>X</button>
        </div>
        <div>cuerpo</div>
      </div>
    </div>
  );
};

export default Modal;
