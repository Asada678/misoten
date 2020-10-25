<template>
  <div class="sign-up">
    <div class="sign-up-container">
      <header>
        <transition name="fade">
          <i
            v-if="currentPage > 0"
            class="fas fa-chevron-left prev"
            @click="prev"
          ></i>
        </transition>
        <span class="current"> {{ Number(currentPage) + 1 }} / 4</span>
        <transition name="fade">
          <i
            v-if="currentPage < 3"
            class="fas fa-chevron-right next"
            @click="next"
          ></i>
        </transition>
      </header>
      <div class="progress-bar">
        <div class="step current">
          <p>ユーザ情報</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>1</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>体型</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>2</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>目標設定</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>3</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>確認</p>
          <div class="bullet">
            <span>4</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-container">
        <form action="#">
          <div class="page slide-page">
            <!-- <h2>Basic Info</h2> -->
            <m-form label="username"></m-form>
            <m-form label="email"></m-form>
            <m-form label="gender"></m-form>
            <m-form label="year" type="number"></m-form>
            <m-form label="month" type="number"></m-form>
            <m-form label="date" type="number"></m-form>
            <m-form label="email"></m-form>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus fugit, modi consequuntur quibusdam libero, reiciendis debitis necessitatibus repellat exercitationem totam suscipit ex eum nesciunt. Doloribus, nihil, voluptate expedita maiores fuga a quisquam facere eum voluptatum nemo quidem repellendus nam labore praesentium cum velit laboriosam voluptas dicta modi officia in consectetur. Molestias eius nobis similique doloremque esse quo sequi iure molestiae libero aspernatur quisquam explicabo iusto blanditiis iste officiis illum repellat, quasi doloribus! Alias vero enim atque doloremque et aut nemo delectus natus fugit! Iure velit ipsum blanditiis eum error, laudantium deserunt aut obcaecati quia praesentium! Tempora, itaque aliquam, numquam minima cupiditate repellendus eligendi perferendis unde quaerat officiis quidem ipsam non officia quam repudiandae beatae. Maiores repudiandae at, quo eum consectetur delectus, commodi quaerat nisi tempora vero harum quibusdam! Officiis fugit autem distinctio ullam reprehenderit optio sequi cumque modi aperiam voluptates tenetur harum a animi commodi aut magnam beatae corporis magni, perspiciatis ipsam quaerat in, ea at! Similique eveniet repellat vitae impedit, nostrum voluptas cupiditate blanditiis repellendus veritatis illo non dicta nulla vel tempore. Laudantium blanditiis, assumenda dolorum aliquam iusto optio eos qui voluptate possimus voluptates voluptas rem labore repellendus necessitatibus illo deserunt ducimus ipsa ipsam nostrum earum modi odio dolorem repudiandae. Adipisci consequuntur accusamus dignissimos vel sequi facere placeat alias debitis autem aspernatur modi inventore, magni vero praesentium nobis, sit, cumque animi repellat maxime quaerat! Enim sapiente totam eius earum beatae officiis minima. Voluptas provident recusandae consequuntur soluta iure dolorem aliquam suscipit ex, nihil consequatur quis molestias facere culpa fugiat reprehenderit consectetur omnis debitis labore ullam eum natus! Dolores quis amet provident ex debitis molestiae, voluptatem atque maiores rerum, voluptatum modi et illum sapiente consectetur nulla velit unde. Sapiente magni, libero impedit at distinctio aperiam voluptatibus voluptate illo, dolorem excepturi dolorum omnis esse molestiae est quisquam dignissimos obcaecati maxime! Consequuntur!</p>
          </div>
          <div class="page">
            <!-- <h2>Contact Info:</h2> -->
            <m-form label="height"></m-form>
            <m-form label="weight"></m-form>
            <m-form label="fat percentage"></m-form>
            <m-form label="muscle mass"></m-form>
          </div>
          <div class="page">
            <!-- <h2>Date of Birth Info</h2> -->
            <div class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">Slide 1</div>
                <div class="swiper-slide">Slide 2</div>
                <div class="swiper-slide">Slide 3</div>
              </div>
            </div>
            <p>詳細設定</p>
          </div>
          <div class="page">
            <!-- <h2>User Details</h2> -->
            <m-button class="w-100">submit</m-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';

