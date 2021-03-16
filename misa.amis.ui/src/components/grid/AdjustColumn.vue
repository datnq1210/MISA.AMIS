<template>
  <div class="adjust-column-box" id="adjust-column-box">
    <div class="adjust-cloumn-top px-4 pt-4">
      <div class="ms-flex ms-spacer mb-3">
        <div class="heading-2">Tùy chỉnh cột</div>
        <button class="btn-close-popup" @click="close">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <ms-search-box @changed="handleInput"></ms-search-box>
    </div>
    <div class="list-group pa-2">
      <draggable v-model="headersX">
        <div
          v-for="item in headersX"
          :key="item.ID"
          class="ms-flex pl-2"
          v-show="
            item.caption.toLowerCase().includes(searchValue.toLowerCase()) ||
              removeAccents(item.caption.toLowerCase()).includes(
                searchValue.toLowerCase()
              )
          "
        >
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
      <button
        class="ms-button ms-button-secondary px-3 mr-4"
        @click="resetDefault"
      >
        Mặc định
      </button>
      <button
        class="ms-button ms-button-primary px-7"
        v-bind:class="{ disableBtn: isDisable }"
        @click="handleSave"
      >
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
      searchValue: "",
    };
  },
  computed: {
    isDisable() {
      var count = 0;
      this.headersX.forEach((element) => {
        if (element.visible == true) count++;
      });
      if (count < 2) return true;
      return false;
    },
  },
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
      if (this.isDisable == true) return;
      this.$emit("onSaveFilter", this.headersX);
      this.$emit("closeAdjustColumn");
    },
    resetDefault() {
      this.headersX = JSON.parse(JSON.stringify(this.headers));
    },
    handleInput(val) {
      console.log("hi");
      this.searchValue = val;
    },
    removeAccents(str) {
      var AccentsMap = [
        "aàảãáạăằẳẵắặâầẩẫấậ",
        "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
        "dđ",
        "DĐ",
        "eèẻẽéẹêềểễếệ",
        "EÈẺẼÉẸÊỀỂỄẾỆ",
        "iìỉĩíị",
        "IÌỈĨÍỊ",
        "oòỏõóọôồổỗốộơờởỡớợ",
        "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
        "uùủũúụưừửữứự",
        "UÙỦŨÚỤƯỪỬỮỨỰ",
        "yỳỷỹýỵ",
        "YỲỶỸÝỴ",
      ];
      for (var i = 0; i < AccentsMap.length; i++) {
        var re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
        var char = AccentsMap[i][0];
        str = str.replace(re, char);
      }
      return str;
    },
  },
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

.dx-texteditor-input {
  color: #212121 !important;
}
.disableBtn {
  background: rgba(236, 85, 4, 0.56) !important;
}
</style>
