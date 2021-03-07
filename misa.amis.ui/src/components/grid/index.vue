<template>
  <div class="grid">
    <DxDataGrid
      :data-source="data"
      :onContentReady="onContentReady"
      :allow-column-reordering="true"
      :allow-column-resizing="true"
      :noDataText="'Không có dữ liệu'"
      key-expr="ID"
      height="calc(100% - 60px)"
      style="border: 1px solid #e0e0e0"
      :hoverStateEnabled="true"
    >
      <DxSelection mode="multiple" />
      <DxScrollView :use-native="true" direction="both" />

      <DxColumn
        v-show="adjustColumn"
        id="adjust-column"
        header-cell-template="adjust-column"
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
        v-for="(column, index) in columns"
        :data-field="column.datafield"
        :caption="column.caption"
        :key="index"
        :min-width="minWidth"
      ></DxColumn>
    </DxDataGrid>
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
        <button class="mr-6">
          <div class="icon-prev-page mr-6"></div>
        </button>
        <button class="ml-6">
          <div class="icon-next-page"></div>
        </button>
      </div>
    </div>
    <!-- <div v-if="adjustColumn" >
    </div> -->
    <transition>
      <AdjustColumn
        v-show="isShowAdjustColumn"
        @closeAdjustColumn="closeAdjustColumn"
      />
    </transition>
  </div>
</template>

<script>
import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";

import { DxDataGrid, DxColumn, DxSelection } from "devextreme-vue/data-grid";
import { DxScrollView } from "devextreme-vue/scroll-view";
import AdjustColumn from "./AdjustColumn";
export default {
  name: "ms-grid",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Array,
      default: () => [],
    },
    adjustColumn: {
      type: Boolean,
      default: true,
    },
    minWidth:{
      type: Number,
      default: 0
    }
  },
  computed: {
    recordTotal() {
      var count = this.data.length;
      if (count < 10 && count > 0) return "0" + count;
      return count;
    },
  },
  data() {
    return {
      isShowAdjustColumn: false,
      pages: [{ text: "15" }, { text: "25" }, { text: "50" }, { text: "100" }],
    };
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxSelection,
    AdjustColumn,
    DxScrollView,
  },
  methods: {
    onContentReady(e) {
      e.component.columnOption("command:select", "visibleIndex", 0);
    },
    closeAdjustColumn() {
      this.isShowAdjustColumn = false;
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
  border: none !important;
}

.dx-datagrid-content .dx-datagrid-table .dx-row > td:first-child,
.dx-datagrid-content .dx-datagrid-table .dx-row > tr > td:first-child {
  border-left: 0;
  text-align: left;
  display: flex !important;
  justify-content: center !important;
}

.dx-datagrid-headers {
  border: none !important;
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
  height: 48px !important;
  line-height: 48px !important;
  font-weight: 600;
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

.dx-datagrid-rowsview .dx-selection {
  background-color: #fff4e5 !important;
}

.dx-freespace-row.dx-column-lines {
  display: none;
}

.dx-header-row.dx-state-hover {
  background: #fff !important;
}

.dx-scrollable-content .dx-state-hover {
  border: none !important;
}

.dx-scrollbar-horizontal.dx-scrollbar-hoverable.dx-state-hover{
  border: none !important;
}

.dx-scrollbar-vertical.dx-scrollbar-hoverable.dx-state-hover{
  border: none !important;
}

.pagingOption {
  width: 80px;
  height: 38px !important;
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
</style>