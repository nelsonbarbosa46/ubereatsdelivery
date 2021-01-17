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
[Link](documention.md)
### Login

* **URL** <br>
  /api/login
  
* **Método** <br>
  `POST`
  
* **Parâmetros BODY**
 
   **Campos Obrigatórios**

   `email` <br/>
   `password`
* **Resposta**
    * **Sucesso** <br />
        **Código HTTP:** 200 <br /><br/>
        **Resposta:** <br />
     ```json
    {
        "message": "success",
        "login": {
            "email": "empresa1@email.com",
            "typeUser": 2,
            "token": "eyJhbGciOiJIUz...",
            "url": "/merchant/"
        },
        "request": {
            "type": "POST",
            "description": "Iniciar Sessão"
        }
    }
    ```
    * **Erro** <br />
        **Código HTTP:** 400/500 <br /><br/>
     **Resposta:** <br />
     ```json
    {
        "message": "failed",
        "request": {
            "type": "POST",
            "description": "Iniciar Sessão"
        }
    }
     ```

* **Exemplo Submissão (Postman)**
    ```json
    {
        "email": "cliente33@email.com",
        "password": "Password1"
    }
    ```
---
### Registar Cliente/Condutor

* **URL** <br>
    /api/signupClientDriver
  
* **Método** <br>
    `POST`
  
* **Parâmetros BODY**
 
    **Campos Obrigatórios**
        
    `name` <br/>
    `email` <br/>
    `password` <br/>
    `repeatPassword` <br/>
    `address` <br/>
    `zipCode` <br/>
    `location` <br/>
    `nif` <br/>
    `contactNumber` <br/>
    `isDriver` <br/>
        
    Se pretender ser condutor precisa de mais 1 campo <br/>
    `typeVehicle` <br/>

    * **Observações**<br/><br>
    O campo `password` tem de ter no mínimo 8 caracteres e no máximo 15, ter <br/> pelo menos 1 maiúscula, 1 minúscula e 1 número. O `repeatPassword` <br/> tem de ser igual ao `password`.<br/><br>
    Alguns campos tem verificações para ver se são válidos como por exemplo, <br/> `email`, `zipCode`, `location`(concelho onde reside), `nif` e `contactNumber`. <br/><br/>
    O campo `isDriver` deve ser ou `0`(não ser condutor) ou `1` (ser condutor). <br/> Se pretender ser condutor só pode escolher três opções: <br/>
        * `1`: Carro
        * `2`: Mota
        * `3`: Bicicleta
* **Resposta**
    * **Sucesso** <br />
        **Código HTTP:** 201 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "success",
            "userCreated": {
                "email": "cliente33@email.com",
                "name": "Condutor"
            },
            "login": {
                "token": "eyJhbGciOiJIUzI1N...",
                "url": "/client/"
            },
            "request": {
                "type": "POST",
                "description": "Criar um cliente/condutor"
            }
        }
         ```
    * **Erro** <br />
        **Código HTTP:** 400/500 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "failed",
            "request": {
                "type": "POST",
                "description": "Criar um cliente/condutor"
            }
        }
        ```
* **Exemplo Submissão (Postman)**
    ```json
    {
        "email": "cliente33@email.com",
        "password": "Password1",
        "repeatPassword": "Password1",
        "address": "Rua",
        "zipCode": "4755-000",
        "location": "Barcelos",
        "name": "Condutor",
        "nif": "599999999",
        "contactNumber": "910000000",
        "isDriver": "1",
        "typeVehicle": "3"
    }
    ```
---

### Registar Empresa

* **URL** <br>
    /api/signupMerchant 
  
* **Método** <br>
    `POST`
  
