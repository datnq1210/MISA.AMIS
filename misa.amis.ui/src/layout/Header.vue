<template>
  <div class="header ms-flex">
    <div class="icon-apps ml-6 mr-4"></div>
    <div class="icon-timesheet mr-2"></div>
    <div class="mr-4">
      <span class="logo-text pl-1">Chấm công</span>
    </div>
    <div class="navbar ms-flex">
      <router-link to="/dashboard">
        <button
          class="nav-item"
          :class="{ isSelected: path.indexOf('dashboard') != -1 }"
        >
          <div class="px-4">Tổng quan</div>
        </button>
      </router-link>
      <ms-dropdown-menu
        :id="'timekeeping'"
        :dropdownItems="timekeeping"
        :isSelected="path.indexOf('timekeeping') != -1"
      >
        Chấm công
      </ms-dropdown-menu>
      <ms-dropdown-menu
        :id="'timeworking'"
        :dropdownItems="timeworking"
        :isSelected="path.indexOf('timeworking') != -1"
      >
        Ca làm việc
      </ms-dropdown-menu>
      <ms-dropdown-menu
        :id="'management-request'"
        :dropdownItems="managementRequests"
        :isSelected="path.indexOf('management-request') != -1"
      >
        Quản lý đơn
      </ms-dropdown-menu>
      <router-link to="/report">
        <button
          class="nav-item"
          :class="{ isSelected: path.indexOf('report') != -1 }"
        >
          <div class="px-4">Báo cáo</div>
        </button>
      </router-link>
      <router-link to="/setting">
        <button
          class="nav-item"
          :class="{ isSelected: path.indexOf('setting') != -1 }"
        >
          <div class="px-4">Thiết lập</div>
        </button>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <div class="version">Beta 2.35</div>
    <div class="icon-notification mx-4"></div>
    <div class="mr-2">
      <v-icon size="33">mdi-account-circle-outline</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  name: "ms-header",
  computed: {
    path() {
      return this.$route.path;
    },
  },
  data() {
    return {
      managementRequests: [
        {
          text: "Đơn xin nghỉ",
          link: "/management-request/attendance-watch",
        },
        {
          text: "Đề nghị cập nhật công",
          link: "/management-request/request-update-working",
        },
        {
          text: "Đề nghị công tác",
          link: "/management-request/mission-allowance",
        },
        {
          text: "Đơn làm thêm giờ",
          link: "/management-request/register-overtime",
        },
        {
          text: "Đơn đi muộn về sớm",
          link: "/management-request/late-in-early-out",
        },
        {
          text: "Bảng tổng hợp nghỉ phép",
          link: "/management-request/attendance-watch-summary",
        },
      ],
      timekeeping: [
        {
          text: "Bảng chấm công chi tiết",
          link: "/timekeeping/detail-timesheet",
        },
        {
          text: "Bảng chấm công tổng hợp",
          link: "/timekeeping/general-timesheet",
        },
        {
          text: "Dữ liệu máy chấm công",
          link: "/timekeeping/timekeepermarchine",
        },
      ],
      timeworking: [
        {
          text: "Bảng phân ca tổng hợp",
          link: "/timeworking/general-timeworking",
        },
        {
          text: "Danh sách ca",
          link: "/timeworking/working-shift",
        },
        {
          text: "Danh sách phân ca chi tiết",
          link: "/timeworking/shift-detail",
        },
      ],
    };
  },
};
</script>

<style scoped>
.isSelected {
  background: #ec5504;
  color: white;
}
</style>