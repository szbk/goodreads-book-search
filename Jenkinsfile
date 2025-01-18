pipeline {
    agent any
    tools {
        nodejs('22.13.0')
    }
    triggers {
        cron('H */6 * * *') // Her 6 saatte bir çalıştır
    }
    stages { 
        stage('List directory - Before removing reports') {
            steps {
                sh '''
                echo "List directory - Before removing reports"
                ls -la
                '''
            }
        }
        stage('Remove reports') {
            steps {
                sh 'rm -rf reports'
            }
        }
        stage('List directory - After removing reports') {
            steps {
                sh 'ls -la'
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
