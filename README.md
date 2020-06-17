
# Desafio - Backend

Desafio – “Eu revendedor ‘O Boticário’ quero ter benefícios de acordo com o meu volume de vendas”.

## Executando os testes
simple

    npm run test

verbose

    npm run test:verbose

coverage

    npm run test:ci

unit

    npm run test:unit

integration

    npm run test:integration

## Executando
Comando executa o build e o docker-compose up -d 

    npm run up

## Endpoints
Adicionar revendedor(a):

    curl --request POST \
      --url http://localhost:5050/api/reseller \
      --header 'content-type: application/json' \
      --data '{
    	"itr": "66928848022",
    	"name": "Ambor Fincoiuil",
    	"email": "ambor.fincoiuil@boticariochallenge.com",
    	"password": "9OGoA7o4",
    	"passwordConfirmation": "9OGoA7o4"
    }'

Login revendedor(a):

    curl --request POST \
      --url http://localhost:5050/api/login \
      --header 'content-type: application/json' \
      --data '{
    	"email": "ambor.fincoiuil@boticariochallenge.com",
    	"password": "9OGoA7o4"
    }'

Adicionar uma compra:

    curl --request POST \
      --url http://localhost:5050/api/order \
      --header 'content-type: application/json' \
      --header 'x-access-token: (utilizar o token gerado no login)' \
      --data '{
    	"code": "528085176291",
    	"value": 9999.99,
    	"date": "2020/06/17",
    	"itr": "15350946056"
    }'

Listar vendas:

    curl --request GET \
      --url http://localhost:5050/api/order \
      --header 'content-type: application/json' \
      --header 'x-access-token: (utilizar o token gerado no login)'

Exibir o acumulado de cashback:

    curl --request GET \
      --url http://localhost:5050/api/cashback \
      --header 'content-type: application/json' \
      --header 'x-access-token: (utilizar o token gerado no login)'

## Checklist
- [x] Utilizado: NodeJS;
- [x] Utilizado: MongoDB;
- [x] Diferencial: Testes unitários;
- [x] Diferencial: Testes de integração;
- [x] Diferencial: Autenticação por JWT;
- [x] Diferencial: Logs da aplicação;
