pipeline {
  agent {
    docker {
      image 'node:20-alpine'
      args '-v /var/run/docker.sock:/var/run/docker.sock'
    }
  }

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
        sh 'npm install'
        sh 'npm test'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Deploy Container') {
      steps {
        sh '''
          docker stop $CONTAINER_NAME || true
          docker rm $CONTAINER_NAME || true
          docker run -d \
            --name $CONTAINER_NAME \
            -p 3000:3000 \
            $IMAGE_NAME
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Deployment successful'
    }
    failure {
      echo '❌ Pipeline failed'
    }
  }
}
