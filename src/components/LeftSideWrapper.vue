<template>
  <div class="side-wrapper">
    <div class="side-title">{{ psTitle }}</div>
    <div class="side-menu">
      <ul v-if="psData.length > 0">
        <li v-for="(item, index) in psData" :key="index">
          <a :href="'#' + item.label" v-on:click="expandChildren($event, item)">
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
            &nbsp; {{ item.label + (item.list.length>0? `(${item.list.length})`:'') }}
          </a>
          <div class="children-container">
            <ul v-if="item.expand && item.children && item.children.length > 0">
              <li v-for="(citem, cindex) in item.children" :key="cindex">
                <a
                  :href="'#' + citem.label"
                  v-on:click="expandChildren($event, citem)"
                >
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
                  &nbsp; {{ citem.label + (citem.list.length>0? `(${citem.list.length})`:'') }}
                </a>
                <div class="children-container">
                  <ul
                    v-if="
                      citem.expand &&
                      citem.children &&
                      citem.children.length > 0
                    "
                  >
                    <li
                      v-for="(c2item, c2index) in citem.children"
                      :key="c2index"
                    >
                      <a
                        :href="'#' + c2item.label"
                        v-on:click="expandChildren($event, c2item)"
                      >
                        <i
                          class="fa fa-lg"
                          v-bind:class="[
                            {
                              'fa-folder':
                                !c2item.expand &&
                                !c2item.iconFont &&
                                c2item.children &&
                                c2item.children.length > 0,
                              'fa-folder-open':
                                c2item.expand &&
                                !c2item.iconFont &&
                                c2item.children &&
                                c2item.children.length > 0,
                              'fa-file':
                                !c2item.iconFont &&
                                (!c2item.children || c2item.children == 0),
                            },
                            c2item.iconFont ? c2item.iconFont : '',
                          ]"
                          aria-hidden="true"
                          ><!--expand:是否展开；iconFont：自定义icon--></i
                        >
                        &nbsp; {{ c2item.label + (c2item.list.length>0? `(${c2item.list.length})`:'') }}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
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
  methods: {
    expandChildren: function (e, item) {
      if (!item || item.children.length < 1) {
        return;
      }
      item.expand = !item.expand;
    },
  },
};
</script>

<style scoped>
.side-menu ul ul {
  margin-left: 20px;
}
</style>