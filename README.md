<div align="center">
  <h1>Employee Service</h1>
  <p>
    Here I have used typescript, express, postgres, typeORM 
  </p>
  <p>Submitted By: <a href="https://github.com/IstiyakRiyad" target="_blank">Md. Istiyak Hossain</a> </p>
</div>

## Prerequisite
For manually build the server, install nodejs & postgresql locally. 


### Clone The Repository:

``` bash
# Download repository:
git clone https://github.com/IstiyakRiyad/employee-service.git

# Go to parent directory:
cd employee-service

# setup .env (please setup the database name)
cp .env.sample .env
```
Create a database manually and put the database name, password in `.env`


### Menual Build Process:
``` bash
# Install dependencies:
npm i

# Generate public private key for authentication
npm run genKeyPair

# Migration up
npm run migration:run

# Setup the admin user
npm run setup

# Seed some data to the database
npm run seeds

# Build the server
npm run build

# Start the server
npm start
```

<b>Testing:</b> <br />
I have added some unit test. 
``` bash
npm test
```

## API Documentations:
* [Insomnia Docs](https://github.com/IstiyakRiyad/employee-service/blob/main/docs/insomnia/Insomnia_apis.json)

___
## Solution for Employee tree
I've created an employee table with a One-to-Many relationship among employees, involving a self-join. However, when querying the table, it retrieves all values instead of joining rows. This is because, with the `position_id`, subsequent values are always larger, making database-level joins unnecessary. As the join's depth is unknown, Making tree in server level makes more sence. It also improve the performance.

## Solution for Protected route
I've use the json web token to authenticate a user and let the user access the employee

## Scale the server to thousants of users
To scale the server to thousand users. We can replicate the server into multiple instances. Then pass all the request through a load balancer like `Nginx`. We can host it on AWS EC2. We can choose the AWS RDS database. This will be enough to handle thousand user.

## Logging & Monitoring
For logging and monitoring I have used `loggy` to send all the logs to a different centerlized server. Here i use `loggy` server. This will be helpful when we will have multiple replica of our server.

## Best practices for deployment:
For deployment we can use docker and kubernetes. We can use `CI/CD` to test and deploy our application continously. 
