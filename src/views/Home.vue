<template>
<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
 
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://frais.auchan.fr/media/catalog/category/sho_banner_poissoinerie.jpg" class="d-block w-100" alt="...">

      <div class="carousel-caption d-none d-md-block">
        <h1 style="color: #1294b3">Bienvenue dans votre espace Poissonnerie</h1>
        <p style="color: #1294b3">Découvrez toute l'offre disponible dans votre magasin</p>
      </div>
    </div>
  </div>
    <div class="d-flex justify-content-between w-50 m-auto gap-5 mt-10 bg-white">
    <div class="card" style="width: 18rem;">
      <img src="https://frais.auchan.fr/media/catalog/category/fruits_de_mer.jpg" class="card-img-top" alt="Fruits de mer">
      <div class="card-body">
        <h5 class="card-title">Fruit De Mer</h5>
        <p>Découvrez une sélection fraîche de fruits de mer .</p>

        
      </div>
    </div>
    <div class="card" style="width: 18rem;">
      <div class="picture">
      <img src="https://frais.auchan.fr/media/catalog/category/245327_1.jpg" class="card-img-top" alt="Sushi">
    </div>
      <div class="card-body">
        <h5 class="card-title">Sushi</h5>
        <p>Savourez nos délicieux sushis, préparés avec des ingrédients frais et de qualité.</p>

    
      </div>
    </div>
    
    <div class="card" style="width: 18rem;">
      <img src="https://frais.auchan.fr/media/catalog/category/poisson.jpg" class="card-img-top" alt="Poisson">
      <div class="card-body">
        <h5 class="card-title">Poisson</h5>
        <p>Découvrez notre sélection de poissons frais, idéale pour préparer des plats sains et savoureux.</p>

      
      </div>
    </div>
  </div>
  </div>  
  


</template>

<script setup>
</script>

<style scoped>
header h1 {
  font-size: 1.5625em;
  font-style: italic;
  font-weight: 700;
}
.picture{
  
}
p {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: .9375em;
  font-weight: 600;
 
 }
@media (min-width: 1200px) {
  .h1, h1 {
    font-size: 2.5rem;
    font-style: italic;
    font-weight: 700;
  }
}
.content{
  height: 70%;
  width: 90%;
}
</style>