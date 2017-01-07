#!groovy
/*
The web project is built on the build server, then the dist directory is uploaded to the container
This is different than the API project, which is first uploaded to the image and compiled directly in the image.
*/

node {
    stage('Build') {
        echo 'Stopping running web containers...'
        dir('c:\\code\\beerdb-orchestration\\') {
            bat 'docker-compose stop web'
        }

        dir('c:\\code\\beerdb-web\\') {
            bat 'node node_modules\\gulp\\bin\\gulp.js clean'
            bat 'node node_modules\\gulp\\bin\\gulp.js build'
        }        
    }
    stage('Test') {
        // bat 'gulp test'
    }
    stage('Containerize') {
        dir('c:\\code\\beerdb-web\\') {
            bat 'docker build -t toddlamothe/beerdb-web -f Dockerfile.dist .'
        }                
    }
    stage('Deploy') {
        // Attempt to stop any instances of the running container before building.
        try {
            // bat 'docker rm $(docker stop $(docker ps -a -q --filter ancestor=toddlamothe/beerdb-web --format="{{.ID}}"))'
        }   
        catch(err) {
            echo err
        }

        // bat 'docker run -d -p 8002:80 toddlamothe/beerdb-web'
        echo 'Starting new web container...'
        dir('c:\\code\beerdb-orchestration\\') {
            bat 'docker-compose start web'
        }
    }
}
