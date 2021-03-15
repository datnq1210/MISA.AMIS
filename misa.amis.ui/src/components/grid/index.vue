<template>
  <div class="grid">
    <div class="grid-table">
      <DxDataGrid
        :data-source="tableName"
        :onContentReady="onContentReady"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :noDataText="'Không có dữ liệu'"
        :height="'100%'"
        :hoverStateEnabled="true"
        @row-click="getSelectedRow"
        @selection-changed="onSelectionChanged"
        style="border: 1px solid #e0e0e0"
        ref="MsGrid"
      >
        <DxSelection
          mode="multiple"
          select-all-mode="page"
          show-check-boxes-mode="always"
        />

        <DxPaging :enabled="false" />
        <DxScrolling use-native="true" />
        <DxColumn
          v-show="adjustColumn"
          id="adjust-column"
          header-cell-template="adjust-column"
          :allow-sorting="false"
          width="50"
        />
        <template #adjust-column>
          <div
            v-show="adjustColumn"
            id="adjust-column-btn"
            class="icon-adjust-column"
            @click="isShowAdjustColumn = !isShowAdjustColumn"
          ></div>
        </template>

        <DxColumn
          v-for="(item, index) in columns"
          :data-field="item.datafield"
          :caption="item.caption"
          :key="index"
          :min-width="minWidth"
          :visible="item.visible"
          :allow-sorting="false"
          cell-template="custom-cell"
        />

        <template #custom-cell="{data}">
          <slot :name="data.column.dataField" :data="data">
            <div>{{data.value}}</div>
          </slot>
        </template>

        <DxColumn
          caption=""
          :width="120"
          cell-template="onHoverRow"
          :allow-sorting="false"
        />
        <template #onHoverRow="{}">
          <div class="onHoverRow ms-flex">
            <button class="btn-edit mr-4" @click="editRow">
              <div class="icon-edit"></div>
            </button>
            <button class="btn-delete" @click="deleteRow">
              <div class="icon-delete"></div>
            </button>
          </div>
        </template>
      </DxDataGrid>
    </div>
    <div class="grid-bottom">
      <div>
        Tổng số bản ghi: <b>{{ recordTotal }}</b>
      </div>
      <div class="ms-flex">
        <ms-select
          :id="'paging'"
          class="pagingOption"
          :data="pages"
          :width="'100'"
          :iconLagre="true"
        ></ms-select>
        <div class="mx-6">
          Từ <b>{{ recordTotal ? "01" : "0" }}</b> đến
          <b>{{ recordTotal }}</b> bản ghi
        </div>
        <button class="mr-2">
          <div class="icon-prev-page mr-6"></div>
        </button>
        <button class="ml-2">
          <div class="icon-next-page"></div>
        </button>
      </div>
    </div>
    <ms-dialog
      :dialogHeader="'Cảnh báo'"
      :dialogMsg="'Bạn có chắc chắn muốn xóa Đơn xin làm thêm này không?'"
      ref="confirmDeleteDialog"
    >
      <button
        class="btn-dialog-delete"
        @click="
          () => {
            this.$emit('deleteOnClick', this.selectedRow.overtimeId);
            this.$refs.confirmDeleteDialog.close();
          }
        "
      >
        Xóa
      </button>
      <button
        class="btn-dialog-cancel ms-button mr-2 ms-button ms-button-secondary bg-hover-secondary bg-active-secondary"
        @click="
          () => {
            this.$refs.confirmDeleteDialog.close();
          }
        "
      >
        Hủy
      </button>
    </ms-dialog>
    <transition>
      <AdjustColumn
        v-show="isShowAdjustColumn"
        @closeAdjustColumn="closeAdjustColumn"
        :headers="headers"
        @onSaveFilter="handleSaveFilter"
      />
    </transition>
  </div>
</template>

