pipeline {
    agent any
    tools {
        nodejs('22.13.0')
    }
    triggers {
        cron('H */6 * * *') // Her 6 saatte bir çalıştır
    }
    stages {
        stage('List directory') {
            steps {
                sh '''
                    ls -la
                    rm -rf reports
                    rm -rf result
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
            script {
                // Test sonuçlarını oku
                def testResults = readFile('reports/test-results.xml')
                def formattedMessage = """
🚀 *Test Sonuçları*:
${testResults}
                """

                // Slack'e mesaj gönder
                slackSend(
                    channel: '#jenkins',
                    tokenCredentialId: 'slack-token',
                    message: formattedMessage,
                    color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger'
                )
            }
        }
    }
}
