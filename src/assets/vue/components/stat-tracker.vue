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
  <li class="item-content stat-tracker" :class="[statId]">
<!--     <div class="item-inner">
      <div class="item-title-row">
        <div class="item-title stat-title"><i :class="'btray-'+statInfo.id"></i></div>
      </div> -->
      <div class="item-subtitle">
        <div class="row no-gap">
          <div class="col-15 stat-title">
            <i :class="'btray-'+statInfo.id"></i>
          </div>
          <!-- <div class="col-15 stat-title">{{ statInfo.name }}</div> -->
          <div class="col-60 stat-swiper">
            <div class="swiper-container" >
              <div class="swiper-static-background"></div>
              <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(step, index) in charStat.steps" :class="[index == position ? 'stat-step-active' : '', index == 0 ? 'stat-step-dead' : '', index == charStat.start ? 'stat-step-start' : '']">
                  <template v-if="index == 0"><i class="btray-dead"></i></template>
                  <template v-else>{{ step }}</template>
                </div>
              </div>
            </div>
          </div>
          <div class="col-25 stat-buttons">
            <f7-segmented>
              <a href="#" class="button" @click="decreaseStat()"><i class="icon f7-icons">icon-delete</i></a>
              <a href="#" class="button" @click="increaseStat()"><i class="icon f7-icons">icon-add</i></a>
            </f7-segmented>
          </div>
        </div>
      </div>
    <!-- </div> -->
  </li>
</template>

<script>
  
  import { f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader, f7BlockContent, f7Button, f7Swiper, f7SwiperSlide, f7Segmented } from 'framework7-vue';
  import { mapGetters, mapActions  } from 'vuex'

  export default {
    name: 'stat-tracker',
    props: ["characterId", "statId"],
    data() {
      return {
        swiper: null
      }
    },
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
          this.$nextTick(function () {
            this.swiper.slideTo(this.position);
          });
          // console.log("reset:", newCount, oldCount, this.activeIndex, this.position);
        }
      } 
    },
    beforeDestroy() {
      const self = this;
      if (self.swiper && self.swiper.destroy) self.swiper.destroy();
    },
    updated() {
      const self = this;
      // console.log(self.swiper.animating);
      if (self.swiper && self.swiper.update && self.swiper.animating) self.swiper.update();
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
            rotate: 0,
            stretch: -10,
            depth: 200,
            modifier: 1,
            slideShadows: false
          },
          effect: "coverflow",
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
        this.$watch('swiper.activeIndex', function(newIndex, oldIndex) {
          console.log("AAAAA", this.position, newIndex);
          if (this.position != newIndex) {
            this.$store.dispatch('updateCharacterStat', {characterId: this.characterId, statId: this.statId, delta: newIndex - oldIndex });
          }
        });
      },
      increaseStat() {
        this.swiper.slideNext();
        console.log(this.characterId, this.statId, 1);
        this.$store.dispatch('increaseStat', {characterId: this.characterId, statId: this.statId});
      },
      decreaseStat() {
        this.swiper.slidePrev();
        console.log(this.characterId, this.statId, -1);
        this.$store.dispatch('decreaseStat', {characterId: this.characterId, statId: this.statId});
      }
      // ...mapActions(['increaseStat', 'decreaseStat'])
    },
    components: {
      f7List, f7ListItem, f7Navbar, f7Statusbar, f7Panel, f7Page, f7Block, f7BlockTitle, f7View, f7NavLeft, f7Link, f7NavTitle, f7Row, f7Col, f7Card, f7CardHeader, f7CardContent, f7CardFooter, f7BlockHeader, f7BlockContent, f7Button, f7Swiper, f7SwiperSlide, f7Segmented
    }
  }
</script>
