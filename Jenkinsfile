pipeline {
    agent any
    tools {
        nodejs('22.13.0')
    }
    triggers {
        cron('H */6 * * *') // Her 6 saatte bir çalıştır
    }
    stages {
        stage('Make result directory') {
            steps {
                sh '''
                    mkdir -p result
                    ls -la
                '''
            }
        }
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
    post {
        always {
            slackSend channel: 'jenkins-notification',
            message: "Find Status of Pipeline:- ${currentBuild.currentResult} ${env.JOB_NAME} ${env.BUILD_NUMBER} ${BUILD_URL}"
        }
    }
}