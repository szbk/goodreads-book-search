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
            slackSend(
                channel: '#jenkins',
                tokenCredentialId: 'slack-token',
                message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' tamamlandı. Detaylar: ${env.BUILD_URL}",
                color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger'
            )
        }
        failure {
            slackSend(
                channel: '#jenkins',
                tokenCredentialId: 'slack-token',
                message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' başarısız oldu. Detaylar: ${env.BUILD_URL}",
                color: 'danger'
            )
        }
    }
}
