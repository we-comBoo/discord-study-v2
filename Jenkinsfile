pipeline {
    agent any
    
    stages {
        
        stage('git scm update') {
            steps {
               git url: 'https://github.com/we-comBoo/discord-study-v2.git'
            }
        }

        statge("Install Dependencies"){
            steps{
                nodejs(nodeJSInstallationName:"discord-study-v2 git nodejs"){
                    sh "npm install"
                }
                
            }

        }
        
   		// stage...
   	}
}