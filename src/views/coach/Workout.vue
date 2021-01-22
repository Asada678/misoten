<template>
  <div class="workout">
    <div class="px-4 pt-6 pb-1 grid grid-cols-11 border-b-2">
      <p
        class="md:pr-2 col-span-11 md:col-span-7 flex items-end text-lg font-bold"
      >
        {{ workout.menuName }}
      </p>
      <p
        class="col-span-4 md:col-span-2 flex items-center justify-center text-xs"
      >
        {{ workout.weight }}kg x {{ workout.reps }}回
      </p>
      <p
        class="col-span-3 md:col-span-2 flex items-center justify-center text-xs"
      >
        {{ workout.sets }}セット
      </p>
    </div>

    <div class="workout-img px-4 pt-6 pb-4 relative z-10 flex justify-center">
      <img :src="`/img/workout/${workout.imgName}.jpg`" alt="" />
    </div>
    <div class="px-4 py-2">
      <details>
        <summary>
          <span class="font-bold text-sm">動作ポイント</span>
        </summary>
        <div
          v-for="(message, index) in workout.messages"
          :key="index"
          class="pt-3 pb-1 grid grid-cols-7 font-bold border-b"
        >
          <p class="col-span-1 text-center">{{ index + 1 }}</p>
          <p class="col-span-6 tracking-wider">
            {{ message }}
          </p>
        </div>
      </details>
    </div>
    <div class="workout-img pt-6 flex justify-center">
      <!-- <img src="/img/logo.png" alt="" /> -->
      <m-button
        class="w-100"
        icon="video"
        :disabled="!!localStream"
        :loading="!modelLoaded"
        @click="startVideo"
      >
        <span v-if="!finished"> スタート </span>
        <span v-else> 再開 </span>
      </m-button>
    </div>

    <div>
      <!-- <m-button class="w-100 blue">次のメニュー</m-button> -->
      <m-button
        v-if="finished"
        class="green w-100"
        icon="check"
        @click="completeMenu"
        >メニュー完了</m-button
      >
    </div>
    <!-- <div class="workout-img pt-6 flex justify-center">
      <img id="person" src="/img/person.jpg" alt="" />
    </div> -->
    <div class="video-container" :class="{ open, warning, nobody, success }">
      <!-- <div class="img-box">
        <img src="/img/workout.png" alt="workout" />
      </div> -->
      <div
        class="evaluation pt-6 absolute z-10 top-0 left-0 right-0 text-center"
      >
        <transition name="message" mode="out-in">
          <div v-if="warning" key="warning" class="warning">
            <i class="fas fa-exclamation-triangle text-5xl md:text-7xl"></i>
            <p class="py-2 font-bold text-xl md:text-2xl">
              {{ warningMessage }}
            </p>
          </div>
          <div v-else-if="nobody" key="nobody" class="nobody">
            <i class="fas fa-male text-5xl md:text-7xl"></i>
            <p class="py-2 font-bold text-xl md:text-2xl">
              画面内に入ってください。
            </p>
          </div>
          <div v-else key="success" class="success">
            <i class="fas fa-thumbs-up text-5xl md:text-7xl"></i>
            <p class="py-2 font-bold text-xl md:text-2xl">その調子！</p>
          </div>
        </transition>
        <!-- <div class="score">
          <div class="circle">
            {{ score }}
          </div>
        </div> -->
        <div id="console" class="-white font-bold"></div>
        <!-- <m-button class="w-100" @click="warning = !warning">check</m-button> -->
      </div>
      <div class="video-box">
        <video
          id="video"
          muted
          playsinline
          :width="videoWidth"
          :height="videoHeight"
        ></video>
      </div>
      <div class="sample-video-box">
        <!-- <canvas id="canvas"></canvas> -->
        <video
          id="sample-video"
          src="https://firebasestorage.googleapis.com/v0/b/misoten-dev.appspot.com/o/videos%2Fsample.mp4?alt=media&token=c9317c66-1f3b-406b-829d-3708edb64b82"
          muted
          autoplay
          playsinline
          loop
          :width="sampleVideoWidth"
          :height="sampleVideoWidth"
        ></video>
      </div>
      <div class="button-box">
        <m-button
          class="red w-75"
          icon="power-off"
          :disabled="!localStream"
          @click="finishVideo"
          >停止</m-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import * as tfjs from "@tensorflow/tfjs";
// import * as posenet from "@tensorflow-models/posenet";
import bf from "@/libs/bodyfixer";

const SHOULDER_CLASSES = {
  0: "nobody",
  1: "shoulder",
  2: "stand",
};
const ARM_CLASSES = {
  0: "arm",
  1: "nobody",
  2: "stand",
};

