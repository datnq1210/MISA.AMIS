<template>
  <div class="ms-tooltip">
    <div class="icon-info"></div>
    <div class="tooltip__content">{{ errMsg }}</div>
  </div>
</template>

<script>
export default {
  name: "ms-tooltip",
  props:{
    errMsg:{
      type: String,
      default: null
    }
  }
};
</script>

<style>
.ms-tooltip {
  position: absolute;
  width: 34px;
  height: 34px;
  padding: 8px;
  background-color: none;
  right: 6%;
}

.tooltip__content {
  position: absolute;
  background: black;
  padding: 4px;
  width: max-content;
  border-radius: 4px;
  color: #fff;
  top: -30px;
  left: 35%;
  transform: translateX(-50%);
  font-size: 12px;
  visibility: hidden;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
}

.tooltip__content::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: rotate(45deg);
  background: #000;
}

.icon-info:hover + .tooltip__content {
  visibility: visible;
}
</style>