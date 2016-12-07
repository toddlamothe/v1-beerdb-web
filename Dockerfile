FROM        node
MAINTAINER  Todd LaMothe
EXPOSE      8080
COPY        . /var/www
WORKDIR     /var/www
RUN         npm install
ENTRYPOINT ["npm", "start"]
