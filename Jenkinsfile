pipeline {
   agent any
      environment {
         PATH='/usr/local/bin:/usr/bin:/bin'
      }
   stages {
      stage('NPM Setup') {
      steps {
         sh 'npm install'
      }
   }
   
  stage('Stage Web Build') {
      steps {
        sh 'npm run build --prod'
    }
  }
  }
  }
