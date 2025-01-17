pipeline {
    agent any
    tools{
        nodejs('22.13.0')
    }

    stages {
        stage('node') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