* **Parâmetros BODY**

    **Campos Obrigatórios**

    ***Tem de ser utilizado o formData***<br>        
    `name` <br/>
    `email` <br/>
    `password` <br/>
    `repeatPassword` <br/>
    `address` <br/>
    `zipCode` <br/>
    `location` <br/>
    `category` <br>
    `nipc` <br/>
    `description` <br>
    `contactNumber` <br/>
    `logo` <br>

    * **Observações**<br/><br>
    O campo `password` tem de ter no mínimo 8 caracteres e no máximo 15, ter <br/> pelo menos 1 maiúscula, 1 minúscula e 1 número. O `repeatPassword` <br/> tem de ser igual ao `password`.<br/><br>
    Alguns campos tem verificações para ver se são válidos como por exemplo, <br/> `email`, `zipCode`, `location`(concelho onde reside), `nipc` e `contactNumber`. <br/><br/>
    O campo `file` tem de ter o tipo de ficheiro .png, .jpeg ou .jpg. <br><br>
    No campo `category` pode escolher cinco opções: <br/>
    
        * `1`: Churrascaria
        * `2`: Massas
        * `3`: Peixes e Frutos do Mar
        * `4`: Sopas
        * `5`: Sushi
        
* **Resposta**
    * **Sucesso** <br />
        **Código HTTP:** 201 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "success",
            "userCreated": {
                "email": "empresa44@email.com",
                "name": "Empresa 1"
            },
            "login": {
                "token": "eyJhbGciOiJIUzI1N...",
                "url": "/merchant/"
            },
            "request": {
                "type": "POST",
                "description": "Criar uma empresa"
            }
        }
         ```
    * **Erro** <br />
        **Código HTTP:** 400/500 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "failed",
            "request": {
                "type": "POST",
                "description": "Criar uma empresa"
            }
        }
        ```
* **Exemplo Submissão (Postman)**
    ```javascript
    fd.append('name', name);
    fd.append('email', email);
    fd.append('password', password);
    fd.append('repeatPassword', repeatPassword);
    fd.append('address', address);
    fd.append('zipCode', zipCode);
    fd.append('location', location);
    fd.append('nipc', nipc);
    fd.append('category', category);
    fd.append('description', description);
    fd.append('contactNumber', contactNumber);
    fd.append('logo', file);

    $.ajax({
        url: url+'/api/register/signupMerchant',
        type: 'POST',
        cache: false,
        data: fd,
        contentType: false,
        processData: false,
        success: function (data) {
            ...                
        }
        , error: function (jqXHR, textStatus, err) {
            ...
        }
    })
    ```
---

### Registar Administrador

* **Observações**<br>
Só pode criar um administrador um super administrador.

* **URL** <br>
    /api/signupAdmin 
  
* **Método** <br>
    `POST`
  
* **Parâmetros BODY**
 
    **Campos Obrigatórios**
        
    `name` <br/>
    `email` <br/>
    `password` <br/>
    `repeatPassword` <br/>
    `address` <br/>
    `zipCode` <br/>
    `location` <br/>

    * **Observações**<br/><br>
    O campo `password` tem de ter no mínimo 8 caracteres e no máximo 15, ter <br/> pelo menos 1 maiúscula, 1 minúscula e 1 número. O `repeatPassword` <br/> tem de ser igual ao `password`.<br/><br>
    Alguns campos tem verificações para ver se são válidos como por exemplo, <br/> `email`, `zipCode` e `location`(concelho onde reside). <br/><br/>
    
* **Resposta**
    * **Sucesso** <br />
        **Código HTTP:** 201 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "success",
            "userCreated": {
                "email": "admin1@mail.com",
                "name": "Administrador 1"
            },
            "login": {
                "token": "eyJhbGciOiJIUzI1Ni...",
                "url": "/admin/"
            },
            "request": {
                "type": "POST",
                "description": "Criar um administrador"
            }
        }
         ```
    * **Erro** <br />
        **Código HTTP:** 400/500 <br /><br/>
        **Resposta:** <br />
        ```json
        {
            "message": "failed",
            "request": {
                "type": "POST",
                "description": "Criar um cliente/condutor"
            }
        }
        ```
* **Exemplo Submissão (Postman)**
    ```json
    {
        "email": "admin1@mail.com",
        "password": "Password1",
        "repeatPassword": "Password1",
        "address": "rua",
        "zipCode": "4755-000",
        "location": "Barcelos",
        "name": "Administrador 1"
    }
    ```
---

### Copyright
© Todos os direitos reservados.
