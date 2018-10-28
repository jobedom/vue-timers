const DEFAULT_OPTIONS = {
   interval: 100,
   immediate: true,
   once: false,
   events: false,
   running: true,
};

export default {
   install(Vue, options = {}) {
      Vue.config.optionMergeStrategies.timers = Vue.config.optionMergeStrategies.computed;

      const showDebug = options.debug ? (...args) => console.info('[vue-timers]', ...args) : () => {};
      const defaultOptions = Object.assign({}, DEFAULT_OPTIONS, options);

      Vue.mixin({
         data() {
            return {
               timers: {},
            };
         },

         created() {
            const timers = this.$options.timers;
            for (const key in timers) {
               const timerDefinition = Object.assign({}, defaultOptions, timers[key]);

               const tickTimer = () => {
                  showDebug(`Timer '${timer.id}' tick`);
                  const methodName = `onTimer${key[0].toUpperCase() + key.substr(1)}`;
                  if (this[methodName]) this[methodName]();
                  if (timerDefinition.onTick) timerDefinition.onTick.apply(this);
                  if (timerDefinition.events) this.$emit(`timer-${key}`);
               };

               const timer = {
                  id: key,
                  definition: timerDefinition,
                  running: true,
                  stop() {
                     showDebug(`Timer '${timer.id}' stopped`);
                     if (timer._unwatchInterval) {
                        timer._unwatchInterval();
                        timer._unwatchInterval = null;
                     }
                     timer.running = false;
                     const clearFn = timerDefinition.once ? window.clearTimeout : window.clearInterval;
                     clearFn(timer.timerHandler);
                  },
                  start() {
                     showDebug(`Timer '${timer.id}' started`);
                     timer.running = true;
                     if (timerDefinition.immediate && !timerDefinition.once) tickTimer();
                     const setFn = timerDefinition.once ? window.setTimeout : window.setInterval;
                     const isReactiveInterval = typeof timerDefinition.interval === 'string';
                     if (isReactiveInterval) {
                        timer._unwatchInterval = this.$watch(timerDefinition.interval, (newValue, oldValue) => {
                           showDebug(`Timer '${timer.id}' interval changed from ${oldValue} to ${newValue}`);
                           if (timer.running) {
                              timer.stop();
                              timer.start();
                           }
                        });
                     }
                     const actualInterval = isReactiveInterval
                        ? this[timerDefinition.interval]
                        : timerDefinition.interval;
                     timer.timerHandler = setFn(tickTimer, actualInterval);
                  },
               };

               timer.start = timer.start.bind(this);

               if (timerDefinition.running) timer.start();
               Vue.set(this.timers, key, timer);
            }
         },

         destroyed() {
            Object.values(this.timers).forEach(timer => timer.stop());
         },
      });
   },
};
