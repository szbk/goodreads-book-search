pipeline {
    agent any
    tools {
        nodejs('22.13.0')
    }
    triggers {
        cron('H */2 * * *') // 2 saatte bir çalıştır
    }
    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Publish Test Results') {
            steps {
                junit 'reports/test-results.xml'
            }
        }
    }
}