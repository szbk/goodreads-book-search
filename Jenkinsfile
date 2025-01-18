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
        stage('Check for package.json changes') {
            steps {
                echo "Check for package.json changes"
                script {
                    // Check if package.json has changed
                    def hasChanges = sh(script: 'git diff --name-only HEAD~1 | grep "package.json"', returnStatus: true) == 0
                    if (hasChanges) {
                        echo "package.json changed, running npm install"
                        currentBuild.result = 'SUCCESS'
                        sh 'npm install'
                    } else {
                        echo "package.json not changed, skipping npm install"
                        currentBuild.result = 'SUCCESS'
                    }
                }
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
                message: """
                \n 🧠 Goodreads Book Search Integration Test:
                    \n - Is the ISBN '9944824453' 🔥 
                    \n - Is the book title 'Dövmeli Adam' 🚀 
                    \n - Is the book's publication date '1 September 2008' ⏰ 
                    \n - Is the page count '640' 📋
								\n Build Zamanı: ${env.BUILD_TIMESTAMP}
								\n Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' tamamlandı.
								\n Detaylar: ${env.BUILD_URL}
                """,
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