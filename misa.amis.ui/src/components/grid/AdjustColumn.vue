<template>
  <div class="adjust-column-box" id="adjust-column-box">
    <div class="adjust-cloumn-top px-4 pt-4">
      <div class="ms-flex ms-spacer mb-3">
        <div class="heading-2">Tùy chỉnh cột</div>
        <button class="btn-close-popup" @click="close">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <ms-search-box></ms-search-box>
    </div>
    <div class="list-group pa-2">
      <draggable v-model="headersX">
        <div v-for="item in headersX" :key="item.ID" class="ms-flex pl-2">
          <DxCheckBox
            width="100%"
            :text="item.caption"
            v-model="item.visible"
          />
          <div class="icon-scale"></div>
        </div>
      </draggable>
    </div>
    <div class="adjust-column-bottom py-3">
      <button class="ms-button ms-button-secondary px-3 mr-4">Mặc định</button>
      <button class="ms-button ms-button-primary px-7" @click="handleSave">
        Lưu
      </button>
    </div>
  </div>
</template>

<script>
import { DxCheckBox } from "devextreme-vue/check-box";
import draggable from "vuedraggable";

export default {
  components: {
    DxCheckBox,
    draggable,
  },
  data() {
    return {
      headersX: JSON.parse(JSON.stringify(this.headers)),
    };
  },
  computed: {},
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    close() {
      this.$emit("closeAdjustColumn");
    },
    handleSave() {
      this.$emit("onSaveFilter", this.headersX);
      this.$emit("closeAdjustColumn");
    },
    handleCheck(){
      this.headersX = JSON.parse(JSON.stringify(this.headers));
    }
  }
};
</script>

<style>
.adjust-column-box {
  width: 260px;
  height: 470px;
  position: absolute;
  top: 58px;
  left: -14px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
}

.adjust-column-box::before {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: -10px;
  background: #fff;
  left: 34px;
  transform: rotate(-135deg);
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.adjust-column-box .adjust-cloumn-top {
  width: 100%;
  height: 100px !important;
}

.adjust-column-box .list-group {
  width: 100%;
  height: calc(100% - 160px);
}

.adjust-column-box .adjust-column-bottom {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #e0e0e0;
}

.dx-texteditor-input{
  color: #212121 !important;
}
</style>