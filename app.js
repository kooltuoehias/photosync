import {
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import 'dotenv/config'
import * as http from 'http'
import * as fs from 'fs'
import * as url from 'url'
import * as os from 'os'

const S3 = new S3Client({
  region: "auto",
  endpoint: `https://` + process.env.ACCOUNT_ID + `.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, { 'content-type': 'text/html' });
    fs.createReadStream('index.html').pipe(res);
  }

  if (req.method == 'POST') {
    var data = [];

    req.on('data', function(chunk) {
        data.push(chunk);
    }).on('end', function() {
        var q = url.parse(req.url, true).query;
        S3.send(
          new PutObjectCommand({
            Body: Buffer.concat(data),
            Bucket: process.env.BUCKET_NAME,
            Key: q.name,
            ContentType: 'image/jpeg',
          })
        );
        console.log(q.name + ' Saved');
        res.writeHead(200, { 'content-type': 'text/html' })
    });
  }

})

var networkInterfaces = os.networkInterfaces();
var arr = networkInterfaces['WLAN'];
var ipv4 = arr.find(a => a.family === 'IPv4').address;
console.log(ipv4 + ":3000")
server.listen(process.env.PORT || 3000)
