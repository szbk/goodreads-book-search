pipeline {
    agent any
    tools{
        nodejs('22.13.0')
    }

    stages {
        stage('test') {
            steps {
                sh '''
                    npm install
                    npm test
                '''
            }
        }
    }
}
