pipeline {
    agent any
    tools {
        nodejs '22.13.0'
    }
    triggers {
        cron('H */6 * * *') // Her 6 saatte bir çalıştır
    }
    stages {
        stage('Make result directory') {
            steps {
                script {
                    // Bildirim gönderme - işlem başlatıldığında
                    slackSend(channel: '#genel', message: 'Build started: Making result directory...')
                }
                sh '''
                    mkdir -p result
                    ls -la
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Bildirim gönderme - bağımlılıklar kuruluyor
                    slackSend(channel: '#genel', message: 'Installing dependencies...')
                }
                sh 'npm install'
            }
        }
        stage('Run Tests') {
            steps {
                script {
                    // Bildirim gönderme - testler çalıştırılıyor
                    slackSend(channel: '#genel', message: 'Running tests...')
                }
                sh 'npm test'
            }
        }
        stage('Publish Test Results') {
            steps {
                script {
                    // Test sonuçlarını gönderme
                    slackSend(channel: '#genel', message: 'Publishing test results...')
                }
                junit 'reports/test-results.xml'
            }
        }
    }
    post {
        success {
            script {
                // Başarı bildirimi
                slackSend(channel: '#genel', message: 'Build and tests completed successfully!', color: 'good')
            }
        }
        failure {
            script {
                // Başarısızlık bildirimi
                slackSend(channel: '#genel', message: 'Build or tests failed!', color: 'danger')
            }
        }
    }
}
