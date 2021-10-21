<template>
  <div class="side-wrapper">
    <div class="side-title">{{ psTitle }}</div>
    <div class="side-menu">
      <ul>
        <li v-for="(item, index) in psData" :key="index">
          <a :href="'#' + item.label" v-on:click="item.expand = !item.expand">
            <i
              class="fa fa-lg"
              v-bind:class="[
                {
                  'fa-folder':
                    !item.expand &&
                    !item.iconFont &&
                    item.children &&
                    item.children.length > 0,
                  'fa-folder-open':
                    item.expand &&
                    !item.iconFont &&
                    item.children &&
                    item.children.length > 0,
                  'fa-file':
                    !item.iconFont && (!item.children || item.children == 0),
                },
                item.iconFont ? item.iconFont : '',
              ]"
              aria-hidden="true"
              ><!--expand:是否展开；iconFont：自定义icon--></i
            >
            &nbsp; {{ item.label }}
          </a>
          <ul v-if="item.expand && item.children && item.children.length > 0">
            <li v-for="(citem, cindex) in item.children" :key="cindex">
              <a :href="'#' + citem.label">
                <i
                  class="fa fa-lg"
                  v-bind:class="[
                    {
                      'fa-folder':
                        !citem.expand &&
                        !citem.iconFont &&
                        citem.children &&
                        citem.children.length > 0,
                      'fa-folder-open':
                        citem.expand &&
                        !citem.iconFont &&
                        citem.children &&
                        citem.children.length > 0,
                      'fa-file':
                        !citem.iconFont &&
                        (!citem.children || citem.children == 0),
                    },
                    citem.iconFont ? citem.iconFont : '',
                  ]"
                  aria-hidden="true"
                  ><!--expand:是否展开；iconFont：自定义icon--></i
                >
                &nbsp; {{ citem.label }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <!-- <LeftTreeView /> -->
    </div>
  </div>
</template>

<script>
// import LeftTreeView from "@/components/LeftTreeView.vue";
export default {
  name: "LeftSideWrapper",
  components: {
    // LeftTreeView,
  },
  data() {
    return {};
  },
  props: {
    psTitle: String,
    psData: Array,
  }, //接手psData值
  methods: {},
};
</script>

<style scoped>
.side-menu ul ul {
  margin-left: 20px;
}
</style>