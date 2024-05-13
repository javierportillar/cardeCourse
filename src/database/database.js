const pg = require("pg");
const { Client } = pg;

class Database {
  config;

  constructor(config) {
    this.config = config;
  }

  async createClient() {
    try {
      const client = new Client(this.config);
      await client.connect();
      return client;
    } catch (e) {
      throw new Error(e);
    }
  }

  async query(SQLQuery) {
    let client;
    try {
      client = await this.createClient();
      const result = await client.query(SQLQuery);
      await client.end();
      return result;
    } catch (e) {
      if (client) {
        client.end();
      }
      throw new Error(e);
    }
  }

  async getRows(SQLQuery) {
    const result = await this.query(SQLQuery);
    return result.rows;
  }

  async getRow(SQLQuery) {
    const result = await this.query(SQLQuery);
    return result.rows?.[0];
  }
  
  async create(SQLQuery){
    const result = await this.query(`${SQLQuery} returning *`);
    return result.rows[0];
  }
}

const database = new Database({
  database: "test1c1",
  port: 5434,
  host: "localhost",
  user: "javier",
  password: "contrasena",
});

module.exports = { database };
