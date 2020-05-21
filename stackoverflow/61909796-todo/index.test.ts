import { b64toFile } from '.';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
(global as any).Blob = dom.window.Blob;
(global as any).File = dom.window.File;

const testBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

describe('61909796', () => {
  it('should pass', () => {
    const testimage = b64toFile(testBase64, 'test.png', 'image/png');
    console.log(testimage.arrayBuffer); // undefined
    console.log(testimage.stream); // undefined
    console.log(testimage.text); // undefined
    console.log(testimage.size);
    console.log(testimage.name);
    console.log(testimage.type);
    console.log(testimage.lastModified);
  });
});

//https://github.com/jsdom/jsdom/issues/2555
