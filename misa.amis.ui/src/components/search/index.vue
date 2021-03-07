<template>
  <div class="search-box ">
    <v-icon v-if="isIcon" class="mr-2">mdi-magnify</v-icon>
    <input type="search" placeholder="Tìm kiếm" class="ms-input" />
  </div>
</template>
<script>
export default {
    name: 'ms-search-box',
    props: ['isIcon']
};
</script>

<style>
.search-box {
  width: auto;
  height: 36px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 8px;
  border: 1px solid var(--input-normal-border-color);
  border-radius: 4px;
  background-color: #fff;
}
.search-box:hover {
  border: 1px solid var(--input-hover-border-color);
}
.search-box:focus {
  border: 1px solid var(--input-active-border-color);
}
</style>