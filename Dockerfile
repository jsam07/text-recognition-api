FROM alpine

ENV HOME=/home/app

RUN apk update && apk add --update htop nodejs-current npm && apk update

ENV PYTHONUNBUFFERED=1

RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

RUN python3 -m ensurepip

RUN pip3 install --no-cache --upgrade pip setuptools

RUN node --version

COPY package.json package-lock.json $HOME/node_docker/

COPY . $HOME/node_docker/

WORKDIR $HOME/node_docker/

RUN npm install --progress=true 

COPY . $HOME/node_docker/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
