export const startWorker = (webWorker, data, dispatch) => {
  webWorker.worker.postMessage(data);
  webWorker.worker.addEventListener("message", async e => {
    await e.data.forEach(async action => await dispatch(action));
  });
};
