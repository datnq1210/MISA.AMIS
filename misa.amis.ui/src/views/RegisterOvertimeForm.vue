<template>
  <div class="ms-popup">
    <div class="ms-popup-bg"></div>
    <div class="popup-form register-overtime-form">
      <div class="form-header ms-spacer">
        <div>
          <span class="heading-1">Thêm đơn</span>
          <span class="heading-4"> - Làm thêm giờ</span>
        </div>
        <button class="btn-close-popup" @click="closeFormRegisterOvertime">
          <div class="icon-close-popup"></div>
        </button>
      </div>
      <div class="form-content">
        <div class="ms-row-100">
          <div class="ms-col">
            <!-- Người nộp đơn -->
            <div class="ms-row">
              <label for="applicants"
                >Người nộp đơn <span class="label-require">*</span></label
              >
              <DxSelectBox
                :items="applicants"
                :search-enabled="true"
                placeholder=""
                v-model="newForm.applicants"
                :noDataText="noDataMsg"
                class="ms-combobox"
              />
            </div>

            <!-- Đơn vị công tác -->
            <div class="ms-row">
              <label>Đơn vị công tác</label>
              <div class="ms-combobox ms-flex ms-button-disable">
                <input
                  type="text"
                  id="applicants"
                  class="ms-input px-2"
                  disabled
                />
              </div>
            </div>

            <!-- Ngày nộp đơn -->
            <div class="ms-row">
              <label>Ngày nộp đơn <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                v-model="newForm.dateCreate"
                placeholder="Ngày nộp đơn"
                class="ms-datetime-picker"
                format="DD/MM/YYYY"
                value-type="YYYY-MM-DD"
              ></date-picker>
            </div>

            <!-- Làm thêm từ -->
            <div class="ms-row">
              <label>Làm thêm từ <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                v-model="newForm.dateWorkStart"
                value-type="date"
                type="datetime"
                placeholder="Làm thêm từ"
                format="YYYY-MM-DD HH:mm"
                :show-time-panel="showTimePanel"
                @close="handleOpenChange"
              >
                <template v-slot:footer>
                  <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
                    {{ showTimePanel ? "Chọn ngày" : "Chọn giờ" }}
                  </button>
                </template>
              </date-picker>
            </div>

            <!-- Làm thêm đến -->
            <div class="ms-row">
              <label>Làm thêm đến <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                value-type="date"
                placeholder="Làm thêm đến"
                format="YYYY-MM-DD HH:mm"
                v-model="newForm.dateWorkEnd"
                type="datetime"
                :show-time-panel="showTimePanel"
                @close="handleOpenChange"
              >
                <template v-slot:footer>
                  <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
                    {{ showTimePanel ? "Chọn ngày" : "Chọn giờ" }}
                  </button>
                </template>
              </date-picker>
            </div>
          </div>

          <div class="ms-col">
            <!-- Lý do làm thêm -->
            <div class="ms-row-88">
              <label>Lý do làm thêm <span class="label-require">*</span></label>
              <div
                div
                class="ms-text-arena ms-flex input-border-hover input-border-active input-border-active"
              >
                <textarea
                  maxlength="255"
                  v-model="newForm.reasonOvertime"
                ></textarea>
              </div>
            </div>

            <!-- Người duyệt -->
            <div class="ms-row">
              <label>Người duyệt <span class="label-require">*</span></label>
              <DxSelectBox
                :items="applicants"
                :search-enabled="true"
                placeholder=""
                class="ms-combobox"
                v-model="newForm.approvedBy"
                :noDataText="noDataMsg"
              />
            </div>

            <!-- Ghi chú -->
            <div class="ms-row-88">
              <label>Ghi chú</label>
              <div
                div
                class="ms-text-arena ms-flex input-border-hover input-border-active"
              >
                <textarea maxlength="255" v-model="newForm.note"></textarea>
              </div>
            </div>

            <!-- Trạng thái -->
            <div class="ms-row">
              <label>Trạng thái <span class="label-require">*</span></label>
              <DxSelectBox
                :items="states"
                :search-enabled="true"
                placeholder=""
                class="ms-combobox"
                v-model="newForm.status"
                :noDataText="noDataMsg"
              />
            </div>
          </div>
        </div>
        <div class="ms-row-100">
          <div class="heading-4">Danh sách nhân viên làm thêm</div>
        </div>
        <div class="ms-row-100 mt-2 ms-flex">
          <div>
            <i>Chưa có dữ liệu</i>
          </div>
          <button
            class="ms-button btn-add-employee ms-flex pl-3 pr-4"
            @click="openFormEmployee"
          >
            <div class="icon-add mr-1"></div>
            <div>Chọn</div>
          </button>
        </div>
      </div>
      <v-divider></v-divider>
      <div class="form-bottom">
        <button
          class="btn-save ms-button px-4 bg-hover-primary bg-active-primary"
          @click="saveOnClick"
        >
          Lưu
        </button>
        <button
          class="btn-cancel ms-button px-4 mr-2"
          @click="closeFormRegisterOvertime"
        >
          Hủy
        </button>
      </div>
    </div>
    <employee-form
      v-if="isShowFormEmployee"
      @closeFormEmployee="closeFormEmployee"
    ></employee-form>
  </div>
</template>

<script>
import DxSelectBox from "devextreme-vue/select-box";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi";
import "vue2-datepicker/index.css";

const applicants = ["Nguyễn Quốc Đạt", "Tạ Long Khánh", "Nguyễn Thành Long"];

export default {
  name: "register-overtime-form",
  computed: {
    noDataMsg() {
      return "Không có dữ liệu!";
    },
  },
  data() {
    return {
      applicants: applicants,
      newForm: {
        applicants: null,
        dateCreate: null,
        dateWorkStart: null,
        dateWorkEnd: null,
        reasonOvertime: null,
        approvedBy: null,
        note: null,
        status: null,
      },
      states: ["Chờ duyệt", "Đã duyệt", "Từ chối"],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: true,
        language: "vi",
      },
      isShowFormEmployee: false,
      showTimePanel: false,
    };
  },
  components: {
    DxSelectBox,
    DatePicker,
  },
  methods: {
    closeFormRegisterOvertime() {
      this.$emit("closeFormRegisterOvertime");
    },
    closeFormEmployee() {
      this.isShowFormEmployee = false;
    },
    openFormEmployee() {
      this.isShowFormEmployee = true;
    },
    saveOnClick() {
      console.log(this.newForm);
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },
    handleOpenChange() {
      this.showTimePanel = false;
    },
  },
};
</script>