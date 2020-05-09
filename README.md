<h2 align="center">Hacker News Clone </h2>

In an effort to learn to react here is a react based hacker news clone from scratch using the official open [Hacker News's Algolia API](https://hn.algolia.com/api) `https://hn.algolia.com/api`

<p align="center" margin-bottom="0">
  <a href="https://hacker-news-clone.sourabhkhurana.com" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="https://www.sourabhkhurana.com/assets/hacker-news-clone/home.png">
  </a>
</p>

<p align="center" margin-bottom="0">
  <a href="https://hacker-news-clone.sourabhkhurana.com" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="https://www.sourabhkhurana.com/assets/hacker-news-clone/graph.png">
  </a>
</p>

<p align="center">
  <a href="https://hacker-news-clone.sourabhkhurana.com/">Live Demo</a>
</p>

## Featuring

- React - UI Framework
- React Hook - A way to use state and side-effects in React function components
- Axios - A http client
- Server Side Rendering
- Express Server
- Rechats - A composable charting library built on React components
- Docker Containership
- Jest & Enzyme - Testing Framework
- Firebase - Deployment

## Installing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Use the node package manager [npm](https://www.npmjs.com) to set up the development enviroment.


1. Clone the repository using :

```bash
git clone https://github.com/sk0693/hn-clone.git
```

2. Change the repository directory :

```bash
cd hn-clone
```
3. Install the needed node packges/modules :

```bash
npm install
```

4. Start the development server :

```bash
npm start
```

## Available Scripts

In the project directory, you can run:

#### `dev`

`$ npm run dev`  Runs to build the React components and the express server. And after building the code it will run the App on PORT.

#### `dev:build-server`

`$ npm run dev:build-server`  Runs the development server using webpack-cli for Server side rendering and using this the React Hydrate the components.

#### `both`

`$ npm run both`  It will run the express server and the React server parallely using npm-run-all 

#### `docker:build`

`$ npm run docker:build`  Will build the container and downloads all modules/packages which is required for the app in its own container. 

#### `docker:up`

`$ npm run docker:up`  This command will run the already buit image and runs our app. If the build is not made then it will made it first and then runs the App in own container. 

<p align="center" margin-bottom="0">
  <a href="https://hacker-news-clone.sourabhkhurana.com" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="https://www.sourabhkhurana.com/assets/hacker-news-clone/docker-result.png">
  </a>
</p>

#### `firebase:deploy`

`$ npm run firebase:deploy` Will deployed the built to the Firebase server.

#### `firebase`

`$ npm run firebase` It will first made the build of the project and the deployed it to the Firebase server.

<p align="center" margin-bottom="0">
  <a href="https://hacker-news-clone.sourabhkhurana.com" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="https://www.sourabhkhurana.com/assets/hacker-news-clone/firebase-deploy.png">
  </a>
</p>

## Running the tests

Create React App uses [Jest](https://jestjs.io/) as its test runner. Jest ensuring your tests have unique global state, Jest can reliably run tests in parallel. To make things quick, Jest runs previously failed tests first and re-organizes runs based on how long test files take.

[Enzyme](https://enzymejs.github.io/enzyme/) is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components' output. Enzyme, created by Airbnb, adds some great additional utility methods for rendering a component (or multiple components), finding elements, and interacting with elements.

### Writing Tests

To create tests, add `it()` (or `test()`) blocks with the name of the test and its code. You may optionally wrap them in `describe()` blocks for logical grouping but this is neither required nor recommended.

Jest provides a built-in `expect()` global function for making assertions. A basic test could look like this:

I have made test case in `AppOnLoadTestingWithMinimulData.test` file so using the test command the jest framework automatically excute the all `.test` extension files sequentially.

```js
import React from 'react'
import { shallow } from 'enzyme'
import { configure } from 'enzyme';
import toJson from 'enzyme-to-json'
import Adapter from 'enzyme-adapter-react-16';
import App from '../src/App'

describe('App', () => {
    it('renders without crashing given the required props', () => {
        const props = {
            hits: [
                {
                    created_at: "2018-03-14T03:50:30.000Z",
                    title: "Stephen Hawking has died",
                    url: "http://www.bbc.com/news/uk-43396008",
                    author: "Cogito",
                    points: 6015,
                    story_text: null,
                    comment_text: null,
                    num_comments: 436,
                    story_id: null,
                    story_title: null,
                    story_url: null,
                    parent_id: null,
                    created_at_i: 1520999430,
                    relevancy_score: 8012,
                    objectID: "16582136",
                }
            ]
        }
        const wrapper = shallow(<App {...props} />)
        expect(toJson(wrapper)).toMatchSnapshot()
    })
})
```

To execute this just run:

```bash
npm test or npm run test
```

In this test case I have used dummy data for automate the test case. It has to be rendered without getting crashed with the data as props. And then the app will rendered the data accordingly.

The output of this test case would be.

<p>
  <a href="https://hackernews-redesign.netlify.com" target="_blank">
    <img alt="Hacker News Clone Demo" width="auto" height="auto" src="https://www.sourabhkhurana.com/assets/hacker-news-clone/jest-test.png">
  </a>
</p>

## Authors

* **Sourabh Khurana** 

- [GitHub](https://github.com/sk0693)
- [LinkedIn](https://linkedin.com/sk0693)
- [Portfolio](https://sourabhkhurana.com/resume.html)


## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc

<!-- ## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc -->
