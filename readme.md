<h1 align="center">
  🧾<br>Portfolio - BackEnd
</h1>

## 🔧 Tecnologias utilizadas

- TypeScript;
- Sequelize;
- Bcrypt;
- Json Web Token;
- Jest;

---

## 🏃‍♂️ Executar

- Abra a pasta do projeto, e execute o `npm install`;
- Após isso, copie o `.env-example` para a mesma pasta, e altere o nome para `.env`. Preencha-o seguindo as suas configurações;
- Exemplo:
  `DB_PORT=3306`
  `DB_HOST=localhost`
  `DB_DATABASE=donate`
  `DB_USERNAME=root`
  `DB_PASSWORD=senha123`
  `NODE_ENV=development`
  `PORT_SERVER=7070`
  `TOKEN_SALT=1`
  `JWT_SECRET=teste`
  `LIMIT_FILTER_DEFAULT=100`
- Após isso, execute `npm run update-database`, que fará a criação das tabelas e populará com dados aleátorios.
- Depois só executar `npm start`. Se tudo ocorrer bem, sua API já estará funcionando.
  <br/>

![image](https://github.com/lucasfelipeluz/donate-api/assets/65639478/3ed5eb0f-ebd2-47f3-a600-752aec7afcef)
