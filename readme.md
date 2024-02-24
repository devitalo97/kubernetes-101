# Documentação do Kubernetes

## Introdução

- O **Kubernetes** é uma plataforma de orquestração de contêineres que teve origem no projeto interno do Google chamado **Borg**. Ele oferece uma solução robusta para gerenciar aplicativos contêinerizados em ambientes distribuídos. "É um produto Open Source utilizado para automatizar a implantação, o dimensionamento e o gerenciamento de aplicatios em container".

- No kubernetes, tudo é baseado em estado. Temos diversos objetos, cada objeto com um estado e baseado no estado desse objeto o kubernetes irá tomar algumas ações.

- O kubernetes é disponibilizado através de um conjuto de APIs. Normalmente acessamos a API usando a CLI: kubectl.

- A configuração desses objetos e estados é declarativa, similar ao Docker.

- O kubernetes trabalha através clusters (cluster é um conjunto de máquinas, que juntas realizam diversas tarefas)

## Conceitos Básicos

### Clusters

- Um **Cluster Kubernetes** consiste em um conjunto de nós que executam os serviços necessários para gerenciar os contêineres.
- O **kube-master** controla os processos principais e utiliza **kube-apiserver**, **kube-controller-manager** e **kube-scheduler**.
- Outros nós incluem **kubelet** e **kubeproxy** para gerenciar os contêineres.

### Pods

- Um **Pod** é a menor unidade no Kubernetes e representa um ou mais contêineres que compartilham recursos.
- Geralmente, um Pod roda um único contêiner, mas pode incluir mais de um em casos específicos.
- Um **Pod** pode ser comparado a uma maquina virtual dentro do kubernetes e o nosso container roda dentro do kubernetes.

#### Configuração básica de um pod

```yml
apiVersion: v1
kind: Pod
metadata:
  name: "pod-name"
  labels:
    app: "pod-app"
spec:
  containers:
    - name: "pod-container"
      image: "<user>/<image>"
```

1. Para aplicar esse arquivo de configuração no cluster, use o comando abaixo:

```bash
kubectl apply -f kind/pod.yml
```

2. Para listar os pods de um cluster, use o comando abaixo:

```bash
kubectl get po
```

3. Para ver os logs desse pod, use o comando abaixo:

```bash
kubectl logs <nome do pod>
```

4. Para tornar seu pode acessível com o redirecionamento de porta, use o comando abaixo:

```bash
kubectl port-forward pod/<nome do pod> 3000:8000
```

### ReplicaSets

- **ReplicaSets** é reponsável por gerenciar o pod. Caso um pod "caia", o replicaset faz outro pod "se levantar" no lugar. São utilizados também por Deployments para garantir um número específico de réplicas de um Pod.
- Podem ser escalados horizontalmente para lidar com aumento ou diminuição de demanda.

### Deployments

- **Deployments** são objetos que provisionam e gerenciam Pods, permitindo a definição do número de réplicas a serem provisionadas.
- Garante alta disponibilidade e escalabilidade.

### Services

- **Services** são objetos que garantem uma política de visibilidade a um conjunto de pods. Em outras palavras, o service é a porta de entrada para nossa aplicação. A nossa aplicação rodando no kubernetes não significa que ela é acessível, para que isso aconteça é necessário um **service**. O **service** atua como um load balancer.

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
