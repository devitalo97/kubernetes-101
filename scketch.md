o kubernetes decende do projeto interno do google chamado borg.

o kubernetes gerencia e garante a disponibilidade dos pods e permite escalabilidade com a criação de pods.

o nosso contato com o kubernetes é feito via api e acessamos a api com a cli kubectl
o kubernetes é baseado em estados. a gente tem diversos objetos e cada objeto tem um estado, baseado no estado do objeto, o kubernetes toma determinadas uma ação
o kubernetes trabalha com clusters:
kube-master: controla todos os processos e usa 1. Kube-apiserver 2. kube-controller-manager 3. kube-scheduler
outros nós: 1. kubelet 2. kubeproxy

o pod é uma unidade que contém os containers provisionados. o pod representa os processos rodando no cluster. normalmente o pod roda apenas um container. o pod roda o container da nossa aplicação

o deployment tem o objeto de provisionar os pods. o deployment saber quantas réplicas deve provisionar do pod. A ideia é: "voce escolha a quantidade de pods, os pods sobem nos nós, se nao tiver recurso em algum dos nós o kubernetes busca recurso em outro nó, caso não exista mais nenhum nó disponivel, o pod fica pendente até outro nó esta disponivel para subir esse pod.

kind é uma ferramenta para rodar o kubernetes localmente:
"kind é uma ferramenta para executar clusters locais do Kubernetes usando “nós” de contêiner Docker.
kind foi projetado principalmente para testar o próprio Kubernetes, mas pode ser usado para desenvolvimento local ou CI."

o arquivo k8s/kind.yml é a configuração de um objeto do tipo Cluster com um nó master e 3 nó workers

o diretório "http-server" é uma aplicação básica para usarmos de teste com o estudo do kubernetes. "http-server" é um servidor web simples.

o arquivo k8s/pod.yml é a configuração de um objeto do tipo Pod que executa a imagem do servidor "http-server". Apenas colocando o pod para rodar em um nó, nós nao conseguimos ter acesso a ele. para isso é necessário um mecanismo de rede para permmitir o acesso ao pod. com esse comando a seguir ("kubeclt port-forward pod/http-server 80:3000") conseguimos criar um redirecinamento de porta sem precisar configurar nada de network no kubernetes.

o arquivo k8s/replicaset.yml é a configuração de um objeto do tipo Replicaset que permite levantar uma certa quantidade de replicas para um pod por meio de um template. boa parte do arquivo k8s/pod.yml é reaproveitado na prop tempalte do arquivo k8s/replicaset.yml. O karma do replicaset é que caso a imagem que esta sendo usada na spec do template seja alterada e aplicada novamente, ele nao é capaz de detectar essa alteração mesmo recebendo a resposta (resposta: replicaset.apps/httpserver-replicaset configured (comando: kubectl apply -f k8s/replicaset.yml)), sendo necessário derrubar o pod para que ao ser criado novamente pelo replicaset, seja criado com a nova imagem atualizada. Resumindo, se a configuração do objeto replica set for alterar apos sua inicialização, o pod replicado devera ser deletado para que o novo tenha a nova configuração.

hierarquia no kubernetes
Deployment => ReplicaSet => Pod

o arquivo k8s/replicaset.yml é a configuração de um objeto do tipo Deployment. A configuração é a mesma e esse objeto consegue entender que a imagem presente no template para gerar os pods replicados foi alterada e mata os pods existentes e recria outros com a nova configuração.

o kubernetes permite mecanismos de rollout com o comando abaixo

kubectl rollout undo deployment <nome do deployment>
kubectl rollout undo deployment <nome do deployment> --to-revision=<numero da revisão>(retornando para uma revisão específica)

para ter acesso às revisões use o comando:
kubectl rollout history deployment <nome do deployment>

o arquivo k8s/cluster-ip-service.yml é a configuração de um objeto do tipo Service (porta de entrada para nossa aplicação). O service redireciona a requisção para algum dos pods. O service age tambem como um loadBalencer.

existem 4 tipos de service
ClusterIP cria um ip interno do "servidor kubernetes". O que tiver acesso a esse ip usará o service criado para atingir alguns dos pod. (o service escolhe o pod). targetPort é a porta do container que está no pod e port é a porta do service.

o arquivo k8s/node-port-service.yml é a configuração de um objeto do tipo Service e o funcionamento dele é o seguinte: a porta configurada no serviço será replicada em todos os nós do cluster e o que tiver acesso ao ip das maquinas de onde esses nós estão rodando irá conseguir acessá-los. É arcaico e usado mais para demonstração, poc. a porta criada deve ser entre o range de >30000 e <32767

o arquivo k8s/load-balancer-service.yml é a configuração de um objeto do tipo Service e o funcionamento dele é o seguinte: ele cria um ip externo para que o service seja acessado e a partir dai o service direcionar a requisição para algum dos pods. caso esse service seja aplicado em um cluster que está rodando em uma nuvem, o ip externo será gerado, mas quando aplicado em uma maquina local, o ip externo nao será gerado.
