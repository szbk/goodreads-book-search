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
                    // XML dosyasını okuma
                    def xmlFile = readFile('reports/test-results.xml')
                    def xml = new XmlSlurper().parseText(xmlFile)

                    // Test suite adını almak
                    def testSuiteName = xml.testsuites.testsuite[1].@name

                    // Test case'leri işleme
                    def slackMessage = "*${testSuiteName}*"
                    xml.testsuites.testsuite[1].testcase.each { testCase ->
                        def testName = testCase.@name
                        def testTime = testCase.@time
                        slackMessage += "\n    ✔ ${testName} (${testTime}ms)"
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
