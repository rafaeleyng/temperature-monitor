FROM node:8.7.0

ENV dir /opt/server

EXPOSE 3000

ADD . ${dir}

WORKDIR ${dir}

ENTRYPOINT ["yarn", "start"]
