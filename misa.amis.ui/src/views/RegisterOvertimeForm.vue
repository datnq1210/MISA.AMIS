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
                v-model="newForm.applicant"
                :noDataText="noDataMsg"
                class="ms-combobox"
              >
                <DxValidator>
                  <DxRequiredRule message="Address is required" />
                </DxValidator>
              </DxSelectBox>
            </div>

            <!-- Đơn vị công tác -->
            <div class="ms-row">
              <label>Đơn vị công tác</label>
              <div class="ms-combobox ms-flex ms-button-disable">
                <input type="text" class="ms-input px-2" disabled />
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
                value-type="DD/MM/YYYY HH::mm"
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
                value-type="DD/MM/YYYY HH::mm"
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
                :items="approvedBy"
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
            :use-submit-behavior="true"
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
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/locale/vi";
import "vue2-datepicker/index.css";

import registerOvertime from "@/service/registerOvertime.service.js";
import employService from "@/service/employs.service.js";
import employeeService from "@/service/employees.service.js";

var employs = employService.getEmploy();
var employees = employeeService.getEmployees();

export default {
  name: "register-overtime-form",
  components: {
    DxSelectBox,
    DatePicker,
    DxValidator,
    DxRequiredRule,
  },
  computed: {
    noDataMsg() {
      return "Không có dữ liệu!";
    },
    approvedBy() {
      return employs.map(function (employs) {
        return employs.name;
      });
    },
    applicants() {
      return employees.map(function (employees) {
        return employees.name;
      });
    },
  },
  data() {
    return {
      newForm: {
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
  props: {
    selectedForm: {
      type: Object,
      default: () => ({
        Id: null,
        applicant: null,
        dateCreate: null,
        dateWorkStart: null,
        dateWorkEnd: null,
        reasonOvertime: null,
        approvedBy: null,
        note: null,
        status: null,
      }),
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
    isAdding: {
      type: Boolean,
      default: false,
    },
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
      if (this.isAdding) {
        registerOvertime.addRegisterOvertime(this.newForm);
        this.$emit("closeFormRegisterOvertime");
        return;
      } else if (this.isEditing) {
        registerOvertime.updateRegisterOvertime(this.newForm);
        this.$emit("closeFormRegisterOvertime");
        return;
      }
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },
    handleOpenChange() {
      this.showTimePanel = false;
    }
  },
  created(){
    if(this.isEditing){
        this.newForm = this.selectedForm;
    }
  }
};
</script>