/* export const startWorker = (webWorker, data, dispatch) => {
  webWorker.worker.postMessage(data);
  webWorker.worker.addEventListener("message", async e => {
    await e.data.forEach(async action => await dispatch(action));
  });
};
 */
import worker from "workerize-loader!./worker"; // eslint-disable-line import/no-webpack-loader-syntax

const workerInstance = new worker();

export default workerInstance;
