<template id="stat-tracker">
  <!-- <div class="row no-gap stat-tracker" :class="[statId]">
    <f7-col>{{ statInfo.short }}</f7-col>
    <div class="col stat-step" v-for="(step, index) in charStat.steps" :class="[index == position ? 'stat-step-active' : '', index == 0 ? 'stat-step-dead' : '']">
      <template v-if="index == 0">&#9760;</template>
      <template v-else>{{ step }}</template>
    </div>
    <div class="col stat-dec"><f7-button icon-f7="icon-delete" @click="decreaseStat({characterId, statId})"></f7-button></div>
    <div class="col stat-inc"><f7-button icon-f7="icon-add" @click="increaseStat({characterId, statId})"></f7-button></div>
  </div> -->
  <!-- <div class="swiper-container swiper-container-horizontal swiper-container-android" 
    data-slides-per-view='auto' 
    data-centered-slides='true' 
    data-space-between=30
  > -->
  <div class="stat-tracker row" :class="[statId]">
    <!-- <div class="col-15 stat-title">{{ statInfo.name }}</div> -->
    <div class="col-75 stat-swiper">
      <div class="swiper-container" >
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(step, index) in charStat.steps" :class="[index == position ? 'stat-step-active' : '', index == 0 ? 'stat-step-dead' : '']">
            <template v-if="index == 0">&#9760;</template>
            <template v-else>{{ step }}</template>
          </div>
        </div>
      </div>
    </div>
    <div class="col-25 stat-buttons">
      <f7-button icon-f7="icon-delete" @click="decreaseStat()"></f7-button>
      <f7-button icon-f7="icon-add" @click="increaseStat()"></f7-button>
    </div>
  </div>
</template>

<script>
  
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader, f7BlockContent, f7Button, f7Swiper, f7SwiperSlide } from 'framework7-vue';
  import { mapGetters, mapActions  } from 'vuex'

  export default {
    name: 'stat-tracker',
    props: ["characterId", "statId"],
    computed: {
      ...mapGetters(['characters', 'stats']),
      charStat: function() {
        return this.characters[this.characterId].stats[this.statId]
      },
      statInfo: function() {
        return this.stats[this.statId]
      },
      position: function() {
        return this.charStat.position
      },
      activeIndex: function() {
        return this.swiper.activeIndex
      },
      resetCount: function() {
        return this.characters[this.characterId].resets
      }
    },
    watch: {
      resetCount: function(newCount, oldCount) {
        if (this.activeIndex != this.position) {
          this.swiper.slideTo(this.position);
        }
      }
    },
    beforeDestroy() {
      const self = this;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    },
    updated() {
      const self = this;
      if (self.swiper && self.swiper.update) self.swiper.update();
    },
    methods: {
      onF7Ready(f7) {
        const self = this;
        const params = {
          slidesPerView: 'auto', 
          centeredSlides: true, 
          spaceBetween: 0, 
          initialSlide: this.charStat.position,
          grabCursor: true,
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true
          },
          on: {
            slideChange (event) {
              // self.charStat.position = this.activeIndex;
            }
          }
        };
        // if (self.navigation && !params.navigation.nextEl && !params.navigation.prevEl) {
        //   params.navigation.nextEl = '.swiper-button-next';
        //   params.navigation.prevEl = '.swiper-button-prev';
        // }
        self.swiper = f7.swiper.create(this.$el.querySelector('.swiper-container'), params);
      },
      increaseStat() {
        this.swiper.slideNext();
        this.$store.dispatch('increaseStat', {characterId: this.characterId, statId: this.statId});
      },
      decreaseStat() {
        this.swiper.slidePrev();
        this.$store.dispatch('decreaseStat', {characterId: this.characterId, statId: this.statId});
      }
      // ...mapActions(['increaseStat', 'decreaseStat'])
    },
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader, f7BlockContent, f7Button, f7Swiper, f7SwiperSlide
    }
  }
</script>
