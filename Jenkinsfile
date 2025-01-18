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
                junit 'reports/test-results.xml'
            }
        }
    }
    post {
        always {
            slackSend(
                channel: '#jenkins',
                tokenCredentialId: 'slack-token',
                message: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' tamamlandı. Detaylar:  
                ✔ Is the ISBN '9944824453' 🔥
                ✔ Is the book title 'Dövmeli Adam' 🚀
                ✔ Is the book's publication date '1 September 2008' ⏰
                ✔ Is the page count '640' 📋 ",
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
