import { reactive, ref } from 'vue';

interface NewView {
  name: string;
  winId: number;
  id: string;
  [props: string]: any;
}
interface CurStatus {
  canBack: boolean;
  canGo: boolean;
  canRefresh: boolean;
  viewId: string;
  curUrl: string;
  [props: string]: any;
}

const getTabsState = reactive<NewView[]>([]);

const curStatus = ref<CurStatus>({
  canBack: false,
  canGo: false,
  canRefresh: true,
  viewId: '0',
  curUrl: '',
  curViewId: '',
});

electronAPI.onNewView((e, { newView, status }) => {
  console.log(1);
  console.log({ newView, status });
  // getTabsState.push({
  //   name: newView.name,
  //   winId: newView.winId,
  //   id: newView.id,
  // });
  const index = status.fromViewId ? getTabsState.findIndex((v) => v.id == status.fromViewId) : 0;
  console.log(index, 'index');
  getTabsState.splice(index + 1, 0, {
    name: newView.name,
    winId: newView.winId,
    id: newView.id,
  });
  curStatus.value = Object.assign(curStatus.value, status);
  // curStatus.canBack = status.canBack;
  // curStatus.canGo = status.canGo;
  // curStatus.canRefresh = status.canRefresh;
  // curStatus.viewId = status.viewId;
  // curStatus.curUrl = status.curUrl;
});
electronAPI.onUpdateView((e, { viewId, status }) => {
  const index = getTabsState.findIndex((v) => v.id == viewId);
  getTabsState[index] = Object.assign(getTabsState[index], status);
});
electronAPI.onUpdateCurStatus((e, status) => {
  curStatus.value = Object.assign(curStatus.value, status);
  // curStatus.canBack = status.canBack;
  // curStatus.canGo = status.canGo;
  // curStatus.canRefresh = status.canRefresh;
  // curStatus.viewId = status.viewId;
  // curStatus.curUrl = status.curUrl;
});
export { curStatus, getTabsState };
