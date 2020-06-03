pipeline {
    agent { dockerfile true }
    ${workspace}
    stages {
        stage('build') {
            steps {
                sh 'ng build'
            }
        }
    }
}
