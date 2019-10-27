# Assistify Support Form

> Ease users to create support queries in Assistify

When my customers have a problem with my product and need immediate support, I want to immediately assign the problem to the right expert so that customers get help very quickly. It is explicitly not about the time to find the solution, but about the customer becoming connected with the right expert as quickly as possible.

## See it live

- https://assistify.github.io/support-form/

## Possible solution

Provide a web-based app which enables customers to drop the most important information in a web form. They do not have to hassle with systems or log-ins. On the other side, the app forwards the issue to the correct support team immediately. The support team provides support within an Assistify workplace.

## Precondition

- [ ] User is already registered and a local password is being set.

## Acceptance Criteria

- [ ] A logged-in customers can easily report their issue
- [ ] The user interface for reporting is a web-based support form.
- [ ] The following information is required to describe an issue:
  - customer's e-mail,
  - subject,
  - problem description
- [ ] Optional the customer can add [attachments](https://rocket.chat/docs/developer-guides/rest-api/chat/postmessage/#attachments-detail), like screenshots, to the issue.
  - If the attachements can not be uploaded easisly, the user should be engaged to upload his screenshots in Assistify manually
- [ ] The issue is sent to Assistify and creates a new discussion. The issue information is posted as first message in the discussion.
  - The user of this first message is the customer or a bot user.
- [ ] The parent channel of the discussion is determined by analyzing the content of the problem description (by a "keywords/channels matching table"). If the system is not able to infer a parent channel, a default parent channel is used.
  - The "keywords/channels matching table" must be persistent
  - There must exist some kind of interface to edit the "keywords/channels matching table".
- [ ] The customer gets a link to the discussion. By this, the customer is able to join the channel, when Single-Sign-On is used.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# run unit tests
npm run unit

# run all tests
npm test

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# Deploy the distribution files to GitHub Pages
npm run deploy
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
