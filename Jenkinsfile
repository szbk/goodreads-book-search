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
                    echo "List Directory"
                    ls -la
                    echo "Remove reports.."
                    rm -rf reports
                    echo "List Directory"
                    ls -la
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                echo "Install dependencies.."
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                echo "Run Test!"
                sh 'npm test'
            }
        }
        stage('Publish Test Results') {
            steps {
                junit 'reports/test-results.xml'
            }
        }
        stage('Read XML') {
            steps {
                script {
                    def myXml = readYaml file: 'reports/test-results.xml'
                    echo "XML content: ${myXml}"
                }
            }
        }
    }
    post {
        always {
            script {
                // Test sonuçlarını XML formatında oku
                def testResultsXml = readXML file: 'reports/test-results.xml'
                def tests = testResultsXml.testsuite[1].testcase // İlgili testsuite içinde bulunan testcase'leri al

                // Mesajı formatla
                def formattedMessage = "🚀 *Test Sonuçları:*\n"
                tests.each { test ->
                    def testName = test.@name
                    def testTime = test.@time
                    def emoji = testName.contains(':fire:') ? '🔥' : (testName.contains(':rocket:') ? '🚀' : (testName.contains(':alarm_clock:') ? '⏰' : '📋'))

                    formattedMessage += "${emoji} *${testName}* (${testTime}ms)\n"
                }

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
