## Descrição

O objetivo deste projeto é colmatar a necessidade de transportar bens de um lado para o outro. 
Neste projeto existirão 5 tipos de utilizadores:
 - Clientes
 - Condutores
 - Empresas
 - Administradores
 - Super Administrador
 
## Tecnologias Usadas

- **Base de Dados**: SqLite
- **Back-end**: NodeJs
- **Front-end**: HTML, CSS, JS

## Tipos de utilizador

Na base de dados, cada tipo é representado por um número:

|Tipo Utilizador    |Número|
|-------------------|------|
|Cliente            |0     |
|Condutor           |1     |
|Empresa            |2     |
|Administrador      |3     |
|Super Administrador|4     |

## Documentação da API
[Link - Documentação API Postman](https://documenter.getpostman.com/view/12996570/TVzViwHz)

## Especificações da API
|RestFull URL|HTTP Action|Noun|Business Operation|
|-|-|-|-|
| /api/login | POST | User | Login |
| /api/register/signupClientDriver | POST | User | CreateClientDriver |
| /api/register/signupAdmin | POST | User | CreateAdmin |
| /api/register/signupMerchant | POST | User | CreateMerchant |
| /api/check/checkTokenInitialPage | GET | User | CheckTokenInitialPage |
| /api/check/checkToken/:typeUser | GET | User | CheckToken |
| /api/user/changeEP/:id | PUT | User | ChangeEmailPassword |
| /api/user/changeInfoCl/:id | PUT | User | ChangeInfoClient|
| /api/user/changeInfoMe/:id | PUT | User | ChangeInfoMerchant|
| /api/user/changeLogoMe/:id | PUT | User | ChangeLogoMerchant|
| /api/user/changeInfoAd/:id | PUT | User | ChangeInfoAdmin|
| /api/user/getInfoCl/:id | GET | User | GetInfoClient|
| /api/user/getInfoMe/:id | GET | User | GetInfoMerchant|
| /api/user/getInfoAd/:id | GET | User | GetInfoAdmin|
| /api/user/getDriversUncheck/ | GET | User | GetDriversUnchecked|
| /api/user/getMerchantsUncheck/ | GET | User | GetMerchantsUnchecked|
| /api/product/createProduct/ | POST | Product | CreateProduct|
| /api/product/changeInfoProduct/:id/:idProduct | PUT | Product | ChangeInfoProduct|
| /api/product/changeLogoProduct/:id/:idProduct | PUT | Product | ChangeLogoProduct|
| /api/product/getProductsMe/:id | GET | Product | GetProductsFromMerchant |
| /api/product/deleteProduct/:id | DELETE | Product | DeleteProduct|
| /api/product/changeQuantityProduct/:id/:idProduct | PUT | Product | ChangeQuantityProduct|
| /api/order/showProducts/:idMerchant | GET | Product | ShowProducts|
| /api/order/newReservation | POST | Order | newReservation|
| /api/order/deleteReservation | PUT | Order | deleteReservation|
| /api/order/payReservation/:id/:idOrder | PUT | Order | payReservation|
| /api/order/doneOrder/:id/:idOrder | PUT | Order | doneOrder|
| /api/order/showOrderDone | GET | Order | showOrderDone|
| /api/order/merchantOrders/:idMerchant | GET | Order | merchantOrders|
| /api/order/clientReservation/:idClient | GET | Order | getClientReservation|
| /api/order/clientReservationDone/:idClient | GET | Order | getClientReservationDone|
| /api/delivery/newDelivery | POST | Delivery | newDelivery|
| /api/delivery/doneDelivery/:id/:idOrder | PUT | Delivery | doneDelivery|
| /api/delivery/getDeliveriesCl/:id | GET | Delivery | getDeliveriesClient|
| /api/delivery/getDeliveriesMe/:id | GET | Delivery | getDeliveriesMerchant|

### Copyright
© Todos os direitos reservados.
