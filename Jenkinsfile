def label = "nodejs-${UUID.randomUUID().toString()}"
podTemplate(label: label, containers: [
  containerTemplate(name: 'node', image: 'node:lts', command: 'cat', ttyEnabled: true),
  containerTemplate(name: 'docker', image: 'docker:latest', command: 'cat', ttyEnabled: true)
  // containerTemplate(name: 'kubectl', image: 'cnych/kubectl', command: 'cat', ttyEnabled: true)
], serviceAccount: 'jenkins', volumes: [
  hostPathVolume(mountPath: '/home/jenkins/.kube', hostPath: '/root/.kube'),
  hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock')
]) {
  node(label) {
    def myRepo = checkout scm
    def gitCommit = myRepo.GIT_COMMIT
    def gitBranch = myRepo.GIT_BRANCH

    stage('Build & Test') {
      container('node') {
        sh "npm i"
        sh "npm test"
      }
    }
    stage('Docker Build') {
      container('docker') {
        sh "docker version"
        sh "echo $CI_REGISTRY_PASSWORD | docker login -u $CI_REGISTRY_USER --password-stdin $CI_REGISTRY"
        sh "docker build -t ${CI_REGISTRY}/dockerhub2019/express-demo:${BUILD_NUMBER} ."
        sh "docker push ${CI_REGISTRY}/dockerhub2019/express-demo:${BUILD_NUMBER}"
      }
    }
    // stage('Kubectl') {
    //   container('kubectl') {
    //     sh "kubectl get pods"
    //   }
    // }
  }
}