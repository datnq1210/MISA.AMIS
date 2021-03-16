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
                ref="autoFocus"
                class="ms-combobox"
                placeholder=""
                :data-source="applicants"
                :value="applicants[0].applicantId"
                display-expr="applicantName"
                value-expr="applicantId"
                :search-enabled="true"
                v-model="newForm.applicantId"
                :noDataText="noDataMsg"
                :class="{ notValid: !applicantsCheck.valid }"
                :onValueChanged="
                  () => (applicantsCheck.valid = newForm.applicantId)
                "
              >
              </DxSelectBox>
              <ms-tooltip
                v-if="!applicantsCheck.valid"
                :errMsg="applicantsCheck.errMsg"
              ></ms-tooltip>
            </div>

            <!-- Đơn vị công tác -->
            <div class="ms-row">
              <label>Đơn vị công tác</label>
              <div class="ms-combobox ms-flex ms-button-disable">
                <input
                  type="text"
                  class="ms-input px-2"
                  disabled
                  value="Hà nội"
                />
              </div>
            </div>

            <!-- Ngày nộp đơn -->
            <div class="ms-row">
              <label>Ngày nộp đơn <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                v-model="newForm.dateCreate"
                placeholder="DD/MM/YYYY"
                class="ms-datetime-picker"
                format="DD/MM/YYYY"
                value-type="YYYY-MM-DD"
                :class="{ notValidDate: !dateCreateCheck.valid }"
                @change="
                  () => {
                    if (!newForm.dateCreate) dateCreateCheck.valid = false;
                    if (newForm.dateCreate) dateCreateCheck.valid = true;
                  }
                "
              ></date-picker>
              <ms-tooltip
                v-if="!dateCreateCheck.valid"
                :errMsg="dateCreateCheck.errMsg"
                class="mr-2"
              ></ms-tooltip>
            </div>

            <!-- Làm thêm từ -->
            <div class="ms-row">
              <label>Làm thêm từ <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                v-model="newForm.dateWorkStart"
                type="datetime"
                format="DD/MM/YYYY HH:mm"
                value-type="YYYY-MM-DDTHH:mm:ss"
                placeholder="DD/MM/YYYY HH:mm"
                :show-time-panel="showTimePanel"
                @close="handleOpenChange"
                @change="checkDateWorkStart"
                :class="{ notValidDate: !dateWorkStartCheck.valid }"
              >
                <template v-slot:footer>
                  <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
                    {{ showTimePanel ? "Chọn ngày" : "Chọn giờ" }}
                  </button>
                </template>
              </date-picker>
              <ms-tooltip
                v-if="!dateWorkStartCheck.valid"
                :errMsg="dateWorkStartCheck.errMsg"
                class="mr-2"
              ></ms-tooltip>
            </div>

            <!-- Làm thêm đến -->
            <div class="ms-row">
              <label>Làm thêm đến <span class="label-require">*</span></label>
              <date-picker
                :lang="lang"
                placeholder="DD/MM/YYYY HH:mm"
                value-type="YYYY-MM-DDTHH:mm:ss"
                v-model="newForm.dateWorkEnd"
                type="datetime"
                format="DD/MM/YYYY HH:mm"
                :show-time-panel="showTimePanel"
                @close="handleOpenChange"
                @change="checkDateWorkEnd"
                :class="{ notValidDate: !dateWorkEndCheck.valid }"
              >
                <template v-slot:footer>
                  <button class="mx-btn mx-btn-text" @click="toggleTimePanel">
                    {{ showTimePanel ? "Chọn ngày" : "Chọn giờ" }}
                  </button>
                </template>
              </date-picker>
              <ms-tooltip
                v-if="!dateWorkEndCheck.valid"
                :errMsg="dateWorkEndCheck.errMsg"
                class="mr-2"
              ></ms-tooltip>
            </div>
          </div>

          <div class="ms-col">
            <!-- Lý do làm thêm -->
            <div class="ms-row-88">
              <label>Lý do làm thêm <span class="label-require">*</span></label>
              <div
                class="ms-text-arena ms-flex input-border-hover input-border-active input-border-active"
                :class="{ notValid: !reasonOvertimeCheck.valid }"
              >
                <textarea
                  maxlength="255"
                  v-model="newForm.reasonOvertime"
                  @keyup="
                    () => (reasonOvertimeCheck.valid = newForm.reasonOvertime)
                  "
                ></textarea>
              </div>
              <ms-tooltip
                v-if="!reasonOvertimeCheck.valid"
                :errMsg="reasonOvertimeCheck.errMsg"
                class="mt-6 mr-n6"
              ></ms-tooltip>
            </div>

            <!-- Người duyệt -->
            <div class="ms-row">
              <label>Người duyệt <span class="label-require">*</span></label>
              <DxSelectBox
                :data-source="approvers"
                :value="approvers[0].approverId"
                display-expr="approverName"
                value-expr="approverId"
                :search-enabled="true"
                placeholder=""
                class="ms-combobox"
                v-model="newForm.approverId"
                :noDataText="noDataMsg"
                :class="{ notValid: !approvedByCheck.valid }"
                :onValueChanged="
                  () => (approvedByCheck.valid = newForm.approverId)
                "
              />
              <ms-tooltip
                v-if="!approvedByCheck.valid"
                :errMsg="approvedByCheck.errMsg"
              ></ms-tooltip>
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
                class="ms-combobox"
                :placeholder="null"
                :noDataText="noDataMsg"
                :items="states"
                v-model="newForm.state"
                :class="{ notValid: !statusCheck.valid }"
                :onValueChanged="() => (statusCheck.valid = newForm.state)"
              />
              <ms-tooltip
                v-if="!statusCheck.valid"
                :errMsg="statusCheck.errMsg"
              ></ms-tooltip>
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
      <ms-dialog
        ref="msDialog"
        :dialogHeader="'Thông báo'"
        :dialogMsg="'Thông tin đã được thay đổi. Bạn có muốn lưu lại không?'"
      >
        <button
          class="px-7  ms-button ms-button-primary bg-active-primary bg-hover-primary"
          @click="
            () => {
              this.saveOnClick();
              this.$refs.msDialog.close();
            }
          "
        >
          Lưu
        </button>
        <button
          class="px-5 mr-2 ms-button ms-button-secondary bg-active-secondary bg-hover-secondary"
          @click="
            () => {
              this.$refs.msDialog.close();
              this.$emit('update:showPopup', false);
            }
          "
        >
          Không lưu
        </button>
        <button
          class="px-7 mr-2 ms-button ms-button-secondary bg-active-secondary bg-hover-secondary"
          @click="
            () => {
              this.$refs.msDialog.close();
            }
          "
        >
          Hủy
        </button>
      </ms-dialog>
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
import moment from "moment";
import "vue2-datepicker/locale/vi";
import "vue2-datepicker/index.css";
import registerOvertime from "@/service/overtime.service.js";
import approverService from "@/service/approver.service.js";
import applicantService from "@/service/applicant.service.js";

