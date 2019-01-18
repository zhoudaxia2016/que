import Que from './que.js'

let que = new Que({
  data: {
    math: 20,
    english: 30,
    chinese: 25
  },
  methods: {
    getTotal () {
      return this.math + this.english + this.chinese
    }
  }
})

que.bind(function () {
  $('.math').text(this.math)
})
que.bind(function () {
  $('.english').text(this.english)
})
que.bind(function () {
  $('.chinese').text(this.chinese)
})
que.bind(function () {
  console.log(this)
  $('.total').text(this.getTotal())
})

window.que = que
