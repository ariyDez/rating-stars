<template>
  <div class="rating-wrapper">
    <label v-if="title">{{ title }}</label>
    <div class="stars">
      <font-awesome-icon
        v-for="(star, k) in ratingStars"
        :key="k"
        class="star o-20"
        :class="{'yellow-star': star.hover || star.selected, 'big': !readOnly }"
        :icon="['fas', 'star']"
        @mouseover="setHover(k)"
        @mouseleave="unsetHover(k)"
        @click="setRate(k)"
      />
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop } from "vue-property-decorator";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSpinner)

@Component({
  components: {
    FontAwesomeIcon,
  }
})
export default class RatingStars extends Vue {
  @Prop({ default: 5 }) starsNumber;
  @Prop({ default: "" }) title;
  @Prop({ default: false }) significant;
  @Prop({ default: false }) readOnly;
  @Prop({ default: 0 }) rating;

  starsOld = {
    0: {
      selected: false,
      hover: false
    },
    1: {
      selected: false,
      hover: false
    },
    2: {
      selected: false,
      hover: false
    },
    3: {
      selected: false,
      hover: false
    },
    4: {
      selected: false,
      hover: false
    }
  };

  stars = [
    {
      selected: false,
      hover: false
    },
    {
      selected: false,
      hover: false
    },
    {
      selected: false,
      hover: false
    },
    {
      selected: false,
      hover: false
    },
    {
      selected: false,
      hover: false
    }
  ];

  rates = {
    1: significant => (significant ? 1 : 0),
    2: significant => (significant ? 1 : 0),
    3: significant => (significant ? 1 : 0),
    4: significant => (significant ? 2 : 1),
    5: significant => (significant ? 2 : 1)
  };
  hoverIndex = 0;
  unHoverIndex = 0;

  get ratingStars() {
    for (let i = 0; i < this.starsNumber; i++) {
      if (i < this.rating) {
        this.stars[i].selected = true;
      } else {
        this.stars[i].selected = false;
      }
    }
    return this.stars;
  }

  initStars() {
    for (let i = 0; i < this.starsNumber; i++) {
      if (i !== 0 && i <= this.rating) {
        this.stars[i].selected = true;
      } else {
        this.stars[i].selected = false;
      }
    }
  }

  selected(index) {
    if (this.readOnly) return false;
    return this.stars[index].selected || this.stars[index].hover;
  }

  setHover(index) {
    if (this.readOnly) return false;
    Object.keys(this.stars).map(k => {
      if (k <= index) {
        this.stars[k].hover = true;
      }
    });
  }

  unsetHover(index) {
    if (this.readOnly) return false;
    Object.keys(this.stars).map(k => {
      if (k <= index) {
        this.stars[k].hover = false;
      }
    });
  }

  setRate(index) {
    if (this.readOnly) return false;
    console.log("index", index);
    console.log("starsNumber", this.starsNumber);
    for (let i = 0; i < this.starsNumber; i++) {
      if (i <= index) {
        this.stars[i].selected = true;
      } else {
        this.stars[i].selected = false;
      }
    }
    const rate = this.calculateRate(index + 1);
    this.$emit("setRate", { majorRating: rate, rating: index + 1 });
  }

  calculateRate(rate) {
    return this.rates[rate](this.significant);
  }

  mounted() {
    this.initStars();
    console.log({ title: this.title, rating: this.rating });
  }
}
</script>

<style scoped>
</style>