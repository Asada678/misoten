<template>
  <div class="sign-up">
    <div class="sign-up-container">
      <header>ユーザー登録</header>
      <div class="progress-bar">
        <div class="step current">
          <p>Name</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>1</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Contact</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>2</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Date</p>
          <div class="bar"></div>
          <div class="bullet">
            <span>3</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
        <div class="step">
          <p>Details</p>
          <div class="bullet">
            <span>4</span>
          </div>
          <div class="check fas fa-check"></div>
        </div>
      </div>
      <div class="form-container">
        <form action="#">
          <div class="page slide-page">
            <div class="title">Basic Info:</div>
            <m-form label="name"></m-form>
            <m-form label="name"></m-form>
            <m-button class="step-button" data-target="1">next</m-button>
          </div>
          <div class="page">
            <div class="title">Contact Info:</div>
            <m-form label="email"></m-form>
            <m-form label="tel"></m-form>
            <m-button class="step-button" data-target="0">prev</m-button>
            <m-button class="step-button" data-target="2">next</m-button>
          </div>
          <div class="page">
            <div class="title">Date of Birth Info:</div>
            <m-form label="date"></m-form>
            <m-form label="gender"></m-form>
            <m-button class="step-button" data-target="1">prev</m-button>
            <m-button class="step-button" data-target="3">next</m-button>
          </div>
          <div class="page">
            <div class="title">User Details:</div>
            <m-form label="username"></m-form>
            <m-form label="password"></m-form>
            <m-button class="step-button" data-target="2">prev</m-button>
            <m-button class="">submit</m-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      currentPage: 0,
    };
  },
  computed: {
    // currentStep() {
    //   return
    // }
  },
  methods: {},
  mounted() {
    const slidePage = document.querySelector(".slide-page");
    const stepButtons = document.querySelectorAll(".step-button");
    const steps = document.querySelectorAll(".step");

    stepButtons.forEach((stepButton) => {
      stepButton.addEventListener("click", (event) => {
        event.preventDefault();
        const target = stepButton.dataset.target;
        slidePage.style.marginLeft = `-${target * 25}%`;

        if (target > this.currentPage) {
          steps[target - 1].classList.add("done");
        } else {
          steps[target].classList.remove("done");
        }
        const currentStep = document.querySelector(".step.current");
        currentStep.classList.remove("current");
        steps[target].classList.add("current");
        this.currentPage = target;
      });
    });
  },
};
</script>

<style lang="scss" scoped>
.sign-up {
  @extend .fixed-page;

  &-container {
    @extend .fixed-page-container;
  }

  .progress-bar {
    display: flex;
    text-align: left;

    .step {
      position: relative;
      text-align: center;
      width: 100%;

      // 入力が完了したステップ
      &.done {
        p {
        }
        .bar::after {
          background-color: red;
          // transform-origin: left;
          // animation: tonext 0.3s linear forwards;
          transform: scaleX(1);
          // transform: none;
          transition: transform 0.7s, transform-origin 0s;
        }
        .bullet {
          border-color: red;
          background-color: red;
          span {
            display: none;
            // color: white;
          }
        }
        .check {
          // display: block;
          opacity: 1;
          color: white;
          transform: translate(-50%, -50%);
          transition: transform 0.3s, opacity 0.5s;
        }
      }

      // 入力中のステップ
      &.current {
        p {
          font-weight: 700;
        }
        .bullet {
          border: 2px solid #000;
          color: #000;
        }
      }

      p {
        font-size: 18px;
        margin-bottom: 8px;
      }

      .bar {
        position: absolute;
        top: 14px;
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
          background-color: rgba(grey, 0.7);
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
        border: 2px solid grey;
        border-radius: 50%;
        background-color: white;
        color: grey;
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

@keyframes prev {
  100% {
    transform: scaleX(0);
  }
}
@keyframes tonext {
  100% {
    transform: scaleX(1);
  }
}

@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 767px) {
}

@media (min-width: 1200px) {
}
</style>