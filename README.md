# Wumpi Bot

=========
[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://nodejs.org/en/) [![forthebadge](https://forthebadge.com/images/badges/for-you.svg)](https://wumpi.xyz)

## Description

The goal of this bot is to provide a full suite of moderation commands and functions. The bot not only will be available to make a moderators life easier, but automate as much as it can. This extends to new member scans and anti bot players. It also allows for automating the muting of spammers, swearing, racial slurs, and raiding. This will improve the overall security of your server. It also includes a backup function which will keep a 24/7 backup of your server.

## This branch

This branch is supposed to be kept separate from the master branch and make sure this is never committed to the master branch.
This branch contains the source code for the nuxt.js-based front-end for the Wumpi dashboard.

## Setup

To get started just for this branch using: -

```bash
$ git clone --single-branch --branch front/nuxt https://github.com/Alex5219/Wumpi.git
```

To run the development version of the website, run the following command in any command line client: -

```bash
$ yarn dev
```

(in case you're using npm)

```bash
npm run dev
```

The development version updates the website every time you make a change in the source code. This also makes it slow.

For running the production ready build, run the following commands in any command line client: -

```bash
$ yarn build
$ yarn start
```

OR

```bash
$ npm run build
$ npm run start
```

The production build is omptimized for performance and will be much faster than development build but it won't update when changes are made to the source code.

For preparing the production ready files for deployment, run the following command: -

```bash
yarn generate
```

OR

```bash
npm run generate
```

This will prepare the production ready files for deployment in a new folder which can then be incorporated in our app.

---
