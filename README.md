A write-up about your project. Please include what question you chose to explore, how you
approached deciding on the data model, and how you approached the interface to interact with that data.

● When crafting your solution, consider efficiency, readability, scalability, and modular design.
● Feel free to use a lightweight in-memory db such as sqlite or mongodb memory server.
● Leveraging appropriate data structures can help optimize your solution.
● Unit tests and code comments will help your reviewer better understand your code and intent.
● Create a readme file with clear instructions on how to bootstrap and run your program.

# nflx-ufse-takehome-claudioherrera

A simple app showcasing use of the [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)

## Requirements

### Node

To run the app, you will need to have [Node.js](https://nodejs.org/) installed. Please follow the documentation to install for your operating system.
After successful install, verify the installation via:
`$ node -v`.

### NPM

You will also need NPM to install the project dependencies to run the app. Please follow the instructions [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/); After successful install, verify the installation via:
`$ npm -v`.

### Git

You will need Git to be able to pull the app source code to your local. Please follow the instructions [here](https://git-scm.com/downloads) and verify your installation via:
`$ giv -v`.

## Install

`$ git clone https://github.com/thesuperhomie/nflx-ufse-takehome-claudioherrera`
`$ cd nflx-ufse-takehome-claudioherrera`
`$ npm run install-all`

## Running the project

    `$ npm run app`

## Project Write-Up

### Introduction

I chose to use the Yelp business search API as my primary data source for the app. My goal was to prototype a basic version of the tool that so many of us rely on in a short time period. In other words, I explored the question can I build a Yelp mock in a little over four hours? What you see is my attempt at that.

### BE Design

The storage schema is designed based off of the API responses as those are the driving factors for data in my app. I had troble enforcing foreign keys within SQLite which would have illustrated the relationship between the three main entities: SearchTerms, Categories, Businesses but due to time I moved forward without resolving my lack of SQLite expertise as this was my first time using it. The BE features a single main controller `/api/autocomplete` that the FE consumes to drive the user interface. The separation of files aim to stick to a single responsibility within their corresponding domain for extensability. Due to time constraints, I did not write any unit tests x_x.

### FE Design

The user interface was largely based off of simplicity and mimicking a rudimentary version of Yelp. The UI features a search bar paired with a search button and a result set list view as users interact with the app. I broke the component structure down into both stateful and stateless components to achieve the overall experience. The components are written in such a way that it supports React.js' philosophy on modular and reusable components. Due to time constraints, I did not write any unit tests x_x.

Thank you!
