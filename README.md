## Junior Developer Job Board
Full Stack application that lists jobs that are for junior developers. 
- Application server is built on NodeJS using Express to create API.
- Github job API is used to GET list of jobs in JSON format.
- Filter algorithm is used to filter out jobs that are not junior level from job title, job description.
- Cron is used to schedule 1 hour interval GET requests of API and store filtered jobs in Redis cache.
- React and Material-UI is used to build the frontend of the application.

### App demo
