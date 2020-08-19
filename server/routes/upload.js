const { Storage } = require('@google-cloud/storage');

const storage = new Storage();

const bucket = storage.bucket(process.env.GCLOUD_BUCKET_NAME);

const uploadImage = (file) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;
  const blob = bucket.file(originalname.replace(/ /g, '_'));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });
  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  })
    .on('error', (err) => {
      console.log(err);
      reject(err);
    })
    .end(buffer);
});

module.exports = uploadImage;