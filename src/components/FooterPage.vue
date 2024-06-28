<template>
    <footer class="footer">
      <img src="@/assets/imagenes/neblina-01.png" alt="neblina" class="neblina">
      <div class="text-center footer-text">
        <p>&copy;<strong>2024 TerrorFlix - Todos los derechos reservados</strong></p>
        <p><strong>Nombre y Apellido:</strong> María Milagros Ceballos</p>
        <p><strong>Materia:</strong> Aplicaciones para Dispositivos Móviles</p>
        <p><strong>Turno:</strong> Tarde</p>
        <p><strong>Comisión:</strong> DWT3A</p>
        <p><strong>Año:</strong> 2024</p>
      </div>
    </footer>
  </template>

<script>

export default {
  name: 'FooterPage',  
};
</script>


<style>


footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    color: #ff0000;
    position: relative;
    padding-top: 50px;
    margin-top: 80px;
  }
  
  footer img.neblina {
    position: absolute;
  }
  
  /* Responsive Image Styling */
  img.neblina {
    width: 70vw;
    opacity: 0.2;
    z-index: -1;
  }
  
  footer .text-center {
    text-align: center;
    font-size: 1rem;
  }
  
  #btnSubir {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    width: 80px;
    height: 100px;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    background: none;
    background-image: src="@/assets/imagenes/Fondo-3.png";
    background-size: cover;
    background-position: center;
    filter: drop-shadow(5px 5px 10px red);
  }
  
  #btnSubir span {
    visibility: hidden;
  }
  
  @media (min-width: 577px) and (max-width: 1000px){
    footer p{
  font-size: 1rem;
}
 }

  @media (max-width: 576px){
    footer p{
  font-size: 0.8rem;
}
img.neblina {
  width: 100%; 
  height: 100%;
  z-index: -1;
}

 }

</style>