<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import {
  DxDataGrid,
  DxColumn,
  DxSelection,
  DxPaging,
  DxScrolling,
} from "devextreme-vue/data-grid";
import AdjustColumn from "./AdjustColumn";
export default {
  name: "ms-grid",
  components: {
    DxDataGrid,
    DxColumn,
    DxSelection,
    AdjustColumn,
    DxPaging,
    DxScrolling,
  },
  props: {
    tableName: {
      type: Array,
    },
    primaryKey:{
      type: String,
      default: null
    },
    columns: {
      type: Array,
      default: () => [],
    },
    adjustColumn: {
      type: Boolean,
      default: true,
    },
    minWidth: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    recordTotal() {
      return 0;
    },
  },
  data() {
    return {
      isShowAdjustColumn: false,
      defaultVisible: false,
      selectedRow: {},
      isEditing: false,
      isDeleting: false,
      pages: [{ value: 15 }, { value: 25 }, { value: 50 }, { value: 100 }],
      headers: JSON.parse(JSON.stringify(this.columns)),
    };
  },
  methods: {
    getSelectedRow(e) {
      this.selectedRow = e.data;
      if (this.isEditing) {
        this.$emit("editOnClick", this.selectedRow);
        this.isEditing = false;
      }
    },
    handleSaveFilter(val) {
      this.$emit("updateHeader", val);
    },
    toggleDefault() {
      this.defaultVisible = !this.defaultVisible;
    },
    deleteRow() {
      this.$refs.confirmDeleteDialog.open();
    },
    editRow() {
      this.isEditing = true;
    },
    onContentReady(e) {
      e.component.columnOption("command:select", "visibleIndex", 0);
    },
    onSelectionChanged(e) {
      const currentSelectedRowKeys = e.currentSelectedRowKeys;
      const currentDeselectedRowKeys = e.currentDeselectedRowKeys;
      const allSelectedRowKeys = e.selectedRowKeys;
      const allSelectedRowsData = e.selectedRowsData;
      console.log(currentSelectedRowKeys);
      console.log(currentDeselectedRowKeys);
      console.log(allSelectedRowKeys.length);
      console.log(allSelectedRowsData);
      if (allSelectedRowKeys.length > 0)
        this.$emit("onCheckRow", true, allSelectedRowKeys.length);
      else if (allSelectedRowKeys.length <= 0) this.$emit("onCheckRow", false);
    },
    closeAdjustColumn() {
      this.isShowAdjustColumn = false;
    },
    clearAll() {
      this.$refs.MsGrid.instance.clearSelection();
    },
    checkClickOn(event) {
      try {
        if (
          !document
            .getElementById("adjust-column-btn")
            .contains(event.target) &&
          !document.getElementById("adjust-column-box").contains(event.target)
        ) {
          this.isShowAdjustColumn = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.checkClickOn);
  },
};
</script>

<style>
.grid {
  width: 100%;
  height: 100%;
  position: relative;
}

.grid-table {
  width: 100%;
  height: calc(100% - 60px);
}

.grid-bottom {
  width: 100%;
  height: 60px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  justify-content: space-between;
  display: flex;
  align-items: center;
  padding: 10px 16px 10px 16px;
  font-size: 14px;
}

.dx-datagrid-content .dx-datagrid-table .dx-row td {
  border: none !important;
  color: #000;
}

.dx-datagrid-content .dx-checkbox-icon {
  border: 2px solid #737888 !important;
  border-radius: 4px !important;
}

.dx-checkbox-checked .dx-checkbox-icon {
  background-color: var(--primary);
  color: #fff !important;
  border: none !important;
  border: none;
}

.dx-checkbox-checked .dx-checkbox-icon {
  border: none !important;
}

.dx-datagrid-content .dx-state-hover,
.dx-datagrid-content .dx-state-focused {
  border: 1px solid transparent !important;
}

.dx-datagrid-content .dx-datagrid-table .dx-row > td:first-child,
.dx-datagrid-content .dx-datagrid-table .dx-row > tr > td:first-child {
  border-left: 0;
  text-align: left;
  display: flex !important;
  justify-content: center !important;
}

.dx-datagrid-headers {
  border: 1px solid transparent !important;
}

.dx-datagrid-rowsview
  .dx-select-checkboxes-hidden
  > tbody
  > tr
  > td
  > .dx-select-checkbox {
  display: inline-block;
}

.dx-datagrid-rowsview .dx-row {
  border: none;
}

.dx-datagrid-rowsview .dx-row > td {
  height: 46px !important;
  vertical-align: middle !important;
  border-bottom: 1px solid #e0e0e0 !important;
}

.dx-column-lines {
  border-bottom: 1px solid #e0e0e0 !important;
}

.dx-header-row > td {
  height: 46px !important;
  line-height: 45px !important;
  font-weight: 700;
}
.dx-header-row {
  border: 1px solid transparent !important;
}

#dx-col-1 {
  height: 48px !important;
}

.dx-checkbox-indeterminate .dx-checkbox-icon::before {
  content: "" !important;
  color: #fff;
}

.dx-datagrid-content .dx-state-hover {
  background-color: #ffede2 !important;
}

/* .dx-datagrid-rowsview .dx-selection {
    background-color: #fff4e5 !important;
  } */

.dx-freespace-row.dx-column-lines {
  display: none;
}

.dx-header-row.dx-state-hover {
  background: #fff !important;
  border: 1px solid transparent;
}

.dx-scrollable-content .dx-state-hover {
  border: none !important;
}

.onHoverRow {
  visibility: hidden;
}

.dx-scrollable-content .dx-state-hover .onHoverRow {
  visibility: visible;
}

.dx-scrollbar-horizontal.dx-scrollbar-hoverable.dx-state-hover {
  border: none !important;
}

.dx-scrollbar-vertical.dx-scrollbar-hoverable.dx-state-hover {
  border: none !important;
}

.dx-datagrid-nodata::before {
  content: "";
  display: inline-block;
  position: absolute;
  left: 50%;
  -webkit-transform: translate(-50%, -120%);
  transform: translate(-50%, -120%);
  width: 80px;
  height: 80px;
  background: url("../../assets/empty_state.svg") no-repeat -13px -270px;
  width: 54px;
  height: 68px;
}
.dx-datagrid-rowsview .dx-selection,
.dx-datagrid-rowsview .dx-selection td {
  background: #fff4e5 !important;
}

.dx-widget {
  font-family: "Roboto" !important;
}

.dx-tooltip-wrapper .dx-overlay-content {
  background-color: #000;
  color: #fff;
}

.btn-edit,
.btn-delete {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.pagingOption {
  width: 75px;
  height: 40px !important;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  font-weight: bold;
  display: flex;
  justify-content: center;
}
.pagingOption .option {
  top: -170px;
}

.btn-dialog-cancel,
.btn-dialog-delete {
  padding: 0 16px 0 16px;
  width: 80px !important;
  border-radius: 4px;
}

.btn-dialog-delete {
  background: #ef292f;
  color: #fff;
  border: 1px solid #ef292f;
  font-size: 14px;
  font-weight: 500;
}
</style>
