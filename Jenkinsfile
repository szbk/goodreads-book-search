pipeline {
    agent any
    environment {
        BUILD_TIMESTAMP = new java.text.SimpleDateFormat('yyyy-MM-dd HH:mm:ss').format(new java.util.Date())
    }
    
    tools {
        nodejs('22.13.0')
    }
    triggers {
        cron('H */6 * * *') // Her 6 saatte bir çalıştır
    }
    stages {
        stage('List directory - Before removing reports') {
            steps {
                echo "List directory - Before removing reports"
                sh 'ls -la'
            }
        }
        stage('Remove reports') {
            steps {
                echo "Remove reports files"
                sh 'rm -rf reports'
            }
        }
        stage('List directory - After removing reports') {
            steps {
                echo "List directory - After removing reports"
                sh 'ls -la'
            }
        }
        stage('Install npm package') {
            steps {
                echo "Install npm package"
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo "Runing Test.."
                sh 'npm test'
            }
        }
        stage('Publish Test Results') {
            steps {
                echo "Publish Test Results"
                junit 'reports/test-results.xml'
                echo "Send test result slack 🚚"
            }
        }
    }
    post {
        always {
            slackSend(
                channel: '#jenkins',
                tokenCredentialId: 'slack-token',
                message: "Job 📦 '${env.JOB_NAME} [${env.BUILD_NUMBER}]' başarısız oldu. Detaylar: ${env.BUILD_URL}",
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