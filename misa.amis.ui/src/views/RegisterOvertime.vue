<template>
  <div class="register-overtime">
    <div v-if="true" class="register-overtime-header">
      <span class="heading-2">Đơn làm thêm giờ</span>
      <div class="status ms-flex ml-13">
        <div style="color: grey; font-size: 14px" class="mr-2">Trạng thái:</div>
        <ms-select
          :id="'filterState'"
          :data="states"
          :width="'135'"
        ></ms-select>
      </div>
      <v-spacer></v-spacer>
      <ms-search-box :isIcon="true" style="width: 240px" class="mr-2" />
      <button
        class="btn-add ms-flex mr-2 pl-3 pr-4"
        @click="addForm"
      >
        <div class="icon-add mr-1 my-2 ml-2"></div>
        <div>Thêm</div>
      </button>
      <button class="btn-filter" @click="openFilterBox">
        <div class="icon-filter"></div>
      </button>
    </div>
    <div v-if="false" class="register-overtime-header">Đã chọn 1</div>
    <div class="register-overtime-content">
      <ms-grid
        :data="registerOvertime"
        :columns="columns"
        :adjustColumn="true"
        :minWidth="100"
        :deleteData="deleteForm"
        @updateHeader="updateHeader"
        @deleteOnClick="deleteForm"
        @editOnClick="getSelectedForm"
      />
      <ms-filter v-show="isShowFilterBox" @closeFilterBox="closeFilterBox" />
    </div>
    <transition name="fade" appear>
      <register-overtime-form
        v-if="isShowFormRegisterOvertime"
        :selectedForm="selectedForm"
        :isEditing="isEditing"
        :isAdding="isAdding"
        @editOnClick="editForm"
        @closeFormRegisterOvertime="closeFormRegisterOvertime"
      />
    </transition>
  </div>
</template>

<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import registerOvertime from "@/service/registerOvertime.service.js";

export default {
  name: "register-overtime",
  components: {},
  data() {
    return {
      isShowFormRegisterOvertime: false,
      isShowFilterBox: false,
      registerOvertime: [],
      selectedForm: {
        Id: "",
        applicant: "",
        dateCreate: "",
        dateWorkStart: "",
        dateWorkEnd: "",
        reasonOvertime: "",
        approvedBy: "",
        note: "",
        status: "",
      },
      isAdding: false,
      isEditing: false,
      columns: [
        {
          ID: "1",
          datafield: "applicant",
          caption: "Người nộp đơn",
          visible: true,
        },
        {
          ID: "2",
          datafield: "approvedBy",
          caption: "Người duyệt",
          visible: true,
        },
        {
          ID: "3",
          datafield: "dateCreate",
          caption: "Ngày lập",
          visible: true,
        },
        {
          ID: "4",
          datafield: "dateWorkEnd",
          caption: "Thời gian",
          visible: true,
        },
        { ID: "5", datafield: "status", caption: "Trạng thái", visible: true },
      ],
      states: [
        { text: "Tất cả" },
        { text: "Chờ duyệt" },
        { text: "Đã duyệt" },
        { text: "Từ chối" },
      ],
    };
  },
  methods: {
    updateHeader(val) {
      this.columns = { ...val };
    },
    openFormRegisterOvertime() {
      this.isShowFormRegisterOvertime = true;
    },
    addForm(){
      this.isAdding = true;
      this.isEditing = false;
      this.isShowFormRegisterOvertime = true;
    },
    deleteForm(id) {
      registerOvertime.removeRegisterOvertime(id);
      this.loadData();
    },
    getSelectedForm(obj) {
      console.log("editing");
      this.isAdding = false;
      this.isEditing = true;
      this.selectedForm = obj;
      this.isShowFormRegisterOvertime = true;
    },
    closeFormRegisterOvertime() {
      this.isShowFormRegisterOvertime = false;
    },
    openFilterBox() {
      this.isShowFilterBox = !this.isShowFilterBox;
    },
    closeFilterBox() {
      this.isShowFilterBox = false;
    },
    loadData() {
      this.registerOvertime = registerOvertime.getRegisterOvertime();
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
#filterState {
  background: none;
  border: none !important;
}

#filterState:hover {
  border: none !important;
}
</style>