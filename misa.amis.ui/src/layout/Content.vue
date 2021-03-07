<template>
  <div class="content px-6 py-4">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "ms-content",
};
</script>

<style>
.content {
  width: 100%;
  height: calc(100vh - 56px);
  background: #f1f1f1;
  position: absolute;
  top: 56px;
}
</style>