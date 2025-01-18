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
                script {
                    def testResults = readXML file: 'reports/test-results.xml'
                    def testCases = testResults.testsuite.testcase
                    def testCount = testCases.size()
                    def failures = testResults.testsuite.failures.toInteger()
                    def success = (failures == 0)

                    def slackMessage = "Test Results: ${testCount} tests, ${failures} failures"
                    if (success) {
                        slackMessage += "\nAll tests passed! 🎉"
                    } else {
                        slackMessage += "\nSome tests failed. 😞"
                    }

                    slackSend(
                        channel: '#jenkins',
                        tokenCredentialId: 'slack-token',
                        message: slackMessage,
                        color: success ? 'good' : 'danger'
                    )
                }
            }
        }
    }
}
