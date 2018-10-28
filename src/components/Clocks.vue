<template>
   <div>
      <div class="card" style="width: 18rem; margin-bottom: 2rem">
         <div class="card-body">
            <h5 class="card-title">
               <h1>{{ count1 }}</h1>
            </h5>
            <p class="card-text">
               <span v-if="timers.clock1.running">Running</span>
               <span v-else>Stopped</span>
            </p>
            <button type="button" class="btn btn-success" :disabled="timers.clock1.running" @click="timers.clock1.start">Start</button>
            <button type="button" class="btn btn-danger" :disabled="!timers.clock1.running" @click="timers.clock1.stop">Stop</button>
         </div>
      </div>

      <div class="card" style="width: 18rem; margin-bottom: 2rem">
         <div class="card-body">
            <h5 class="card-title">
               <h1>{{ count2 }}</h1>
            </h5>
            <p class="card-text">
               <span v-if="timers.clock2.running">Running</span>
               <span v-else>Stopped</span>
            </p>
            <button type="button" class="btn btn-success" :disabled="timers.clock2.running" @click="timers.clock2.start">Start</button>
            <button type="button" class="btn btn-danger" :disabled="!timers.clock2.running" @click="timers.clock2.stop">Stop</button>
         </div>
      </div>
      <hr>
      <p>
         <button type="button" style="margin-right: 2rem" class="btn btn-primary" @click="toggleInterval">Toggle interval</button>
         <strong>Interval 1:</strong> {{ interval1 }}
      </p>
   </div>
</template>

<script>
export default {
   data: () => {
      return {
         count1: 0,
         count2: 0,
         interval1: 1000,
      };
   },

   timers: {
      clock1: {
         interval: 'interval1',
         onTick() {
            ++this.count1;
         },
      },

      clock2: {
         interval: 250,
         onTick() {
            ++this.count2;
         },
      },
   },

   methods: {
      toggleInterval() {
         this.interval1 = this.interval1 === 1000 ? 100 : 1000;
      },
   },
};
</script>
