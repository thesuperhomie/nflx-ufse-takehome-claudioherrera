# nflx-ufse-takehome-claudioherrera

A simple Node.js server and React.js frontend showcasing the use of the [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)

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

    $ npm run app

## Project Write-Up

### Introduction

I chose to use the Yelp business search API as my primary data source for the app. My goal was to prototype a basic version of the tool that so many of us rely. In other words, I explored the question can I build a Yelp mock in a little over four hours? What you see is my attempt at that.

### BE Design

The storage schema is designed based off of the API as that is the data in my app. I had troble enforcing foreign keys within SQLite which would have illustrated the relationship between the three main entities: SearchTerms, Categories, Businesses but due to time, I moved forward without resolving my lack of SQLite expertise as this was my first time using it. The BE features a single controller `/api/autocomplete` that the FE consumes to drive the user interface. The separation of files aim to stick to a single responsibility within their corresponding domain. Due to time constraints, I did not write any unit tests x_x.

### FE Design

The user interface was largely based off of simplicity and mimicking a rudimentary version of Yelp. The UI features a search bar paired with a search button and a result set list view as users interact with the app. I broke the component structure down into both stateful and stateless components to achieve the overall experience. The components are written in such a way that it supports React.js' philosophy of modular and reusable components. Due to time constraints, I did not write any unit tests x_x.

Thank you!