export default {
  components: {},
  props: {},
  data() {
    return {
      workout: {},
      model: null,
      modelLoaded: false,
      open: false,
      finished: false,
      warning: false,
      nobody: false,
      warningMessages: [],
      warningMessageIndex: 0,
      success: false,
      score: 0,
      localStream: null,
      localVideo: null,
      sampleVideo: null,
      canvas: null,
      videoWidth: null,
      videoHeight: null,
      sampleVideoWidth: null,
      predictTensorInterval: null,
      TARGET_CLASSES: {},
    };
  },
  computed: {
    warningMessage() {
      return this.warningMessages[this.warningMessageIndex];
    },
  },
  methods: {
    async openUserMedia() {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      this.localVideo.srcObject = this.localStream;
      this.localVideo.addEventListener("loadedmetadata", () => {
        this.localVideo.play();
      });
    },
    stopVideo() {
      this.localVideo.pause();
      this.localStream = null;
    },
    captureVideo() {
      // tfjs.tidy(() => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = this.localVideo.width;
      canvas.height = this.localVideo.height;
      context.drawImage(
        this.localVideo,
        0,
        0,
        this.localVideo.width,
        this.localVideo.height
      );

      const tensor = tfjs.browser
        .fromPixels(canvas, 3)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .reverse(-1);

      // console.log('tensor:', tensor);
      return tensor;
      // });
    },
    async predictTensor() {
      tfjs.engine().startScope();
      const img = this.captureVideo();
      // console.log("img:", img);
      const predictions = await this.model.predict(img).data();
      // console.log("predictions:", predictions);
      img.dispose();
      // console.log("tfjs.memory():", tfjs.memory());
      tfjs.engine().endScope();

      const result = Array.from(predictions)
        .map((p, i) => {
          return {
            probability: p,
            className: this.TARGET_CLASSES[i],
          };
        })
        .sort((a, b) => {
          return b.probability - a.probability;
        });

      // this.writeEvaluation(result);
      this.evaluateWorkout(result);
    },
    writeEvaluation(result) {
      document.getElementById("console").innerHTML = "";
      result.forEach(function (p) {
        document.getElementById("console").innerHTML += `<li>${
          p.className
        }: ${p.probability.toFixed(6)}</li>`;
      });
    },
    evaluateWorkout(result) {
      this.warning = false;
      this.nobody = false;
      this.success = false;
      switch (this.workout.imgName) {
        case "shoulder":
          this.evaluateShoulder(result);
          break;
        case "arm":
          this.evaluateArm(result);
          break;
      }
    },
    evaluateShoulder(result) {
      const first = result[0];
      const second = result[1];
      if (first.className === "shoulder") {
        if (first.probability > 0.5) {
          this.score = `${first.probability.toFixed(2) * 100}`;
          this.success = true;
        }
        return;
      }
      if (second.className === "shoulder") {
        if (second.probability > 0.4) {
          this.success = true;
          return;
        }
      }
      if (first.className === "nobody") {
        this.nobody = true;
        return;
      }
      this.warning = true;
    },
    evaluateArm(result) {
      const first = result[0];
      const second = result[1];
      if (first.className === "arm") {
        if (first.probability > 0.5) {
          this.score = `${first.probability.toFixed(2) * 100}`;
          this.success = true;
        }
        return;
      }
      if (second.className === "arm") {
        if (second.probability > 0.2) {
          this.success = true;
          return;
        }
      }
      if (first.className === "nobody") {
        this.nobody = true;
        return;
      }
      this.warning = true;
    },
    async setPredictTensorInterval() {
      this.predictTensorInterval = await setInterval(this.predictTensor, 300);
    },
    toggleVideoContainer() {
      // const videoContainer = this.$el.querySelector(".video-container");
      // videoContainer.classList.toggle("open");
      this.open = !this.open;
      bf(this.open);
    },
    async startVideo() {
      await this.openUserMedia();
      this.toggleVideoContainer();
      await this.setPredictTensorInterval();
    },
    finishVideo() {
      this.finished = true;
      this.stopVideo();
      this.toggleVideoContainer();
      clearInterval(this.predictTensorInterval);
    },
    completeMenu() {
      const params = {
        done: true,
        doneMenuName: this.workout.imgName,
      };
      console.log("params:", params);
      this.$router.push({ name: "MenuList", params });
    },
    setWorkout() {
      if (this.$route.params.workout) {
        this.workout = this.$route.params.workout;
      }
    },
    // async estimatePose() {
    //   console.log("posenet:", posenet);
    //   const imageScaleFactor = 0.5;
    //   const flipHorizontal = false;
    //   const outputStride = 16;

    //   const imageElement = this.$el.querySelector("#person");

    //   const net = await posenet.load();

    //   const pose = await net.estimateSinglePose(
    //     imageElement,
    //     imageScaleFactor,
    //     flipHorizontal,
    //     outputStride
    //   );
    //   console.log("pose:", pose);
    // },
    setVideoSize() {
      this.videoWidth = window.innerWidth;
      this.videoHeight = window.innerHeight;
    },
    setSampleVideoSize() {
      if (window.innerWidth < 768) {
        this.sampleVideoWidth = 170;
      } else {
        this.sampleVideoWidth = 250;
      }
    },
    setCanvas() {
      this.sampleVideo = this.$el.querySelector("#sample-video");
      this.canvas = this.$el.querySelector("#canvas");
      this.canvas.width = this.sampleVideoWidth;
      this.canvas.height = this.sampleVideoWidth;
      // console.log('this.sampleVideo:', this.sampleVideo);

      setInterval(() => {
        this.canvas
          .getContext("2d")
          .drawImage(
            this.sampleVideo,
            0,
            0,
            this.sampleVideoWidth,
            this.sampleVideoWidth
          );
      }, 1000 / 30);
    },
    async setModel() {
      // console.log("tfjs:", tfjs);
      this.model = await tfjs.loadGraphModel(
        `/model/${this.workout.imgName}/model.json`
      );
      // console.log("this.model:", this.model);
    },
    setClasses() {
      switch (this.workout.imgName) {
        case "shoulder":
          this.TARGET_CLASSES = SHOULDER_CLASSES;
          break;
        case "arm":
          this.TARGET_CLASSES = ARM_CLASSES;
          break;
      }
    },
    setWarningMessage() {
      this.warningMessages = this.workout.messages;
    },
    setWarningMessageIndex() {
      setInterval(() => {
        const length = this.warningMessages.length;
        this.warningMessageIndex++;
        if (this.warningMessageIndex === length) {
          this.warningMessageIndex = 0;
        }
        console.log("this.warningMessageIndex:", this.warningMessageIndex);
      }, 5000);
    },
  },
  created() {
    // console.log("tfjs:", tfjs);

    this.setWorkout();
    this.setClasses();
    this.setWarningMessage();
    this.setWarningMessageIndex();
  },
  async mounted() {
    this.localVideo = this.$el.querySelector("#video");
    // this.estimatePose();
    this.setVideoSize();
    this.setSampleVideoSize();
    await this.setModel();
    this.modelLoaded = true;
    // console.log("this.localVideo:", this.localVideo);
    // this.setCanvas();
  },
  destroyed() {
    clearInterval(this.predictTensorInterval);
  },
};
</script>

