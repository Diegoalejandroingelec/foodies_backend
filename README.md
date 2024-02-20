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
   <img src="https://lh3.googleusercontent.com/fife/AGXqzDmHWGLgAYrEg8GhFRkFen71LeCOhpFPr7H3fqnicwqXsbYMMtcGc5zVvsKEfVyxAnYfsdNtrTMN07AXKLzg_UgnXfWE_F2Vv1IrgLpwr03r-gVoKNJfHQcbLLXY4TIvWJ-5GeW11v62yNAvEfh1uGkcW96CC7cURDu_FfmdNhU9GIMH0h2VaDEgJuo5VxDSdvYvsDd1Guti3dTtrbPua--T8RJ98dT3ie87KTOYVC5EX4ZkSWWEi8FSy0Hb9ndYraCAM7B0o_8eNq2xM_ihFniAfOMRq3rD2vnN7gO7bQflKUzpm9drnM29TLRL_-PVrduLdKtHyNdW2v0JW-etMbvCP7FP_UxM_0qWIOAQZ9oCJxirjRNN3kf2ObDNJzWM6fDVXothep4InZUoG7RimRq2CE4rUd6GyV1uT8znTJ5XXnjUZr_JvaENuz8gHNEmYSoF2jlC2tJiYuiXxnergKYEtrYfPkUvq-JkmxLV8K6C26Z_yaiuTWYYZbGA340QzFzYCdc5KK3bqAKM65q8iJzAI36sC6q_K1FzXbUVpenOICBsac2vK20mihqv-LquXyNAjeTY7i2WRlp6UDqHIj7xIS_IU5asCu_PzAsGrKJHARB15JM5gvW-YvlfwWZTIvKvyPhCnNrnqcMylCvarXoZtU3IuMA1ON6l4DSPrbSByCu3EsLNNK1ruLg-2SC-nPizoypR6JCOhWJTrHph0uc7Cff79ihxWh82iuj7MwuBugSC0vBYzJ_QYkKuTlH9D73OjrDRFjkzEjmfuugEJvoDs7vJu63F_ghB3f0SYQOSorPuLloQniGJYTnfV_B2RrabDbKQb4w1Q5HxoHyZ_e1HNAoMn6bbZUqok29FFt1O1AlhvllW7P1MhpVBts0FPTG8U_UKJTy0k5VtnpjlsdV16S9jLzWNBexJoULjM-P0U__rRNTgpDxVdXXn7dDzMh0OJPs7zgRgd5LgZaNl8HpuSRnIwRs9BQNz8ygemZ088Pxv6P2f_dK41PgVjI3oct0eFUan0Rz2BmDm-9LcsRlr6KDNDfJDdMs-vWPDLzRME9AEjykIuKYUxhiGNQMmpirAUAoGNn6QgJrFuVr4hWJVov0OcnsJPCm3wH2IXEcfXrUb_tiCOhAXu06NDfRLjTEBznM3CjwOSGeJZWSunItt_9W13NkCEdWCcI6EPkdknlc7hUNrn5s5VLJfNRaz42DTRthYZRxYR12X63iZBY6WfvqcUD01I5UXutirDnWSbigC29y_JoFwXyqupGrTF_O-eYi0qJYwv0kbbrOHX3t5gG6gCFFyjqZSbjDYL92j1P0YTy52L6WpUFRjxb7M7I6AMtvqBKyY_E4HqKQHDChNMxTbaNDuwJE9ghC6Dij-ZiRODCCAn8oi-3E-p-7ssnP-1AsOsUyhDOkg6aH1Uc6hqvl870vzRNjWQY4frAu0ZU7GAwkwneK-56cupPOY8xm3Hu83bNiL3eCBF4tyusAs0sPPmnJvYc4ow-6UJ7lWKXrO1QNWmAE8-IMWL5bJeWIyQlVnmKoE=w1920-h878">
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

1. [Diego Alejandro Ramirez Vargas](https://www.linkedin.com/in/diegoalerami-vargas/)
2. [Fendy Lomanjaya](https://www.linkedin.com/in/fendy-lomanjaya)
3. [Sudarshan Kongkham](https://www.linkedin.com/in/shudarshan-kongkham-b86787196/)
4. [Abdullah Bahri](https://www.linkedin.com/in/abdullah-bahr/)
