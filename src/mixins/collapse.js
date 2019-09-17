export default {
  data() {
    return {
      elHeight: 0
    }
  },
  methods: {
    beforeEnter(el) {
      this.elHeight = el.scrollHeight
    },
    enter(el) {
      const element = el
      element.style.height = `${this.elHeight}px`
    },
    beforeLeave(el) {
      const element = el
      element.style.height = 0
    }
  }
}
