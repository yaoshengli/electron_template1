<template>
  <div :class="getWrapClass" id="eee">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hideAdd="true"
      :tabBarGutter="3"
      :activeKey="activeKeyRef"
      @change="handleChange"
      @edit="(e) => handleEdit(`${e}`)"
    >
      <template v-for="item in getTabsState" :key="item.id">
        <Tabs.TabPane :closable="true">
          <template #tab>
            <span style="max-width: 90px" class="line">{{ item.name }}</span>
          </template>
        </Tabs.TabPane>
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts" setup>
  import { computed, unref, ref, reactive, nextTick } from 'vue';

  import { Tabs } from 'ant-design-vue';

  import { useDesign } from '@/hooks/web/useDesign';

  import { useSortable } from '@/hooks/web/useSortable';
  import { useMouse } from '@vueuse/core';
  import { multipleTabHeight } from '@/settings/designSetting';

  const emit = defineEmits(['change', 'cancel', 'sort']);
  // defineOptions({ name: 'MultipleTabs' });
  // const props = defineProps<{
  //   getTabsState: any[];getTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsStategetTabsState
  // }>();
  const props = withDefaults(
    defineProps<{
      getTabsState: any[];
      activeKeyRef: string;
    }>(),
    {
      getTabsState: () => [],
      activeKeyRef: '0',
    },
  );

  nextTick(() => {
    const el = document.querySelectorAll(`#eee .ant-tabs-nav-wrap > div`)?.[0] as HTMLElement;

    const { initSortable } = useSortable(el, {
      onEnd: (evt) => {
        const { oldIndex, newIndex } = evt;
        console.log({ oldIndex, newIndex });
        // if (isNil(oldIndex) || isNil(newIndex) || oldIndex === newIndex) {
        //   return;
        // }
        emit('sort', { oldIndex, newIndex });
      },
    });
    initSortable();
  });

  const { prefixCls } = useDesign('multiple-tabs');

  const unClose = computed(() => unref(props.getTabsState).length === 1);

  const { y: mouseY } = useMouse();

  const getWrapClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--hide-close`]: unref(unClose),
        [`${prefixCls}--hover`]: unref(mouseY) < multipleTabHeight,
      },
    ];
  });

  function handleChange(activeKey: any) {
    // props.activeKeyRef = activeKey;
    console.log(activeKey);
    emit('change', activeKey);
    // go(activeKey, false);
  }

  // Close the current tab
  function handleEdit(targetKey: string) {
    console.log(targetKey);
    emit('cancel', targetKey);
    // Added operation to hide, currently only use delete operation
    if (unref(unClose)) {
      return;
    }

    // tabStore.closeTabByKey(targetKey, router);
  }
</script>
<style lang="less">
  @import url('./index.less');
</style>
