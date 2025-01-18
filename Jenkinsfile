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
                sh 'ls -la'
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
                junit 'reports/test-results.xml'
            }
        }
        stage('Read and Parse XML') {
            steps {
                script {
                    // XML verisini okuma
                    def xmlContent = sh(script: 'cat reports/test-results.xml', returnStdout: true).trim()

                    // XML verisini parse etme
                    def xml = new XmlSlurper().parseText(xmlContent)

                    // Test suite adını almak
                    def testSuiteName = xml.testsuites.testsuite[0].@name

                    // Slack mesajını başlatma
                    def slackMessage = "*🧠 ${testSuiteName}*\n"

                    // Test case'leri işleme
                    xml.testsuites.testsuite[0].testcase.each { testCase ->
                        def testName = testCase.@name
                        def testTime = testCase.@time
                        def emoji = getEmojiForTest(testName) // Test ismine göre emoji belirleme

                        // Slack mesajına ekleme
                        slackMessage += "    ✔ ${testName} ${emoji} (${testTime} ms)\n"
                    }

                    // Slack mesajını yazdırma
                    echo slackMessage

                    // Slack mesajını gönderme
                    slackSend(
                        channel: '#jenkins',
                        tokenCredentialId: 'slack-token',
                        message: slackMessage,
                        color: currentBuild.result == 'SUCCESS' ? 'good' : 'danger'
                    )
                }
            }
        }
    }
}

// Test ismi üzerinden emoji seçme
def getEmojiForTest(testName) {
    if (testName.contains("ISBN")) return "🔥"
    if (testName.contains("title")) return "🚀"
    if (testName.contains("publication date")) return "⏰"
    if (testName.contains("page count")) return "📋"
    return "✅" // Varsayılan emoji
}
