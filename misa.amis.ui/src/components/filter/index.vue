<template>
  <div class="filter">
    <div class="filter-header">
      <div class="ms-flex ms-spacer mb-3">
        <div class="heading-2">Bộ lọc</div>
        <button class="btn-close-popup" @click="close">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <ms-search-box :isIcon="true" @changed="handleInput" />
    </div>
    <div class="filter-condition-box px-2 mt-2">
      <ConditionsBox
        v-for="(item, index) in headers"
        :key="index"
        :checkboxText="item.name"
        :selectBox="item.typeOfString"
        :datePicker="item.typeOfDate"
        v-show="item.name.toLowerCase().includes(searchValue.toLowerCase())"
      />
    </div>
    <div class="filter-bottom ms-flex">
      <button class="btn-cancel ms-button ms-button-secondary bg-hover-secondary bg-active-secondary mr-2" @click="close">Bỏ lọc</button>
      <button class="btn-apply ms-button ms-button-primary bg-hover-primary bg-active-primary">Áp dụng</button>
    </div>
  </div>
</template>

<script>
import ConditionsBox from "./ConditionsBox";

export default {
  name: "ms-filter",
  components: { ConditionsBox },
  data() {
    return {
      isHide: false,
      checkboxValue: false,
      headers: [
        { name: "Người nộp đơn", typeOfDate: false, typeOfString: true },
        { name: "Người duyệt", typeOfDate: false, typeOfString: true },
        { name: "Ngày lập", typeOfDate: true, typeOfString: false },
        { name: "Từ ngày", typeOfDate: true,typeOfString: false },
        { name: "Đến ngày", typeOfDate: true, typeOfString: false },
        { name: "Trạng thái", typeOfDate: false, typeOfString: true }
      ],
      searchValue: ""
    };
  },
  methods: {
    close() {
      this.$emit("closeFilterBox");
    },
    handleInput(val) {
      this.searchValue = val;
    }
  },
};
</script>

<style>
.filter {
  width: 240px;
  min-width: 240px;
  background-color: #fff;
  margin-left: 16px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  position: relative;
}

.filter .filter-header {
  padding: 14px 16px 0 16px;
  max-height: calc(100% - 151px);
  overflow: auto;
}

.filter .filter-condition-box {
  width: 100%;
  max-height: calc(100% - 151.6px);
  background-color: #fff;
  overflow: auto;
}

.filter .filter-bottom {
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  background-color: #fff;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.filter .filter-bottom .btn-cancel{
  width: 100px;
}
.filter .filter-bottom .btn-apply{
  width: 100px;
  background-color: #ec5504;
  color: #fff;
  font-weight: 500;
  font-size: 14px;
}
.dx-checkbox-icon {
  width: 16px !important;
  height: 16px !important;
  border-radius: 4px !important;
  border: 2px solid #666 !important;
}

.dx-checkbox-checked .dx-checkbox-icon {
  font: 10px/16px DXIcons !important;
  text-align: center;
  width: 16px !important;
  height: 16px !important;
  border-radius: 4px !important;
}
.dx-checkbox-text {
  font-family: "Roboto" !important;
}

.dx-empty-message {
  color: #ec5504 !important;
}

.dx-checkbox.dx-state-hover,
.dx-checkbox.dx-state-focused,
.dx-checkbox.dx-state-active {
  border: none !important;
}
</style>