<template>
  <ms-popup v-if="isVisible">
    <div
      class="ms-dialog"
      :style="{ width: widthDialog, height: heightDialog }"
    >
      <div class="dialog-header">
        <div class="heading-1">
          {{ dialogHeader }}
        </div>
        <button class="btn-close-dialog" @click="close">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <div class="dialog-content pa-6">
        {{ dialogMsg }}
      </div>
      <div class="dialog-bottom  px-6 py-4">
        <slot></slot>
      </div>
    </div>
  </ms-popup>
</template>

<script>
export default {
  name: "ms-dialog",
  props: {
    dialogHeader: {
      type: String,
      default: null,
    },
    dialogMsg: {
      type: String,
      default: null,
    },
    widthDialog: {
      type: String,
      default: "415px",
    },
    heightDialog: {
      type: String,
      default: "auto",
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    open() {
      this.isVisible = true;
    },
    close() {
      this.isVisible = false;
    },
  },
};
</script>

<style>
.ms-dialog {
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  width: 100%;
  height: 53px;
}
.dialog-bottom {
  display: flex;
  flex-direction: row-reverse;
}

.btn-close-dialog {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  padding: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-close-dialog:hover {
  background: #eff1f6;
}
</style>
