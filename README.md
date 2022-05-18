# Making an Outbound Call Using a Server Side Rendered React Site, NeRu and the Voice API

This project shows how to use NeRu with a server side rendered react website, and make an outbound call with the Voice API.

![The static site](site.png)

This example differs from others since the `index.js` file is automatically generated for you when you run `npm run build`. The code for the project is split across the `server.jsx` file where you will find the NeRu router, and the `App.jsx` file where you will find the React code. 

After editing, run `npm run build` to regenerate your `index.js` file.

## Running the project

To run the project after downloading/cloning, first install the dependencies:

```sh
npm install
```

Create a Vonage Application if you do not have one already, and [link a phone number](https://dashboard.nexmo.com) to the application:

```sh
neru app create --name "neru application"  
```

Then initialize NeRu, choosing the `node.js` for runtime and `skip` for the template:

```sh
neru init
```

This will create a `neru.yml` file for you. In that file add the linked number under `configurations`:

```yml
project:
    name: $YOUR_PROJECT_NAME
instance:
    name: dev
    runtime: nodejs
    region: aws.euw1
    application-id: $YOUR_VONAGE_APPLICATION_ID
    configurations:
        contact:
            number: "$YOUR_VONAGE_NUMBER"
            type: phone

```

Build the React code:

```sh
npm run build
```

Then start the project locally using:

```sh
neru debug
```
