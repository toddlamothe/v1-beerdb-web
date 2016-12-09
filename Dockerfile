FROM        node
MAINTAINER  Todd LaMothe
COPY        . /var/www
WORKDIR     /var/www
RUN         npm install
EXPOSE      8888
ENTRYPOINT ["npm", "start"]
