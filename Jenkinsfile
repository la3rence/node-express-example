def label = "node-${UUID.randomUUID().toString().substring(0, 7)}"
podTemplate(label: label,
        containers: [containerTemplate(name: 'node', image: 'node:lts', command: 'cat', ttyEnabled: true),
                     containerTemplate(name: 'docker', image: 'docker:latest', command: 'cat', ttyEnabled: true)
                     // containerTemplate(name: 'kubectl', image: 'cnych/kubectl', command: 'cat', ttyEnabled: true)
        ], serviceAccount: 'jenkins', volumes: [
        // hostPathVolume(mountPath: '/home/jenkins/.kube', hostPath: '/root/.kube'),
        hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')]) {
    node(label) {
        def repo = checkout scm
        def gitCommit = repo.GIT_COMMIT
        def gitBranch = repo.GIT_BRANCH
        echo gitBranch
        def IMAGE_NAME = env.JOB_BASE_NAME
        def commitHASH = gitCommit.substring(0, 7)
        echo commitHASH

        stage('Test') {
            container('node') {
                sh """
                npm ci --ignore-scripts
                npm run test:coverage
                """
                publishHTML target: [allowMissing         : false,
                                     alwaysLinkToLastBuild: false,
                                     keepAll              : true,
                                     reportDir            : 'coverage/',
                                     reportFiles          : 'index.xml',
                                     reportName           : 'Coverage']
            }
        }

        post {
            always {
                junit 'test-results.xml'
            }
        } 

        stage('Build') {
            container('docker') {
                sh """
                docker version
                echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
                docker build -t ${CI_REGISTRY}/${CI_REGISTRY_NAMESPACE}/${IMAGE_NAME}:${commitHASH} .
                docker push ${CI_REGISTRY}/${CI_REGISTRY_NAMESPACE}/${IMAGE_NAME}:${commitHASH}
                docker rmi ${CI_REGISTRY}/${CI_REGISTRY_NAMESPACE}/${IMAGE_NAME}:${commitHASH}
                """
            }
        }
        // stage('Deploy') {
        //   container('kubectl') {
        //     sh "kubectl get pods"
        //   }
        // }
    }
}