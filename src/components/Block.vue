<template>
    <div class="node-block">
        <div class="title">{{ block.index }}</div>
        <p class="content">{{ block.attributes.data }}</p>
    </div>
</template>

<script>
export default {
    name: 'block',
  props: {
    block: {
      index: Number,
      attributes: Object,
    },
  },
}
</script>

<style scoped>
    .node-block {
        background-color: #999;
        margin-bottom: 5px;
    }
    .title {
        color: navy;
        font-weight: 400;
    }
    p.content {
        font-size: 14px;
        line-height: 22px;
    }
</style>