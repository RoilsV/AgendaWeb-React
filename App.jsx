import React, { useEffect, useState } from 'react';
import './App.css';

const AGENDA_API_URL = 'http://www.raydelto.org/agenda.php';

function ContactList({ contactos }) {
  return (
    <div className="seccion-contactos">
      <h2>Contactos</h2>
      <table className="contactos-tabla">
        <thead>
          <tr>
            <th>#</th>
            <th><i className="fas fa-user icono-persona"></i>Nombre</th>
            <th>Apellido</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {contactos.map((c, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td><i className="fas fa-user icono-persona"></i>{c.nombre}</td>
              <td>{c.apellido}</td>
              <td>{c.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ContactForm({ onAdd }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevo = { nombre, apellido, telefono };
    await fetch(AGENDA_API_URL, {
      method: 'POST',
      body: JSON.stringify(nuevo)
    });
    setNombre('');
    setApellido('');
    setTelefono('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-contacto">
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <button type="submit">Guardar</button>
    </form>
  );
}

function App() {
  const [contactos, setContactos] = useState([]);

  const cargarContactos = () => {
    fetch(AGENDA_API_URL)
      .then(res => res.json())
      .then(data => setContactos(data));
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  return (
    <div className="agenda-wrapper">
      <h1>Agenda de Contactos</h1>
      <h2>Agregar Nuevo</h2>
      <ContactForm onAdd={cargarContactos} />
      <ContactList contactos={contactos} />
    </div>
  );
}

export default App;
