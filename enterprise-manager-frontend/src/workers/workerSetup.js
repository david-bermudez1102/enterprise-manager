export default class WebWorker {
  constructor(worker) {
    this.code = worker.toString();
    this.blob = new Blob(["(" + this.code + ")()"]);
    this.url = URL.createObjectURL(this.blob);
    this.worker = new Worker(this.url);
  }
}
