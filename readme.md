# Documentação do Kubernetes

## Introdução

O **Kubernetes** é uma plataforma de orquestração de contêineres que teve origem no projeto interno do Google chamado **Borg**. Ele oferece uma solução robusta para gerenciar e escalonar aplicativos contêinerizados em ambientes distribuídos.

## Conceitos Básicos

### Pods

- Um **Pod** é a menor unidade no Kubernetes e representa um ou mais contêineres que compartilham recursos.
- Geralmente, um Pod roda um único contêiner, mas pode incluir mais em casos específicos.

### Clusters

- Um **Cluster Kubernetes** consiste em um conjunto de nós que executam os serviços necessários para gerenciar os contêineres.
- O **kube-master** controla os processos principais e utiliza **kube-apiserver**, **kube-controller-manager** e **kube-scheduler**.
- Outros nós incluem **kubelet** e **kubeproxy** para gerenciar os contêineres.

### Deployments

- **Deployments** são objetos que gerenciam Pods, permitindo a definição do número de réplicas a serem provisionadas.
- Garante alta disponibilidade e escalabilidade.

### ReplicaSets

- **ReplicaSets** são utilizados por Deployments para garantir um número específico de réplicas de um Pod.
- Podem ser escalados horizontalmente para lidar com aumento ou diminuição de demanda.

## Trabalhando com Kubernetes

### kubectl

- O `kubectl` é a interface de linha de comando para interação com clusters Kubernetes.
- Utilizado para enviar comandos e consultar o estado do cluster.

### kind (Kubernetes IN Docker)

- Ferramenta para executar clusters locais do Kubernetes usando contêineres Docker.
- Projetada para testar o próprio Kubernetes, desenvolvimento local ou integração contínua.

## Configuração do Ambiente

### Arquivo kind.yml

- Configuração de um objeto Cluster com um nó master e três nós workers para uso local.

## Aplicações de Teste

### Diretório "http-server"

- Aplicação básica usada para testes no estudo do Kubernetes.
- Um servidor web simples.

### Arquivo pod.yml

- Configuração de um objeto Pod que executa a imagem do servidor "http-server".
- Necessário uso de port-forwarding para acesso ao Pod (kubeclt port-forward pod/http-server 80:3000).

### Arquivo replicaset.yml

- Configuração de um objeto ReplicaSet que replica Pods com base em um template.
- Limitações na detecção de alterações na imagem do Pod, exigindo a derrubada manual para atualizações.

### Arquivo deployment.yml

- Configuração semelhante ao ReplicaSet, mas com capacidade de detectar alterações na imagem e atualizar os Pods automaticamente.
- Suporta rollouts e histórico de revisões.

### Arquivo cluster-ip-service.yml

- Configuração de um objeto Service para criar um IP interno e direcionar tráfego para os Pods.

### Arquivo node-port-service.yml

- Configuração de um Service que replica a porta em todos os nós do cluster para acesso externo.

### Arquivo load-balancer-service.yml

- Configuração de um Service que cria um IP externo para acessar os Pods.

## Considerações Finais

- O Kubernetes oferece uma ampla variedade de recursos para gerenciar contêineres de forma eficiente.
- Escolha o tipo de serviço e objeto adequado às necessidades específicas da aplicação.
- A interface de linha de comando kubectl é uma ferramenta poderosa para interagir com o cluster Kubernetes.
