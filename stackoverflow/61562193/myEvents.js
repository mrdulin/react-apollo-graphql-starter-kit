import { ipcMain } from 'electron';

export class IpcMainEvents {
  constructor() {
    ipcMain.on('openPlaywright', this.openPlaywright);
    ipcMain.on('openPreviewBrowser', this.openPlaywright);
  }

  openPlaywright(event, arg) {
    console.log('openPlaywright');
  }

  openPreviewBrowser(event, arg) {
    console.log('openPreviewBrowser');
  }
}
