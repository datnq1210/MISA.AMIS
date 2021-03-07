<template>
  <div class="ms-popup">
    <div class="ms-popup-bg"></div>
    <div class="popup-form employee-form">
      <div class="form-header ms-flex ms-spacer">
        <div class="heading-1">Đơn thêm nhân viên</div>
        <button class="btn-close-popup" @click="closeFormEmployee">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <div class="form-content">
        <div class="ms-flex mb-4">
          <ms-search-box style="width: 38%" class="mr-2" />
          <DxSelectBox
            style="width: 38%"
            placeholder="Chọn đơn vị"
            :noDataText="noDataMsg"
          />
        </div>
        <div class="employee-list">
          <ms-grid :data="[]" :columns="columns" :adjustColumn="false" :minWidth="300"/>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="form-bottom">
        <button class="ms-button ms-flex btn-add pa-4">Chọn</button>
        <button
          class="ms-button ms-flex btn-cancel pa-4 mr-2"
          @click="closeFormEmployee"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";

export default {
  name: "employee-form",
  data() {
    return {
      columns: [
        { datafield: "employeeCode", caption: "Mã nhân viên" },
        { datafield: "fullName", caption: "Tên nhân viên" },
        { datafield: "", caption: "Đơn vị công tác" },
        { datafield: "position", caption: "Vị trí công việc" },
        { datafield: "phoneNumber", caption: "ĐT Di động" },
        { datafield: "email", caption: "Email cơ quan" },
      ],
      employees: [],
    };
  },
  computed: {
    noDataMsg() {
      return "Không có dữ liệu!";
    },
  },
  components: {
    DxSelectBox,
  },
  methods: {
    closeFormEmployee() {
      this.$emit("closeFormEmployee");
    },
  },
};
</script>

<style>
</style>