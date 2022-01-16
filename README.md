## Text Recognition API (nwHacks 2022)

A OCR/HCR based API for recognizing code snippets, notes, and other academic content from images, built using Microsoft's Cognitive Services and Google's Cloud Vision API.

### 1.Instructions

You can test out the Text Recognition API by following any of the steps below:

### 1a. Visit Hosted API

To see the full capabilities of the API, visit [`https://text-recognition-api-v2.herokuapp.com/api/annotate`](https://text-recognition-api-v2.herokuapp.com/api/annotate)

OR

### 1b. Clone and Run Docker Container

```
docker run -d -p 3000:3000 jsam07/text-recognition-api:latest
```

OR

### 1c. Download API and install dependencies

Clone this repository:

```
git clone git@github.com:jsam07/text-recognition-api.git
```

Install npm dependencies:

```
cd text-recognition-api
npm install
```

### Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now perform API requests, e.g. [`http://localhost:3000/api/annotate`](http://localhost:3000/api/annotate). You can always visit [`https://text-recognition-api-v2.herokuapp.com/api/annotate`](https://text-recognition-api-v2.herokuapp.com/api/annotate) for a demo of the API.

Note, running the application locally or via Docker will require environment variables with the following shape:

```sh
AZURE_API_KEY=""
AZURE_COGNITIVE_ENDPOINT=""

GOOGLE_ACCOUNT_TYPE=""
GOOGLE_PROJECT_ID=""
GOOGLE_PRIVATE_KEY_ID=""
GOOGLE_PRIVATE_KEY=""
GOOGLE_CLIENT_EMAIL=""
GOOGLE_CLIENT_ID=""
GOOGLE_AUTH_URI=""
GOOGLE_TOKEN_URI=""
GOOGLE_AUTH_CERT_URL=""
GOOGLE_CLIENT_CERT_URL=""
```

## Using the REST API

You can access the REST API using the following endpoints:

### `GET`

-   `/api/annotate`: Annotate/Analyze demo image

### `POST`

-   `/api/annotate`: Annotate/Analyze image for text/code
    -   Body:
        -   `image: String` (required): The base64 string of the image to process
        -   `code: Boolean` (optional): If image is code snippet or not

## Important Acknowledgements:

-   Starter from: [BCIT-DDC API Starter](https://github.com/BCIT-DDC/node-ts-restful-api-starter). Underlying logic of this application is different from the former.
