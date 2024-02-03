import React, { useState, useEffect } from 'react';

const ContenedorBotones = () => {
  const [numerosGenerados, setNumerosGenerados] = useState(Array(5).fill(null));
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);
  const [numeroGenerado, setNumeroGenerado] = useState(null);
  const [botonesDeshabilitados, setBotonesDeshabilitados] = useState(Array(5).fill(false));

  useEffect(() => {
    // Este efecto se ejecuta cuando se genera un número aleatorio
    if (numeroGenerado !== null) {
      // Limpia la selección del botón después de 1 segundo
      const limpiarSeleccion = setTimeout(() => {
        setBotonSeleccionado(null);
      }, 1000);

      // Limpia el temporizador al desmontar el componente o al seleccionar otro botón
      return () => clearTimeout(limpiarSeleccion);
    }
  }, [numeroGenerado]);

  const generarNumeroAleatorio = () => {
    const nuevoNumeroGenerado = Math.floor(Math.random() * 100);
    setNumeroGenerado(nuevoNumeroGenerado);
  };

  const seleccionarBoton = (index) => {
    if (botonSeleccionado === null && !botonesDeshabilitados[index]) {
      setBotonSeleccionado(index);

      setNumerosGenerados((prevNumerosGenerados) => {
        const nuevosNumeros = [...prevNumerosGenerados];
        nuevosNumeros[index] = numeroGenerado;
        return nuevosNumeros;
      });

      setBotonesDeshabilitados((prevBotonesDeshabilitados) => {
        const nuevosBotonesDeshabilitados = [...prevBotonesDeshabilitados];
        nuevosBotonesDeshabilitados[index] = true;
        return nuevosBotonesDeshabilitados;
      });

      // Borra el número generado después de asignarlo a un botón
      setNumeroGenerado(null);
    }
  };

  const compararNumeros = () => {
    const numerosOrdenados = [...numerosGenerados].sort((a, b) => a - b);
    
    const numerosIguales = numerosOrdenados.every((num, index) => num === numerosGenerados[index]);

    if (numerosIguales) {
      alert('¡Has Ganado!');
    } else {
      alert('¡Has Perdido!');
    }
  };

  return (
    <div>
      <button onClick={generarNumeroAleatorio}>Generar Número Aleatorio</button>
      <button onClick={compararNumeros} disabled={numeroGenerado === null}>
        Comparar Números
      </button>
      {numeroGenerado !== null && (
        <p>Número Aleatorio Generado: {numeroGenerado}</p>
      )}
      <br />
      {numerosGenerados.map((numero, index) => (
        <button
          key={index}
          onClick={() => seleccionarBoton(index)}
          style={{
            background: botonSeleccionado === index ? 'yellow' : 'white',
            display: 'block',
          }}
          disabled={botonesDeshabilitados[index]}
        >
          {numero !== null ? `Seleccionar ${index + 1}: ${numero}` : `Seleccionar ${index + 1} :`}
        </button>
      ))}
    </div>
  );
};

export default ContenedorBotones;
