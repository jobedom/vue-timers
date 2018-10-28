<template>
   <div>
      <button type="button" class="btn btn-primary" @click="toggleClocks">Toggle clocks</button>
      <hr>
      <clocks v-if="clocksVisible"></clocks>
   </div>
</template>

<script>
import Clocks from '~/components/Clocks';

export default {
   components: { Clocks },

   data() {
      return {
         clocksVisible: true,
      };
   },

   methods: {
      toggleClocks() {
         this.clocksVisible = !this.clocksVisible;
      },
   },
};
</script>
