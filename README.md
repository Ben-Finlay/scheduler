# Interview Scheduler

Interview scheduler allows a user to scheduler new interviews during the weekdays, by entering student information, and selecting an available interviewer.
It supports creation, editing, and deleting of interview blocks.

* Makes use of HTML, React, and Axios.

## Final Product

This is the basic layout.
!["Layout"](https://github.com/Ben-Finlay/scheduler/blob/master/docs/Basic%20Layout.png)

This shows the create function.
!["Create"](https://github.com/Ben-Finlay/scheduler/blob/master/docs/Create.png)

This shows a delete confirmation.
!["Delete"](https://github.com/Ben-Finlay/scheduler/blob/master/docs/Delete.png)


## Setup

Install dependencies with `npm install`.

The database server is defaulted to localhost:8001, and will be required for persistant data.

Please see: 
https://github.com/lighthouse-labs/scheduler-api

For information about setting up a database server.

## Running Webpack Development Server

```sh
npm start
```