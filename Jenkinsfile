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
        stage('Publish Test Results') {
            steps {
                script {
                    def file = readFile "reports/test-results.xml"
                    def pomXml = new XmlSlurper().parseText("${file}".toString())
                    echo "XML Content: ${pomXml}"
                    slackSend(
                        channel: '#jenkins',
                        tokenCredentialId: 'slack-token',
                        message: "Selam",
                        color: success ? 'good' : 'danger'
                    )
                }
            }
        }
    }
}
