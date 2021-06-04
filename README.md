# Quiz App

This project is about Question Game used [https://opentdb.com/api_config.php](https://opentdb.com/api_config.php). I use React with the addition of Typescript, StyleComponent.

# Screen Shot
![Alt text](doc/screenshot.png?raw=true "ScreenShot")

## How to use the project locally

```bash
- Download the project
- cd quiz-app-ts
- npm install
- npm run start
- Go to: http://localhost:3000
```

## Deploy your application in Docker

Lets build the docker image we just created. Make sure you are in the project root directory in your terminal and run the following command

```bash
$ docker build . -t react-docker
```

## Lets run container now

```bash
$ docker run -p 8000:80 react-docker
```

Now open http://localhost:8000 in your browser to check its running !

# Credits

## License

[MIT](https://choosealicense.com/licenses/mit/)