export default {
  name: "register-overtime-form",
  components: {
    DxSelectBox,
    DatePicker,
  },
  computed: {
    noDataMsg() {
      return "Không có dữ liệu!";
    },
    approvers() {
      return approverService.getApprover();
    },
    applicants() {
      return applicantService.getApplicant();
    },
    isChangeValue() {
      return JSON.stringify(this.newFormCache) != JSON.stringify(this.newForm);
    },
  },
  data() {
    return {
      newForm: {
        dateCreate: moment(Date.now()).format("YYYY-MM-DD"),
        dateWorkStart: null,
        dateWorkEnd: null,
        reasonOvertime: null,
        note: null,
        state: null,
        applicantId: null,
        approverId: null,
      },
      newFormCache: { ...this.newForm },
      applicantsCheck: {
        valid: true,
        errMsg: "Người nộp đơn không được để trống.",
      },
      dateCreateCheck: {
        valid: true,
        errMsg: "Ngày nộp đơn không được để trống.",
      },
      dateWorkStartCheck: {
        valid: true,
        errMsg: "Làm thêm từ không được để trống.",
      },
      dateWorkEndCheck: {
        valid: true,
        errMsg: "Làm thêm đến không được để trống.",
      },
      approvedByCheck: {
        valid: true,
        errMsg: "Người duyệt không được để trống.",
      },
      reasonOvertimeCheck: {
        valid: true,
        errMsg: "Lý do làm thêm không được trống",
      },
      statusCheck: {
        valid: true,
        errMsg: "Trạng thái không được để trống",
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
        overtimeId: null,
        dateCreate: null,
        dateWorkStart: null,
        dateWorkEnd: null,
        reasonOvertime: null,
        note: null,
        state: null,
        applicantId: null,
        approverId: null,
      }),
    },
    page: {
      type: Object,
      default: null,
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
    /**
     * Hàm đóng form đăng kí làm thêm giờ.
     * CreatedBy: NQDAT
     */
    closeFormRegisterOvertime() {
      if (this.isChangeValue) {
        this.$refs.msDialog.open();
        return;
      } else {
        this.$emit("update:showPopup", false);
      }
    },
    /**
     * Hàm đóng form thêm nhân viên.
     * CreatedBy: NQDAT
     */
    closeFormEmployee() {
      this.isShowFormEmployee = false;
    },
    /**
     * Hàm mở form thêm nhân viên.
     * CreatedBy: NQDAT
     */
    openFormEmployee() {
      this.isShowFormEmployee = true;
    },
    /**
     * Hàm nạp lại dữ liệu sau khi thêm mới.
     * CreatedBy: NQDAT
     */
    loadDataForm() {
      this.$emit("loadData");
    },
    /**
     * Hàm lưu dữ liệu khi nhấp chuột vào nút [Lưu]
     * CreatedBy: NQDAT
     */
    saveOnClick() {
      this.checkValidate();
      if (this.checkValidate()) {
        if (this.isAdding) {
          registerOvertime.addRegisterOvertime(this.newForm, this.loadDataForm);
          return;
        } else if (this.isEditing) {
          registerOvertime.updateRegisterOvertime(
            this.newForm,
            this.loadDataForm
          );
          return;
        }
      }
    },
    toggleTimePanel() {
      this.showTimePanel = !this.showTimePanel;
    },
    handleOpenChange() {
      this.showTimePanel = false;
    },
    /**
     * Hàm kiểm tra dữ liệu khi ấn nút [Lưu]
     * CreatedBy: NQDAT
     */
    checkValidate() {
      this.applicantsCheck.valid = this.newForm.applicantId;
      this.approvedByCheck.valid = this.newForm.approverId;
      this.statusCheck.valid = this.newForm.state;
      this.reasonOvertimeCheck.valid = this.newForm.reasonOvertime;
      this.dateCreateCheck.valid = this.newForm.dateCreate;
      this.dateWorkStartCheck.valid = this.newForm.dateWorkStart;
      this.dateWorkEndCheck.valid = this.newForm.dateWorkEnd;

      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart > this.newForm.dateWorkEnd
      ) {
        this.dateWorkStartCheck.valid = false;
        this.dateWorkStartCheck.errMsg =
          "Làm thêm từ phải nhỏ hơn làm thêm đến.";
        this.dateWorkEndCheck.valid = false;
        this.dateWorkEndCheck.errMsg = "Làm thêm đến phải lớn làm thêm từ.";
      }
      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart < this.newForm.dateWorkEnd
      ) {
        this.dateWorkStartCheck.valid = true;
        this.dateWorkEndCheck.valid = true;
      }

      return (
        this.newForm.applicantId &&
        this.newForm.approverId &&
        this.newForm.state &&
        this.newForm.reasonOvertime &&
        this.newForm.dateCreate &&
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.dateWorkEndCheck.valid &&
        this.dateWorkStartCheck.valid
      );
    },
    /**
     * Hàm kiểm tra "Làm thêm từ"
     * "Làm thêm từ phải" nhỏ hơn "Làm thêm đến"
     * CreatedBy: NQDAT
     */
    checkDateWorkStart() {
      this.dateWorkStartCheck.valid = this.newForm.dateWorkStart;
      if (!this.dateWorkStartCheck.valid) {
        this.dateWorkStartCheck.errMsg = "Làm thêm từ không được để trống.";
      }
      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart >= this.newForm.dateWorkEnd
      ) {
        this.dateWorkStartCheck.valid = false;
        this.dateWorkEndCheck.valid = true;
        this.dateWorkStartCheck.errMsg =
          "Làm thêm từ phải nhỏ hơn làm thêm đến.";
      }
      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart < this.newForm.dateWorkEnd
      ) {
        this.dateWorkStartCheck.valid = true;
        this.dateWorkEndCheck.valid = true;
      }
    },
    /**
     * Hàm kiểm tra "Làm thêm đến"
     * "Làm thêm đến" phải" lớn hơn "Làm thêm từ"
     * CreatedBy: NQDAT
     */
    checkDateWorkEnd() {
      this.dateWorkEndCheck.valid = this.newForm.dateWorkEnd;
      if (!this.dateWorkEndCheck.valid) {
        this.dateWorkEndCheck.errMsg = "Làm thêm đến không được để trống.";
      }
      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart >= this.newForm.dateWorkEnd
      ) {
        this.dateWorkEndCheck.valid = false;
        this.dateWorkStartCheck.valid = true;
        this.dateWorkEndCheck.errMsg = "Làm thêm đến phải lớn làm thêm từ.";
      }
      if (
        this.newForm.dateWorkStart &&
        this.newForm.dateWorkEnd &&
        this.newForm.dateWorkStart < this.newForm.dateWorkEnd
      ) {
        this.dateWorkStartCheck.valid = true;
        this.dateWorkEndCheck.valid = true;
      }
    },
  },
  created() {
    if (this.isEditing) {
      this.newForm = { ...this.selectedForm };
    }
    this.newFormCache = { ...this.newForm };
  },
  mounted() {
    this.$refs["autoFocus"].instance.focus();
  },
};
</script>
