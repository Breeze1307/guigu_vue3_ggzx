<template>
  <div>
    <svg :class="svgClass">
      <use :xlink:href="iconName" :fill="color"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  iconClass: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: 'red',
  },
})
const iconName = computed(() => {
  return `#${props.name}`
})
const svgClass = computed(() => {
  if (props.iconClass) {
    return `svg-icon ${props.iconClass}`
  }
  return 'svg-icon'
})
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 2em;
  height: 2em;
}
</style>
