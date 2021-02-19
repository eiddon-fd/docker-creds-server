from node:latest

ADD . .
RUN npm install

ENTRYPOINT /usr/local/bin/node index.js
