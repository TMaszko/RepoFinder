# Repo-finder

## About

The application allows users to search for github repositories containing given search word in their title and displays result as a table. Maximum number of results is constrained to `100`.
User can sort results by multiple columns and limit the number of results shown to a specific one (5/10/15/20).
User can also log in with github account.

## Used Technologies

### TypeScript

Application was written in TypeScript. Using this super set of JavaScript language helps to have control over types. This technology was used to prevent bugs resulting from a lack of knowledge about what type variable or function has.

### React

This library makes it much easier to create a user interfaces. It's main advantage is the creation of components that can be reusable in various parts of the application.

### Redux

To easily manage the state of the application, it was decided to use the Redux library. Thanks to its use, you can easily access interesting values ​​from various parts of the application, as long as they have connection with Redux.

### Redux Observables

To be able to manage side effects, such as asynchronous actions, Redux Observables library was used. This technology was chosen in contrast to Redux Thunk, because it allows you to write in the reactive and functional paradigm, making the code more declarative and much more concise.

### Jest

To make sure application is working as it supposed to be, unit tests was written with Jest.

### Firebase

To provide simple log in with Github feature.

## Installation and usage

### Node modules

First step to make the application to work is to install node modules.

`Remember: the condition to install the required dependencies, run application or tests is to be in the same directory as package.json.`

In developer console install node modules by typing:

**npm users**

```javascript
npm install
```

**yarn users**

```javascript
yarn
```

#### Start using Repo-finder

After going through all of the above steps run application in a browser by typing below command in developer console.

**npm users**

```javascript
npm start
```

**yarn users**

```javascript
yarn start
```


#### Run Tests

To run tests type below command in developer console.

**npm users**

```javascript
npm test
```

**yarn users**

```javascript
yarn test
```