export default {
  
  components: {
  },
  props: {},
  data() {
    return {
      currentPage: 0,
      slidePage: null,
      steps: null,
      swiper: null,
    };
  },
  computed: {
    // currentStep() {
    //   return
    // }
  },
  methods: {
    prev() {
      const target = this.currentPage - 1;
      this.steps[target].classList.remove("done");
      this.setCurrentPage(target);
    },
    next() {
      const target = this.currentPage + 1;
      this.steps[target - 1].classList.add("done");
      this.setCurrentPage(target);
    },
    setCurrentPage(target) {
      this.slidePage.style.marginLeft = `-${target * 25}%`;
      const currentStep = document.querySelector(".step.current");
      currentStep.classList.remove("current");
      this.steps[target].classList.add("current");
      this.currentPage = target;
    },
    onSwiper(swiper) {
      console.log('swiper:', swiper);
    },
    onSlideChange(swiper) {
      console.log('slide change:', swiper);
    }
  },
  mounted() {
    this.slidePage = document.querySelector(".slide-page");
    this.steps = document.querySelectorAll(".step");

    this.swiper = new Swiper('.swiper-container', {

    })
  },
};
</script>

<style lang="scss" scoped>
.sign-up {
  @extend .fixed-page;

  &-container {
    @extend .fixed-page-container;
  }

  header {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    // justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1050px;
    height: 60px;
    margin: 0 auto;
    padding: 0 10px;
    background-color: rgba($blue, 0.9);
    color: $white;

    i {
      position: absolute;
      font-size: 30px;

      &.prev {
        left: 10px;
      }
      &.next {
        right: 10px;
      }
    }

    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      font-size: 30px;
      font-weight: 700;
    }
  }

  .progress-bar {
    display: flex;
    margin-bottom: 10px;
    text-align: left;

    .step {
      position: relative;
      width: 100%;
      text-align: center;
      color: $grey;

      // 入力が完了したステップ
      &.done {
        color: $blue;
        .bar::after {
          background-color: $blue;
          // transform-origin: left;
          // animation: tonext 0.3s linear forwards;
          transform: scaleX(1);
          // transform: none;
          transition: transform 0.7s, transform-origin 0s;
        }
        .bullet {
          border-color: $blue;
          background-color: $blue;
          span {
            display: none;
            // color: white;
          }
        }
        .check {
          // display: block;
          opacity: 1;
          color: $white;
          transform: translate(-50%, -50%);
          transition: transform 0.3s, opacity 0.5s;
        }
      }

      // 入力中のステップ
      &.current {
        color: $black;
        p {
          font-weight: 700;
        }
        .bullet {
          border: 2px solid $black;
        }
      }

      p {
        margin-bottom: 8px;
      }

      .bar {
        position: absolute;
        top: 11px;
        left: 0;
        width: 100%;
        height: 100%;
        &::before,
        &::after {
          content: "";
          position: absolute;
          top: 50%;
          // bottom: 0;
          // right: 0;
          // right: -51px;
          height: 3px;
          width: 100%;
          background-color: rgba($grey, 0.7);
        }
        &::after {
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.7s, transform-origin 0s,
            background-color 0.7s 1s;
          transition: all 0.7s;
        }
      }

      .bullet {
        position: relative;
        display: inline-block;
        width: 25px;
        height: 25px;
        border: 2px solid $grey;
        border-radius: 50%;
        background-color: $white;
        transition: 0.3s;

        span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          // transform: translateY(-50%);
          font-size: 17px;
          font-weight: 700;
          line-height: 25px;
        }
      }

      .check {
        position: absolute;
        left: 50%;
        top: 70%;
        transform: translate(-50%, -50%) rotate(-90deg);
        font-size: 15px;
        opacity: 0;
        transition: transform 0.3s, opacity 0s;
      }
    }
  }

  .form-container {
    width: 100%;
    overflow: hidden;
    form {
      display: flex;
      width: 400%;

      .page {
        width: 25%;
        transition: margin-left 0.3s ease-in-out;
      }
    }
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
.sign-up {
  left: -#{$mainMenuWidth / 2};
}
}

@media (min-width: 1200px) {
}
</style>