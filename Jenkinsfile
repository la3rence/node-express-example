def label = "nodejs-${UUID.randomUUID().toString()}"
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
        def projectName = 'express-demo'
        def registryNamespace = 'dockerhub2019'
        def commitHASH = gitCommit.substring(0, 7)
        echo commitHASH

        stage('Test') {
            container('node') {
                sh """
                npm ci
                npm test
                """
                // publish html
                publishHTML target: [
                    allowMissing: false,
                    alwaysLinkToLastBuild: false,
                    keepAll: true,
                    reportDir: 'coverage',
                    reportFiles: 'index.html',
                    reportName: 'Coverage Report'
                ]
            }
        }
        stage('Build') {
            container('docker') {
                sh """
                docker version
                echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY
                docker build -t ${CI_REGISTRY}/${registryNamespace}/${projectName}:${commitHASH} .
                docker push ${CI_REGISTRY}/${registryNamespace}/${projectName}:${commitHASH}
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