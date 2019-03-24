const shortid = require('shortid');
const fs = require('fs');
const mkdirp = require('mkdirp');

class Upload {
  constructor(options) {
    const { uploadDir } = options;
    this.uploadDir = uploadDir;
    mkdirp(uploadDir);
  }

  getAll(lowdb) {
    return lowdb.get('uploads').value();
  }

  singleUpload(file, lowdb) {
    return this.processUpload(file, lowdb);
  }

  multipleUpload(files, lowdb) {
    return Promise.all(files.map(file => this.processUpload(file, lowdb)));
  }

  async processUpload(upload, lowdb) {
    try {
      const { stream, filename, mimetype, encoding } = await upload;
      const { id, filepath } = await this.storeFS({ stream, filename });
      return this.storeDB({ id, filepath, mimetype, encoding, filename }, lowdb);
    } catch (err) {
      console.log('processUpload error');
      throw new Error(err);
    }
  }

  storeDB(file, lowdb) {
    return lowdb
      .get('uploads')
      .push(file)
      .last()
      .write();
  }

  storeFS({ stream, filename }) {
    const id = shortid.generate();
    const filepath = `${this.uploadDir}/${id}-${filename}`;
    return new Promise((resolve, reject) => {
      stream.on('error', err => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(filepath);
        }
        reject(err);
      });

      stream
        .pipe(fs.createWriteStream(filepath))
        .on('error', err => reject(err))
        .on('finish', () => resolve({ id, filepath }));
    });
  }
}

exports.Upload = Upload;
