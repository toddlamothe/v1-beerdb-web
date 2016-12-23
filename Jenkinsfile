#!groovy

node {
    stage('Containerize and Build') {
        bat 'docker build -t toddlamothe/beerdb-web C:/code/beerdb_web/'
    }
    stage('Test') {
        /* .. snip .. */
    }
    stage('Deploy') {
        // Attempt to stop any instances of the running container before building.
        try {
            // bat 'docker rm $(docker stop $(docker ps -a -q --filter ancestor=toddlamothe/beerdb-web --format="{{.ID}}"))'
        }
        catch(err) {
            echo err
        }

        bat 'docker run -d -p 8888:80 toddlamothe/beerdb-web'
    }
}
