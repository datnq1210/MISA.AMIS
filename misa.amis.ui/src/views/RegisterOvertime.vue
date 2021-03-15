<template>
  <div class="register-overtime">
    <div v-if="!isCheckedRow" class="register-overtime-header">
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
      <button class="btn-add ms-flex mr-2 pl-3 pr-4" @click="addForm">
        <div class="icon-add mr-1 my-2 ml-2"></div>
        <div>Thêm</div>
      </button>
      <button class="btn-filter" @click="openFilterBox">
        <div class="icon-filter"></div>
      </button>
    </div>
    <div v-if="isCheckedRow" class="register-overtime-header">
      <span
        >Đã chọn <b>{{ rowCheckCount }}</b></span
      >
      <button class="btn-deselect ms-button ml-4" @click="deSelect">
        Bỏ chọn
      </button>
      <button
        class="btn-delete-mutilple ms-button ms-flex ml-4 pl-3 pr-4"
        @click="deleteCheckRows"
      >
        <div class="icon-delete mr-1"></div>
        <div>Xóa</div>
      </button>
    </div>

    <div class="register-overtime-content">
      <ms-grid
        :tableName="registerOvertime"
        :columns="columns"
        :adjustColumn="true"
        :minWidth="0"
        @updateHeader="updateHeader"
        @deleteOnClick="deleteForm"
        @editOnClick="getSelectedForm"
        @onCheckRow="onCheckRow"
        ref="GridTb"
      >
        <template v-slot:dateCreate="{ data }">
          {{ dateFormat(data.value) }}
        </template>

        <template v-slot:workTime="{ data }" >
          <div style="text-align: center;">
            {{ data.value }}
          </div>
        </template>
      </ms-grid>
      <ms-filter v-show="isShowFilterBox" @closeFilterBox="closeFilterBox" />
    </div>
    <transition name="fade" appear>
      <register-overtime-form
        v-if="isShowFormRegisterOvertime"
        :selectedForm="selectedForm"
        :isEditing="isEditing"
        :isAdding="isAdding"
        @loadData="loadData"
        :showPopup.sync="isShowFormRegisterOvertime"
      />
    </transition>
  </div>
</template>

<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import moment from "moment";
import axios from "axios";
import overtimeForm from "@/service/overtime.service.js";

export default {
  name: "register-overtime",
  components: {},
  data() {
    return {
      isShowFormRegisterOvertime: false,
      isShowFilterBox: false,
      isCheckedRow: false,
      rowCheckCount: 0,
      registerOvertime: null,
      selectedForm: {
        overtimeId: null,
        dateCreate: null,
        dateWorkStart: null,
        dateWorkEnd: null,
        workTime: null,
        reasonOvertime: null,
        note: null,
        state: null,
        applicantId: null,
        approverId: null,
      },
      isAdding: false,
      isEditing: false,
      columns: [
        {
          datafield: "applicantName",
          caption: "Người nộp đơn",
          visible: true,
        },
        {
          datafield: "approverName",
          caption: "Người duyệt",
          visible: true,
        },
        {
          datafield: "dateCreate",
          caption: "Ngày lập",
          visible: true,
        },
        {
          datafield: "workTime",
          caption: "Thời gian",
          visible: true,
        },
        { datafield: "state", caption: "Trạng thái", visible: true },
      ],
      states: [
        { value: "Tất cả" },
        { value: "Chờ duyệt" },
        { value: "Đã duyệt" },
        { value: "Từ chối" },
      ],
    };
  },
  methods: {
    deSelect() {
      this.$refs.GridTb.clearAll();
    },
    dateFormat(date) {
      return moment(date).format("DD-MM-YYYY");
    },
    updateHeader(val) {
      this.columns = JSON.parse(JSON.stringify(val));
    },
    openFormRegisterOvertime() {
      this.isShowFormRegisterOvertime = true;
    },
    closeFormRegisterOvertime() {
      this.isShowFormRegisterOvertime = false;
    },
    addForm() {
      this.isAdding = true;
      this.isEditing = false;
      this.isShowFormRegisterOvertime = true;
    },
    deleteForm(id) {
      overtimeForm.removeRegisterOvertime(id, this.loadData);
    },
    getSelectedForm(obj) {
      console.log("editing");
      this.isAdding = false;
      this.isEditing = true;
      this.selectedForm = obj;
      this.isShowFormRegisterOvertime = true;
    },
    onCheckRow(isCheck, count) {
      this.isCheckedRow = isCheck;
      this.rowCheckCount = count;
    },
    deleteCheckRows(rows) {
      for (var i = 0; i < rows.length; i++) {
        overtimeForm.removeRegisterOvertime(rows[i]);
      }
      this.loadData();
    },
    openFilterBox() {
      this.isShowFilterBox = !this.isShowFilterBox;
    },
    closeFilterBox() {
      this.isShowFilterBox = false;
    },
    async loadData() {
      console.log(
        axios
          .get("http://localhost:52698/api/v1/OvertimeForms")
          .then((res) => res.data)
      );
      let res = await axios.get("http://localhost:52698/api/v1/OvertimeForms");
      console.log(res.data);
      this.registerOvertime = res.data;
      this.closeFormRegisterOvertime();
    },
  },
  created() {
    this.loadData();
    console.log("registerOvertimeform", this.registerOvertime);
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
