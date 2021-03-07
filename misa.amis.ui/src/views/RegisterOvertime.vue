<template>
  <div class="register-overtime">
    <div class="ms-flex mb-4">
      <span class="heading-2">Đơn làm thêm giờ</span>
      <div class="status ms-flex ml-13">
        <div style="color: grey; font-size: 14px" class="mr-2">Trạng thái:</div>
        <!-- <div class="subheader mr-2">Từ chối</div>
            <div class="mi-chevron-small"></div> -->
        <ms-select
          :id="'filterState'"
          :data="states"
          :width="'135'"
        ></ms-select>
      </div>
      <v-spacer></v-spacer>
      <ms-search-box :isIcon="true" style="width: 240px" class="mr-2" />
      <button class="btn-add ms-flex mr-2" @click="openFormRegisterOvertime">
        <div class="icon-add mr-1 my-2 ml-2"></div>
        <div>Thêm</div>
      </button>
      <button class="btn-filter" @click="openFilterBox">
        <div class="icon-filter"></div>
      </button>
    </div>
    <div class="register-overtime-content">
      <ms-grid
        :data="registerOvertime"
        :columns="columns"
        :adjustColumn="true"
        :minWidth="150"
      />
      <ms-filter v-show="isShowFilterBox" @closeFilterBox="closeFilterBox" />
    </div>
    <transition name="fade" appear>
      <register-overtime-form
        v-if="isShowFormRegisterOvertime"
        @closeFormRegisterOvertime="closeFormRegisterOvertime"
      />
    </transition>
  </div>
</template>

<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import registerOvertime from "@/service/registerOvertime.service.js"

export default {
  name: "register-overtime",
  components: {},
  data() {
    return {
      isShowFormRegisterOvertime: false,
      isShowFilterBox: false,
      registerOvertime: registerOvertime.getRegisterOvertime(),
      columns: [
        { datafield: "approvedBy", caption: "Người duyệt" },
        { datafield: "dateCreate", caption: "Ngày lập" },
        { datafield: "dateWorkEnd", caption: "Thời gian" },
        { datafield: "status", caption: "Trạng thái" },
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
    openFormRegisterOvertime() {
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