'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const mime = require('mime');
const path = require('path');

const s3Upload = (file) => {

  let stream = fs.createReadStream(file.path);
  let contentType = mime.lookup(file.path);
  let ext = path.extname(file.path);
  let folder = (new Date()).toISOString().split('T')[0];

  const params = {
    ACL: 'public-read',
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    ContentType: contentType,
    Key: 'keenaaaaa wayans' + ext,
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

module.exports = s3Upload;
