<template>
  <div class="ms-dialog">
    <div class="dialog-header ms-flex ms-spacer">
      <div class="heading-4">
        {{ dialogHeader }}
      </div>
      <button>
        <div class="icon-close"></div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ms-dialog",
  props: {
    dialogHeader: {
      type: String,
      default: null,
    },
  },
};
</script>

<style>
.ms-dialog {
  width: 415px;
  height: auto;
  background: #fff;
}
</style>