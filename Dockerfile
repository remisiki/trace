FROM node:21
WORKDIR /client
COPY ./client/src ./src
COPY ./client/public ./public
COPY ./client/package.json ./
COPY ./client/tsconfig.json ./
RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install
RUN yarn build

FROM --platform=linux/arm64 python:3.11
WORKDIR /server
COPY ./server/requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
COPY ./server/src ./src
COPY ./server/main.py ./main.py
COPY --from=0 /client/build ./build

CMD ["python3", "-m", "uvicorn", "main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000"]
