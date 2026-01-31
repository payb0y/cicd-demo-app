pipeline {
  agent any

  environment {
    APP_NAME = "cicd-demo-app"
    IMAGE_NAME = "cicd-demo-app:latest"
    CONTAINER_NAME = "cicd-demo-app"
  }

  stages {

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        bat 'npm install'
        bat 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        bat "docker build -t %IMAGE_NAME% ."
      }
    }

    stage('Deploy Container') {
      steps {
        bat '''
        docker stop %CONTAINER_NAME% || exit 0
        docker rm %CONTAINER_NAME% || exit 0
        docker run -d ^
          --name %CONTAINER_NAME% ^
          -p 3000:3000 ^
          %IMAGE_NAME%
        '''
      }
    }
  }

  post {
    success {
      echo "✅ Deployment successful"
    }
    failure {
      echo "❌ Pipeline failed"
    }
  }
}
