<template>
  <div>
    <div class="section-heading section-heading-with-button">
      <h3 class="h3">Мои магазины</h3>
      <div class="group-control-buttons">
        <img class="button-pic" src="../assets/img/settings.svg" alt="settings">
        <router-link to="/my_shop">
          <img class="button-pic" src="../assets/img/stack.svg" alt="calendar">
        </router-link>
      </div>
    </div>
    <CalendarSelector />
  </div>
</template>

<script>
import CalendarSelector from "../components/calendar/CalendarSelector";
export default {
  name: "Calendar",
  components: {CalendarSelector}
}
</script>

<style>

</style>