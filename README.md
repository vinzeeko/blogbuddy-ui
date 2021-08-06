# BlogbuddyUi

A Blog Engine to help users blogs their contents and view other blogs and comment

## Local Setup

### Pre-Requisites
* Install Node.js (v8.x.x or v10.x.x) on your machine.
  * Here is the link to the downloads page => [https://nodejs.org/en/download/](https://nodejs.org/en/download/)

Run `npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).


## Application Features:

### Login 

- Auth Service is implemented with backend api and a datastore
- Uses similar features of Identity Service Providers like OKTA or oAuth, so switching to those system would involve minimal change
- url `http://localhost:4200/login`

<img width="1193" alt="Screen Shot 2021-08-06 at 3 28 40 PM" src="https://user-images.githubusercontent.com/87956524/128567707-510efcf9-ca02-4b97-bca0-0c9f05f5d6bf.png">


### Register for new user

- url `http://localhost:4200/register`

<img width="1179" alt="Screen Shot 2021-08-06 at 3 29 44 PM" src="https://user-images.githubusercontent.com/87956524/128567780-7b7a2b61-829b-4ee8-94db-879da1513c4d.png">


### Home

- once successful login, user will see a list of all the blogs by all the users in the system sorted by recent at the top
- url `http://localhost:4200/home`

<img width="1199" alt="Screen Shot 2021-08-06 at 3 30 39 PM" src="https://user-images.githubusercontent.com/87956524/128567972-2278aab1-7ee6-4b8c-9617-b823688b9e78.png">


### View a Blog

-- In Home page, from the list of blogs available, User can select a blog to view by clicking on it

![Screen Shot 2021-08-06 at 3 33 38 PM](https://user-images.githubusercontent.com/87956524/128568267-21036588-5bd6-4558-85d1-10b88a26432b.png)


#### Adding a comment on the blog

-- User can comment on the blog. Only logged in users are allowed to comment
-- if not logged in, the post button will be disabled

<img width="1657" alt="Screen Shot 2021-08-06 at 3 37 02 PM" src="https://user-images.githubusercontent.com/87956524/128568510-29e6af89-854f-41a6-b16d-474fe0d67e11.png">






## Hosted in S3

If the backend api server is setup and is running locally at 8080, you can use this S3 endpoint to view Hosted endpoint which is refers to localhost:8080 for backend calls

http://www.blogbuddy.com.s3-website.us-east-2.amazonaws.com/


(page reloads are not working with this direct s3 hosting so we would have to use the main endpoint and use Home or other tabs to navigate through different sections of the app)

