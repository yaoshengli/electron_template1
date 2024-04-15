<template>
  <div :style="getWrapStyle" :class="getClass">
    <MultipleTabs
      @change="change"
      @cancel="cancel"
      @sort="sort"
      :getTabsState="getTabsState"
      :activeKeyRef="curStatus.viewId"
    />
  </div>

  <div class="row middle-xs" style="height: 30px">
    <Icon
      @click="goBack"
      icon="ant-design:arrow-left-outlined"
      :size="20"
      class="j"
      :color="curStatus.canBack ? '' : '#eee'"
    />
    <Icon
      @click="goForward"
      icon="ant-design:arrow-right-outlined"
      :size="20"
      class="j"
      :color="curStatus.canGo ? '' : '#eee'"
    />
    <Icon @click="refresh" icon="ant-design:reload-outlined" :size="20" class="j" />
    <div class="col-xs j"><Input :value="curStatus.curUrl" placeholder="网址" readonly /></div>
  </div>
  <a-button @click="openBaidu">打开百度</a-button>
</template>
<script lang="ts" setup>
  import { unref, computed, CSSProperties, reactive } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import Icon from '@/components/Icon/Icon.vue';
  import MultipleTabs from '@/layouts/default/tabsview/index.vue';
  import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting';
  import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
  import { useAppInject } from '@/hooks/web/useAppInject';
  import { useDesign } from '@/hooks/web/useDesign';
  import { Input, Popover, Pagination, Empty } from 'ant-design-vue';
  import { getTabsState, curStatus } from './utils';

  const { getIsMobile } = useAppInject();
  const { prefixCls } = useDesign('layout-multiple-header');
  const getIsFixed = computed(() => {
    return unref(getFixed) || unref(getShowFullHeaderRef);
  });
  const { getFixed, getShowFullHeaderRef, getHeaderTheme } = useHeaderSetting();
  const openBaidu = async () => {
    const res = await electronAPI.invokeOpenBaidu({
      url: 'https://www.douyin.com/',
      cookie: '',
      id: '1234',

      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    });
    console.log(res);
  };
  const { getCalcContentWidth } = useMenuSetting();
  const change = async (viewId: string) => {
    const res = await electronAPI.invokeThisViewTop(viewId);
    curStatus.value.viewId = viewId;
    console.log(viewId);
  };
  const cancel = async (viewId: string) => {
    if (getTabsState.length == 1) return;
    console.log(viewId);
    const index = getTabsState.findIndex((v) => v.id == viewId);
    getTabsState.splice(index, 1);
    await electronAPI.invokeCancelView(viewId);
    if (viewId == curStatus.value.viewId) {
      let newViewId;
      if (getTabsState[index]) {
        newViewId = getTabsState[index].id;
      } else {
        newViewId = getTabsState[index - 1].id;
      }
      // const newViewId = getTabsState[index] ? getTabsState[index].id : getTabsState[index - 1].id;constnewViewIdgetTabsStateindexgetTabsStateindex.idconstnewViewIdgetTabsStateindexgetTabsStateindex.idconstnewViewIdgetTabsStateindexgetTabsStateindex.idconstnewViewIdgetTabsStateindexgetTabsStateindex.idconstnewViewIdgetTabsStateindexgetTabsStateindex.idconstnewViewIdgetTabsStateindexgetTabsStateindex.id
      change(newViewId);
    }
  };
  const sort = ({ oldIndex, newIndex }) => {
    const currentTab = getTabsState[oldIndex];
    getTabsState.splice(oldIndex, 1);
    getTabsState.splice(newIndex, 0, currentTab);
    console.log(getTabsState);
  };
  const goBack = () => {
    if (!curStatus.value.canBack) return;
    electronAPI.invokeThisViewBack(curStatus.value.viewId);
  };
  const goForward = () => {
    if (!curStatus.value.canGo) return;
    electronAPI.invokeThisViewForward(curStatus.value.viewId);
  };
  const refresh = () => {
    electronAPI.invokeThisViewRefresh(curStatus.value.viewId);
  };
  const getWrapStyle = computed((): CSSProperties => {
    const style: CSSProperties = {};
    if (unref(getFixed)) {
      style.width = unref(getIsMobile) ? '100%' : unref(getCalcContentWidth);
    }

    return style;
  });
  const getClass = computed(() => {
    return [
      prefixCls,
      `${prefixCls}--${unref(getHeaderTheme)}`,
      { [`${prefixCls}--fixed`]: unref(getIsFixed) },
    ];
  });
</script>
<style lang="less" scoped>
  .j {
    margin: 0 8px;
  }
</style>
