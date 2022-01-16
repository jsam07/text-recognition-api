## Text Recognition API (nwHacks 2022)

A OCR/HCR based API for recognizing code snippets, notes, and other academic content from images, built using Microsoft's Cognitive Services and Google's Cloud Vision API.

### 1. Download API and install dependencies

Clone this repository:

```
git clone git@github.com:jsam07/text-recognition-api.git
```

Install npm dependencies:

```
cd text-recognition-api
npm install
```

### 2. Start the REST API server

```
npm run dev
```

The server is now running on `http://localhost:3000`. You can now perform API requests, e.g. [`http://localhost:3000/api/annotate`](http://localhost:3000/api/annotate).

## Using the REST API

You can access the REST API using the following endpoints:

### `GET`

-   `/api/annotate`: Annotate/Analyze demo image

### `POST`

-   `/api/annotate`: Annotate/Analyze image for text/code
    -   Body:
        -   `image: String` (required): The base64 string of an image
        -   `code: String` (optional): If image is code snippet or not

## Important Acknowledgements:

-   Starter from: [BCIT-DDC API Starter](https://github.com/BCIT-DDC/node-ts-restful-api-starter). Underlying logic of this application is different from the former.
