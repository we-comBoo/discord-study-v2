pipeline {
    agent any
    
    stages {
        
        stage('github-clone') {
            steps {
               git branch: 'main', credentialsId: 'jenkins-discord-bot', url: 'https://github.com/we-comBoo/discord-study-v2.git'
            }
        }

            stage("Install Dependencies"){
            steps{
                nodejs(nodeJSInstallationName:"discord-study-v2 git nodejs"){
                sh '''
                echo "Install Dependencies"
                npm i
                '''
                }
                
            }
            }

        
   		// stage...
   	}
}