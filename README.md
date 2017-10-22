# Buzzy Bot

This bot will Tweet Buzzcoin related content automatically throughout the day and check every minute for a new tweet.

## Installation

If you don't already have have them, please install [Node.js](http://nodejs.org/). This will install two programs: `node`, which runs JavaScript from the command line, and `npm`, which helps you install software that Node.js can run.

Make an empty project directory and [download this file](https://github.com/jackkdev/buzzybot/archive/master.zip), and unzip the contents to your project directory. Enter the terminal and navigate to the project directory. You should be able to see all the project files in this directory.

Before you can run the project, we need to install the Bot's dependancies:
`npm install`

This installs the Twitter package which will be used to communicate through the API to make posts.

## Connecting the Bot to your Twitter account

In order for the Bot to run, you need to register an application connected to your account.

Visit the website below and to create an application.

https://apps.twitter.com/app/new

Once you're there, fill in the required fields: name, description, website. None of it really matters at all to your actual app, it's just for Twitter's information. Do the captcha and submit.

Next you'll see a screen with a "Details" tab. Click on the "Settings" tab and under "Application Type" choose "Read and Write", then hit the update button at the bottom.

Then go to the Keys and Access Tokens tab, and at the bottom click "create my access token". Nothing might happen immediately. Wait a minute and reload the page. then there should be "access token" and "access token secret", which are both long strings of letters and numbers.

In order for the bot to run, we need to fill in your API credentials we made earlier. First of all, start out by creating a file called `.env` in the project directory. We will be using environment variables to securely handle your credentials. In this file, copy the format below.

```javascript
CONSUMER_KEY=YOUR_CONSUMER_KEY
CONSUMER_SECRET=YOUR_CONSUMER_SECRET
ACCESS_TOKEN=YOUR_ACCESS_TOKEN
ACCESS_TOKEN_SECRET=YOUR_ACCESS_TOKEN_SECRET
```

In between those quotes, instead of `'YOUR_CONSUMER_KEY'`, paste the appropriate information from the Details page. This page contains all the information needed to associate the Bot with your account, so **KEEP THIS INFORMATION SAFE AND DO NOT SHARE IT!**

Now type the following in the command line in your project directory:

`npm start`

Hooray! Your bot should be up and running, and you should be welcomed with `Hooray! Buzzy Bot is running!`
