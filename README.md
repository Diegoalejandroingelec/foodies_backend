<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

Our solution, RespFoodies, is ingeniously architected using Google Cloud Platform services. The frontend, is being crafted for Android devices using Kotlin (https://github.com/fendylo/respfoodie) and a robust backend developed with NestJS.

The core of our server-side operations is the integration with multiple Google APIs, mainly Gemini. This powerful tool enables us to generate not just creative, but highly personalized food recommendations. Tailored to individual user characteristics like age, health goals, and dietary restrictions, Gemini goes beyond suggesting dishes, it provides detailed insights into the ingredients, preparation methods, and optimal consumption times.

Complementing our AI prowess, we leverage GCP buckets for the secure storage of key data, including dish images and user profile pictures. Our database, hosted on Firebase, efficiently manages the AI-generated recommendations and user details. This versatile service also streamlines user authentication and account management.

A notable addition to our system is the integration with the Google Maps API. This feature allows users to effortlessly locate restaurants serving specific food categories, enhancing the dining experience with geographical convenience.

Looking ahead, we plan to further elevate our backend services by adopting Google's Kubernetes. This strategic move will automate and optimize the deployment, scaling, and operational management of our application containers, ensuring an even more seamless and reliable experience for RespFoodies users.

## RespFoodies Architecture

<div align="center">
   <img src="https://drive.google.com/file/d/1RmRXWAUxMpMFjTjRvczJt8gZ1L9RcMnd/view?usp=sharing" width="250">
</div>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Environment Setup

To ensure the proper functioning of this application, you must create a `.env` file in the root directory of the project. This file should contain the following keys with your specific values:

```plaintext
# Path to your Firebase service account keys
FIREBASE_SERVICE_ACCOUNT_PATH=<your_firebase_service_account_path>

# Gemini API key
GEMINI_API_KEY=<your_gemini_api_key>

# Google Maps API key
GOOGLE_MAPS_API_KEY=<your_google_maps_api_key>

# Email address for sending messages
EMAIL_ADDRESS=<your_email_address>

# Password for the email address
EMAIL_PASSWORD=<your_email_password>

# OpenAI API key
OPENAI_API_KEY=<your_openai_api_key>

# Path to your Google Cloud Platform credentials
GOOGLE_APPLICATION_CREDENTIALS=<your_gcp_credentials_path>

Replace the placeholders (<...>) with your actual values. Ensure this file is kept secure and not shared publicly, as it contains sensitive information.
```

## Authors and Acknowledgments

Resp Foodies is a collaborative project by the University of Technology Sydney GDSC team:

1. [Fendy Lomanjaya](https://www.linkedin.com/in/fendy-lomanjaya)
2. [Diego Alejandro Ramirez Vargas](https://www.linkedin.com/in/diegoalerami-vargas/)
3. [Sudarshan Kongkham](https://www.linkedin.com/in/shudarshan-kongkham-b86787196/)
4. [Abdullah Bahri](https://www.linkedin.com/in/abdullah-bahr/)
