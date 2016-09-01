'use strict';

require('dotenv').load();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const mime = require('mime');
const path = require('path');
let file = {
  path: process.argv[2],
  title: process.argv[3],
};

const s3Upload = () => {

  let stream = fs.createReadStream(file.path);
  let contentType = mime.lookup(file.path);
  let ext = path.extname(file.path);
  let folder = (new Date()).toISOString().split('T')[0];

  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: contentType,
    Key: 'keenannnnn wayans' + ext,
    Body: stream,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }

      console.log(err, data);
    });
  });
};

s3Upload(file)
  .then(data => console.log(data))
  .catch(err => console.error(err));

console.log(file);
