import { IpcMainEvents } from './myEvents';
import { ipcMain } from 'electron';

jest.mock(
  'electron',
  () => {
    const mockIpcMain = {
      on: jest.fn().mockReturnThis(),
    };
    return { ipcMain: mockIpcMain };
  },
  { virtual: true },
);

describe('Should test the ipcMain events', () => {
  let component;
  let addSpy;
  beforeEach(() => {
    component = new IpcMainEvents();
  });
  it('should attach the eventListeners', () => {
    expect(ipcMain.on.mock.calls[0][0]).toEqual('openPlaywright');
    expect(ipcMain.on.mock.calls[1][0]).toEqual('openPreviewBrowser');
    expect(ipcMain.on.mock.calls).toHaveLength(2);
  });
});
