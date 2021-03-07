<template>
  <router-link :to="link">
    <div class="item" :class="{itemSelected: isSelected}" @click="doFunc">
      <slot />
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: {
      type: Object,
      required: true,
    },
    closeDropdown: {
      type: Function,
      default: () => {},
    },
    link: {
      type: String,
    },
    isSelected:{
      type: Boolean,
      default: false
    }
  },
  methods: {
    doFunc() {
      this.closeDropdown();
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  display: block;
  margin: 4px;
  width: max-content;
  min-width: 230px;
  height: 35px;
  padding: 5px 10px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  font-size: 14px;
  
  &:hover,
  &:focus {
    background: #ffede2;
    color: #121212;
  }

  &:focus .icon-check {
    background-color: #ec5504 !important;
  }
}

.itemSelected {
  background-color: #ffede2 !important;
  color: #ec5504;
}
</style>
