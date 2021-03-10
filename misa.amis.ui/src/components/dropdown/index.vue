<template>
  <div :id="id" class="dropdown">
    <button
      class="pa-1"
      @click="isOpen = !isOpen"
      :class="{ isActive: isOpen, isSlected: isSelected }"
    >
      <div class="ml-4">
        <slot />
      </div>
      <div class="mi-chevron-down-white mr-2"></div>
    </button>
    <transition name="fade" appear>
      <div class="dropdown-list" v-if="isOpen">
        <Item
          v-for="(item, index) in dropdownItems"
          :key="index"
          :item="item"
          :closeDropdown="callToClose"
          :link="item.link"
          :isSelected="path == item.link"
        >
          <div>{{ item.text }}</div>
          <div v-if="path == item.link" class="icon-check"></div>
        </Item>
      </div>
    </transition>
  </div>
</template>

<script>
import Item from "./Item";

export default {
  name: "ms-dropdown-menu",
  components: {
    Item,
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  created() {
    window.addEventListener("click", this.checkClickOn);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.checkClickOn);
  },
  props: {
    dropdownItems: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      required: true,
    },
    isSelected: {
      type: Boolean,
    },
  },
  methods: {
    callToClose() {
      this.isOpen = false;
    },
    checkClickOn(event) {
      if (!document.getElementById(this.id).contains(event.target)) {
        this.isOpen = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  margin-right: 24px;
  font-size: 14px;
  border-radius: 32px;
}

.isSlected {
  background: #ec5504;
  color: white;
}

button {
  position: relative;
  background-color: white;
  display: flex;
  align-items: center;
  width: 100%;
  height: 38px;
  border-radius: 32px;
  cursor: pointer;

  &:focus {
    outline: 0px;
  }

  &:hover {
    background: #ec5504;
    color: white;
  }

  &.isActive {
    background: #ec5504;
    color: white;
  }
}

.dropdown {
  position: relative;
  width: fit-content;

  &-list {
    background: white;
    margin-top: 5px;
    position: absolute;
    right: 0;
    z-index: 10;
    border-radius: 4px;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);

    .item:focus .icon-check {
      background-color: #ec5504;
    }
  }
  a {
    color: #000;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
