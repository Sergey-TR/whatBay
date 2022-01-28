<template>
  <div class="main-wrapper flex-center-column margin-top66">
    <img class="img-big" src="../assets/img/mainPage.svg" alt="">
    <p class="description">
      Составляй список покупок заранее на все случаи жизни для себя, для семьи или любых совместных активностей !
    </p>
    <router-link to="/login" class="home-btn">
      <button class="button btn-main">Давай начнем</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Home",
}
</script>

<style>
.flex-center-column {
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  flex-direction: column;
}
.margin-top66 {
  margin-top: 66px;
}
.img-big {
  margin-bottom: 60px;
}
.description {
  margin-bottom: 47px;
  text-align: center;
  color: #242E42;
  font-size: 15px;
}
.btn-main {
  width: 133px;
  height: 44px;
}
.home-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>