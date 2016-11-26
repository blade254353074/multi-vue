<script>
import './style.scss'

export default {
  name: 'UiButton',
  props: {
    type: String,
    size: String,
    disabled: Boolean,
    role: {
      type: String,
      default: 'button'
    }
  },
  computed: {
    classes () {
      const buttonType = ['primary', 'success', 'warning', 'danger']
      const buttonSize = ['small', 'block']
      const { type, size } = this

      return {
        'ui-button': true,
        [`ui-button-${type}`]: buttonType.indexOf(type) > -1,
        [`ui-button-${size}`]: buttonSize.indexOf(size) > -1
      }
    }
  }
}
</script>

<template>
  <button
    class="ui-button"
    :class="classes"
    :disabled="disabled"
    :role="role"
    :type="role"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
