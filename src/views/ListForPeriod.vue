<template>
  <div>
    <div class="shop-heading period-heading">
      <div class="shop-back d_flex">
        <router-link to="/my_shop">
          <img src="../assets/img/arrowLeft.svg" />
        </router-link>
        <h5 class="h5_period">период</h5>
      </div>
    </div>
    <PeriodSelect />
  </div>
</template>

<script>
import PeriodSelect from "../components/calendar/period/PeriodSelect";

export default {
  name: "ListForPeriod",

  components: {
    PeriodSelect,
  },
};
</script>

<style>
.period-heading {
  border-bottom: 1px solid dimgrey;
}
.d_flex {
  display: flex;
}
.h5_period {
  margin-left: 16px;
  color: dimgrey;
}
</style>