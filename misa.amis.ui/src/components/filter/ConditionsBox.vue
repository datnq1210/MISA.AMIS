<template>
  <div
    class="codition-box pa-2 mb-2"
    :class="{ conditionSelected: checkboxValue }"
  >
    <div class="ms-flex">
      <DxCheckBox v-model="checkboxValue" :text="checkboxText" width="100%" />
      <div v-if="icon" class="icon-scale"></div>
    </div>
    <div class="mt-2" v-if="checkboxValue">
      <DxSelectBox :items="conditions" placeholder="Chọn điều kiện" />
      <div class="mt-2"></div>
      <DxSelectBox
        v-if="selectBox"
        :search-enabled="true"
        :noDataText="noDataMsg"
        placeholder=""
      />
      <date-picker
        v-if="datePicker"
        :lang="lang"
        placeholder="dd/MM/yyyy"
        class="ms-datepicker"
      ></date-picker>
    </div>
  </div>
</template>

<script>
import { DxCheckBox } from "devextreme-vue/check-box";
import DxSelectBox from "devextreme-vue/select-box";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import "vue2-datepicker/locale/vi";

export default {
  name: "ms-condition-box",
  components: {
    DxCheckBox,
    DxSelectBox,
    DatePicker,
  },
  props: {
    checkboxText: {
      type: String,
      require: true,
    },
    selectBox: {
      Boolean,
      default: false,
    },
    datePicker: {
      Boolean,
      default: false,
    },
    icon: {
      Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkboxValue: false,
      noDataMsg: "Không có dữ liệu!",
      conditions: ["Bằng", "Khác", "Trống", "Không trống"],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: true,
        language: "vi",
      },
    };
  },
};
</script>

<style>
.condition-box {
  width: 100%;
}
.conditionSelected {
  background-color: #ffede2;
  border-radius: 4px;
}
.ms-datepicker.mx-datepicker {
  width: 100% !important;
}
</style>