pipeline {
    agent any

    stages {
        stage('Build') {
            agent {
                docker{
                    image 'node:22.13.0-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm test
                    ls -la
                '''
            }
        }
    }
}