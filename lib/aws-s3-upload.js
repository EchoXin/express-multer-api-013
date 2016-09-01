'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fs = require('fs');
const mime = require('mime');
const path = require('path');

const crypto = require('crypto');

const s3Upload = (file) => {

  let stream = fs.createReadStream(file.path);
  let contentType = mime.lookup(file.path);
  let ext = path.extname(file.path);
  let folder = (new Date()).toISOString().split('T')[0];

  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString('hex'));
      }
    });
  }).then(basename => {
      let params = {
        ACL: 'public-read',
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        ContentType: contentType,
        Key: `${folder}/${basename}${ext}`,
        Body: stream,
      };
      return new Promise((resolve, reject) => {
        s3.upload(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
    });
};

module.exports = s3Upload;
