# LEVANTAMENTO DE REQUISITOS - Hostel em Santa Teresa

## Características dos quartos e vagas:
- Total de: 230 camas
- Total de: 20 quartos
- Quartos de 4 camas + banheiro
- Quartos de 8 camas
- Quartos de 12 camas + banheiro
- Existe lavanderia comum
- Existe área comum com TV, churrasqueira, cozinha com microondas, geladeira e jardim
- Existe portaria 24h
- Existem banheiros comuns nos corredores
- Todos os quartos têm AC
- Ao chegar, todos recebem trouxa de roupa de cama
- Todos têm direito a um armário com chave
- Camas devem conter numeração
- O Albergue oferece café da manhã que é incluso no pacote. O serviço de café da manhã é oferecido por empresa parceira. Qualquer consumo além de café da manhã é pago pelo cliente.

## Sobre o sistema/plataforma (site):
- Cadastro de usuário: deve conter cadastro de turismo no Brasil, é obrigado a ter. Nome, endereço, CPF, identidade, filiação, etc.
- Sistema/Site deve funcionar em celular, computador e tablet
- Mostrar quantas pessoas estão ativas no site naquele momento que estiver acessando
- O site deve ter suporte para outras línguas: a princípio, em inglês.
- Quando alugar, a cama torna-se indisponível no sistema. Ela não some no sistema, só mostra que já está alugada;
- Tem que ter opção para o cadastro de novas camas;
- O administrador deve poder dar desconto conforme aumento do número de camas. Mais camas alugados pelo cliente = maior desconto
- Deve conter mapa do hostel para o cliente se orientar.
- Sistema de avaliação: incluir para receber feedback e demonstrar para o cliente no próprio site. Inserir seção de elogios para exibir no site.
- Existe uma planilha que tem todas as características das camas e dos quartos
- Mochileiro: existem guias de camping, é interessante divulgar o hostel para esse público. Público jovem, de até 30 anos.

## Sobre as reservas:
- Um cliente pode reservar o quarto todo com todas as camas do quarto, quantas camas ele quiser.
- Se ele vai alugar mais de uma cama, deve cadastrar previamente quem vai usar cada cama.
- Preços especiais para cliente que alugam todas as camas de um quarto (ex.: família)
- Existe a opção de quartos para pessoas do mesmo sexo
- Quartos com banheiro, aumenta o valor

## Sobre os pagamentos/cancelamentos:
- Reserva no sistema: pagamento online. Sem reserva: pagamento no local.
- Antes do pagamento, há um termo de uso e deve checar que leu e concorda com os termos.
- Cancelamento: em cima da hora, paga a taxa. Se cancelar antecipadamente, não paga nada.
- A escolha da localização da cama não influencia no preço.

## Sobre o local (arredores e localização):
- Localização de fácil acesso em Santa Teresa, e bem cuidado: ponto importante para ser usado no marketing como diferencial.
- Quais as cores do albergue: vermelho claro, azul e branco
- Não tem elevador, mas tem acesso para cadeirante
- Deve conter recomendações de restaurantes e lugares para turistas conhecerem ao redor do hostel em Santa Teresa.
- Tem estacionamento, poucas vagas de estacionamento.

## Parte técnica do sistema / site
- Quem cadastra os quartos: funcionários
- Quem organiza, insere e exclui quartos: administrador
- Variação de preço conforme época do ano: administrador deve configurar preço conforme aumento da demanda

## Política de privacidade e de uso:
- Não pode pet
- Não pode bebida alcóolica
- Não pode o uso de drogas
- Menor de idade só pode acompanhado de responsável legal
- Não pode levar para os quartos quem não estiver previamente cadastrado
- Não existe serviço de quarto
- Mínimo e máximo de dias de hospedagem permitido: 1 dia a 10 anos
- Horário da diária: Começa 14h e termina 12h. Se precisar sair mais tarde, desocupar o quarto e deixa a bagagem no hostel. Há lugar reservado somente para guardar as malas, mas no sistema, consta como cama livre.

## Observações
- Maior problema atualmente: Comprar sem usar o telefone, ligar, falar com pessoas. O sistema deve ser muito fácil de ser utilizado. O maior problema é a comunicação entre cliente e empresa, principalmente pelo sotaque.
- Plataforma em: Português, inglês, francês, alemão e mandarim.
- Token de segunda verificação e verificação em duas etapas na hora do cadastro (chave no email ou token no dispositivo), deixar opcional;
- Mesclar o cara que tá convencendo a fechar com o hostel com um papel mais agressivo forçando ele a comprar (pop-up na tela de reserve aqui);
- uma ideia é trabalhar pelos quartos, outra é trabalhar pela posição da cama nos quartos (deixar o cliente filtrar ou a gente mesmo criar o filtro);
- Construir esse pensamento numa regra de negócios e em casos de uso;
- ADM geral é o dono do hostel, tem acesso e permissão a tudo, ele gerencia, cria as contas do funcionário;

## Requisitos Funcionais (RF)
- RF01: Cadastro de clientes com informações pessoais e turísticas.
- RF02: Autenticação de usuários.
- RF03: Autenticação em duas etapas opcional.
- RF04: Visualizar quartos disponíveis.
- RF05: Visualizar camas disponíveis e ocupadas.
- RF06: Reservar uma ou mais camas.
- RF07: Reservar um quarto inteiro.
- RF08: Cadastrar ocupantes de cada cama reservada.
- RF09: Calcular descontos por quantidade de camas.
- RF10: Descontos para quartos completos.
- RF11: Pagamento online.
- RF12: Aceite de termos de uso.
- RF13: Cancelamento de reservas.
- RF14: Cálculo de taxas de cancelamento.
- RF15: Exibir mapa interno.
- RF16: Recomendações turísticas.
- RF17: Exibir avaliações.
- RF18: Permitir avaliação pós-hospedagem.
- RF19: Exibir usuários online.
- RF20: Consulta por período.
- RF22: Filtrar quartos por características e gêneros.
- RF23: Cadastro de novas camas.
- RF24: CRUD de quartos e camas.
- RF27: Cadastro de funcionários.
- RF28: Admin gerenciar funcionários.
- RF29: Preços sazonais.
- RF30: Controle de ocupação automático.
- RF31: Check-in e Check-out.
- RF32: Controle de vagas de estacionamento.

## Requisitos Não Funcionais (RNF)
- RNF01: Interface intuitiva.
- RNF02: Reserva sem telefone.
- RNF03: Informações claras.
- RNF04-06: Multi-dispositivo (PC, Tablet, Smartphone).
- RNF07-11: Multi-idioma (PT, EN, FR, DE, ZH).
- RNF12-14: Segurança de dados e HTTPS.
- RNF15: Controle de acesso Admin.
- RNF16-17: Atualização em tempo real e concorrência.
