pipeline {
    agent any
    
    stages {
        
        stage('github-clone') {
            steps {
               git branch: 'main', credentialsId: 'jenkins-discord-bot', url: 'https://github.com/we-comBoo/discord-study-v2.git'
            }
        }
        stage("go to git repo"){
            steps{
                sh "cd discord-study-v2"
            }
        }

        statge("Install Dependencies"){
            steps{
                sh "npm i"
            }

        }
        
   		// stage...
   	}
}