import { ipcRenderer } from 'electron';

console.log(11);
localStorage.setItem('tourDone', true);
// import { Dykp } from './utils/dykp';
// const kpObj = {};
// ipcRenderer.on('startKp', (e, v) => {
//   console.log(v);
//   kpObj[v.videoId] = new Dykp(v.videoId, [], 30);
//   kpObj[v.videoId].startKp(10000);
// });
// ipcRenderer.on('stopKp', (e, v) => {
//   console.log(v);
//   kpObj[v.videoId].stopKp();
//   kpObj[v.videoId] = null;
// });
ipcRenderer.on('getLiuResult', (e, v) => {
  console.log(YQ);
  e.sender.send('backLiuResult', 3);
});
function getTypeList(v) {
  fetch('https://member.bilibili.com/x/vupre/web/archive/pre?lang=cn&t=' + new Date().getTime(), {
    referrer: 'https://member.bilibili.com/platform/upload/video/frame',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      if (result.code == 0) {
        ipcRenderer.invoke('afterGetBliUploadTypeList', {
          winId: v.winId,
          typeList: result.data.typelist,
        });
      }
    })
    .catch((error) => console.log('error', error));
}

ipcRenderer.on('monitorLogin', (e, v) => {
  // const requestOptions = {
  //   method: 'GET',
  //   credentials: 'include',
  // };

  fetch('https://api.bilibili.com/x/web-interface/nav?a=1', {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);

      if (result.code == 0) {
        ipcRenderer.invoke('afterLiu17Login', {
          winId: v.winId,
          result: result.data,
        });
        if (location.href.indexOf('member') == -1) {
          location.href = 'https://member.bilibili.com/platform/upload/video/frame';
        }
        if (location.href.indexOf('member') != -1) {
          getTypeList(v);
        }
      }
    })
    .catch((error) => console.log('error', error));
});
// console.log(contextBridge);

// ipcRenderer.on('getVideoList', (e, v) => {
//   console.log(v);
//   const newarr = [];
//   function getVideos(cursor, num, newarr) {
//     const requestOptions = {
//       method: 'GET',
//     };

//     fetch('https://creator.douyin.com/aweme/v1/creator/item/list/?cursor=' + cursor, requestOptions)
//       .then((response) => response.json())
//       .then((result) => {
//         if (result.item_info_list) {
//           newarr = newarr.concat(result.item_info_list);
//           if (newarr.length >= num) {
//             ipcRenderer.invoke('afterGetVideoList', { id: v.id, result: newarr });
//           } else {
//             if (result.has_more) {
//               getVideos(result.cursor, num, newarr);
//             } else {
//               ipcRenderer.invoke('afterGetVideoList', { id: v.id, result: newarr });
//             }
//           }
//         }
//       })
//       .catch((error) => console.log('getVideoserror', error));
//   }
//   getVideos(0, v.num, newarr);
// });
