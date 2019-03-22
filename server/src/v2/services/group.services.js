import db from '../models/db';

class GroupService {
  static async getUserId(email) {
    const sql = `select id from users where email = $1`;
    const user = await db.query(sql, [email]);
    return user.rows[0].id;
  }

  static async createGroup(name, email) {
    const userId = await this.getUserId(email);
    const query = `insert into groups(name,owner_id) values ($1,$2) returning *`;
    const { rows } = await db.query(query, [name, userId]);
    const groupId = rows[0].id;

    // insert data into the group members table
    const sql = `insert into group_members(group_id,member_id) values ($1,$2) returning*`;
    await db.query(sql, [groupId, userId]);

    const group = rows[0];
    return group;
  }

  static async getGroups(userEmail) {
    const userId = await this.getUserId(userEmail);
    const query = `select * from groups where owner_id = $1`;
    const { rows } = await db.query(query, [userId]);
    if (rows.length > 0) return rows;
    return false;
  }

  static async updateGroup(update, id, email) {
    const userId = await this.getUserId(email);
    const check = `select * from groups where id =$1 and owner_id =$2`;

    const { rowCount } = await db.query(check, [id, userId]);
    if (rowCount > 0) {
      const query = `update groups set name = $1 where id =$2 and owner_id =$3 returning *`;
      const { rows } = await db.query(query, [update, id, userId]);
      if (rows.length > 0) return rows[0];
    }
    return false;
  }

  static async deleteGroup(id, userEmail) {
    const userId = await this.getUserId(userEmail);
    const query = `delete from groups where owner_id =$1 and id =$2`;
    const deletedResult = await db.query(query, [userId, id]);
    if (deletedResult.rowCount > 0) return true;
    return false;
  }
}

export default GroupService;
