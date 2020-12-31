<template>
  <v-expansion-panel class="accordion-node">
    <v-expansion-panel-header>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="accordion-header-name">{{node.name}}</span>
          <span class="accordion-header-url">{{node.url}}</span>
        </div>
        <v-badge
          class="accordion-badge"
          left
          bordered
          dot
          inline
          :color="getColor"
        >
          <span class="text-uppercase accordion-status-text">{{ getStatusText }}</span>
        </v-badge> 
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content v-if="this.node.blockList.loading !== false">
      <v-expansion-panels accordion
        v-for="(item,i) in getAllBlocks" :key="i">
          <block :key="i" :block="{
            index: item.id,
            attributes: item.attributes,
          }"
          />
      </v-expansion-panels>
    </v-expansion-panel-content>
    <v-expansion-panel-content v-else>
      Loading...
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import Block from './Block';
import { mapActions } from 'vuex'
export default {
  name: 'node',
  props: {
    node: {
      url: String,
      online: Boolean,
      name: String,
      loading: Boolean,
      blockList: Object,
    },
  },
  components: {
    Block,
  },
  data: () => ({
  }),
  computed: {
    getColor() {
      let badgeColor = '#Eb5757';

      if(this.node.online) {
        badgeColor = "#18cc55";
      }
      return badgeColor;
    },
    getStatusText() {
      let statusText = 'Loading';

      if(!this.node.loading) {
        if(this.node.online) {
          statusText = 'Online';
        } else {
          statusText = 'Offline';
        }
      }
      return statusText;
    }
  },
   methods: {
    ...mapActions(['getAllBlocks']),
  },
  async mounted() {
    await this.getAllBlocks(this.node);
  },
}
</script>

<style scoped>
  .accordion-badge {
    margin-left: auto;
    margin-right: 12px;
    margin-top: 1px;
  }
  .accordion-header-name {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #263238;
  }

  .accordion-header-url {
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #263238;
    opacity: 0.54;
  }

  .accordion-status-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    color: #263238;
  }
</style>

<style>
  .accordion-node .v-expansion-panels--accordion {
    padding-bottom: 12px;
  }

  .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
    height: 6px;
    margin-top: 18px;
    width: 6px;
  }

  @media only screen and (max-width: 442px) {
    .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
      margin-top: 28px;
    }  
  }
</style>