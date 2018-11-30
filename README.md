# Fan Boost🏎


This is the front-end for FanBoost. It is written in React and uses Apollo as it's bindings to a GraphQL server. FanBoost allows users to create Formula One Circuits and Drivers. Users can also 'fan-boost' drivers to see which drivers have the most boosts. Users can also enjoy curated F1 video content. Users' accounts are secured using JWTs. 

Most of the typical GraphQL use cases are explored in this project such as Queries, Mutations and Subscriptions. The app is an SPA which lives on Netlify. If you're looking to learn how to use GraphQL on the front-end then you have landed in the right place! 

The back-end repo is [here](https://github.com/AmoDinho/formulaone-graphql/blob/master/README.md)


This project uses yarn which can be downloaded from [here](https://yarnpkg.com/en/).


# Setup Instructions

First clone the repo

```
$ git clone https://github.com/AmoDinho/formulaone-graphql-client.git 

```

Then you need to install the dependancies: 

```
$ yarn install
```


Then you start the dev server:

```
$ yarn start

```

Your backend server should be running on `localhost://3000`, create-react-app will default to `localhost://3001` for you.



The Design System is on [Figma](https://www.figma.com/file/CmYEyRWOtCuT2fgiTZrsNsMp/F1-App?node-id=0%3A1). 

The following resources were used to create this app: 

* [Advanced React](https://github.com/wesbos/Advanced-React)
* [Boilerplate for a Fullstack GraphQL App with React & Prisma](https://github.com/alan345/naperg)
* [How to GraphQL:React-Apollo](https://github.com/howtographql/react-apollo)
* [React-Apollo Docs](https://www.apollographql.com/docs/react/)
* [GraphQL Docs](https://graphql.org/)