<style lang="scss" scoped>
.workout {
  .warning {
    color: #fdd835;
    i {
      color: #fdd835;
    }
  }
  .nobody {
    color: $grey;
    i {
      color: $grey;
    }
  }
  .success {
    color: $green;
    i {
      color: $green;
    }
  }
  .workout-img {
    img {
      width: 80%;
      max-height: 50vh;
      transform: translateZ(0);
      @extend .fit-img;
      filter: drop-shadow(0 0px 8px rgba($black, 0.25));
    }
  }
}

.video-container {
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  transform: scaleY(0);
  transform-origin: center;
  width: 100%;
  min-height: 100vh;
  background-color: rgba($black, 0.6);
  border: 4px solid;
  border-color: transparent;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;

  &.open {
    z-index: 2100;
    transform: none;
    opacity: 1;
    visibility: visible;
  }
  &.warning {
    border-color: #fdd835;
  }
  &.nobody {
    border-color: $grey;
  }
  &.success {
    border-color: $green;
  }

  .img-box {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    background-color: rgba($black, 0.9);
    img {
      @extend .fit-img;
    }
  }

  .evaluation {
    // color: $white;
    padding-left: 30%;
    font-size: 40px;
  }

  .sample-video-box {
    position: fixed;
    top: 0;
    // bottom: 30px;
    left: 0;
    // transform: translateY(-50%);
    // display: flex;
    // justify-content: center;
    // width: 100%;
    padding: 4px;

    video {
      // display: none;
      // opacity: 0;
      // visibility: hidden;
    }

    canvas {
      // max-height: calc(100vh - 8px);
      // width: 50%;
    }
  }
  .video-box {
    position: fixed;
    top: 50%;
    // bottom: 30px;
    left: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 4px;

    video {
      max-height: calc(100vh - 8px);
      transform: scaleX(-1);
    }
  }
  .button-box {
    position: fixed;
    bottom: 30px;
    left: 4px;
    right: 0;
    display: flex;
    justify-content: center;
    width: calc(100% - 8px);
    background-color: rgba($black, 0.6);
    // .inner {
    //   width: 100%;
    // }
  }
}
summary {
  padding: 4px 8px;
  border-radius: 4px;
  transition: .3s;
  cursor: pointer;
  &:hover {
    background-color: rgba($grey, 0.6);
  }
}
.message-enter-active,
.message-leave-active {
  transition: all 0.2s;
}
.message-enter,
.message-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
@media (min-width: 480px) {
}

@media (min-width: 600px) {
}

@media (min-width: 768px) {
  .video-container .evaluation {
    // color: $white;
    padding-left: 0;
  }
}

@media (min-width: 1200px) {
}
</style>