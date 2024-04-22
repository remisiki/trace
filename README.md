# TRACE

Trends in Academic Exploration Analysis Toolkit

## Overview

This tool aims at providing a one-stop solution for scholars to explore scientific research topics trend with user interface and visualizations. Check our deployed web page [here](https://mirai.remisiki.com/trace/).

## Installation

You can install this tool for free on the machine of your choice. To host the site, first get a free api key from [News API](https://newsapi.org/) and put the key in the environment variable `NEWS_API_KEY`.

### Docker

We only support installation from docker images on `linux/arm64` cpu architecture. If you want to deploy on other platforms, please refer to manual build.

To install using docker, pull the latest image from docker hub:

```bash
docker pull akiyiwen:trace/latest
```

And start the server:

```bash
docker run -d --name trace -p 8000:8000 -e NEWS_API_KEY=${your api key} akiyiwen/trace:latest
```

Alternatively, you can save the api key in `.env` file and run:

```bash
docker run -d --name trace -p 8000:8000 --env-file .env akiyiwen/trace:latest
```

To specify the application host port, change the parameter after `-p` to be `${your port}:8000`. Do not change the second port value. Then webpage is default hosted at `/trace`, so you can go to `http://localhost:8000/trace` to view the app. You can also host the docker container behind another server and visit through the public url.

### Manual build

Clone the source code from GitHub:

```bash
git clone git@github.com:remisiki/trace.git
```

If you have docker installed, you can change the platform option in Dockerfile and run:

```bash
docker buildx build -t akiyiwen/trace:latest .
```

Then you should be able to run the docker image. If docker is not installed, you can manually build backend and frontend separately.

To build the frontend, make sure `npm` is installed, then

```bash
cd client
npm install
npm run build
# Or use yarn (recommended)
# yarn install
# yarn build
cd ..
mv client/build server
```

To build the backend, make sure `pip3` and `python3` are installed, then

```bash
cd server
pip3 install --no-cache-dir --upgrade -r ./requirements.txt
```

After installation of both frontend and backend is installed, run the server:

```bash
cd server
python3 -m uvicorn main:app --proxy-headers --host 0.0.0.0 --port 8000
```

## Credits

- [arxiv](https://arxiv.org/)
- [Google Scholar](https://scholar.google.com/)
- [News API](https://newsapi.org/)

## License

MIT
