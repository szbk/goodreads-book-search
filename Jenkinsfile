pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh '''
                    docker run --rm -v $(pwd):/workspace -w /workspace node:22.13.0-alpine sh -c "
                        ls -la
                        node --version
                        npm --version
                        npm ci
                        npm test
                        ls -la
                    "
                '''
            }
        }
    }
}
