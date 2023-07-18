# WLAN Photo R2 Uploader

This project is a web page for users to upload their photos from phones or laptops or PC into Cloudflare R2. 
It is mainly relying on aws-sdk-js library and using vanilla nodejs for the backend.  
On the frontend side, it is using vanilla js and plain CSS and HTML.

## Getting Started

- ```npm install```
- ```npm start```

## Prerequisites

- Node.js
- Cloudflare R2 bucket and API key created

## Usage

### .env
To create such .env file:  
BUCKET_NAME=your_bucket_name  
ACCOUNT_ID=your_cloudflare_account_id  
ACCESS_KEY_ID=your_created_access_key_id  
SECRET_ACCESS_KEY=your_created_access_key_id_access_key  

### ```npm start```

### Address and port will be printed which shall be accessed in the same WLAN


