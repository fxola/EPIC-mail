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
}

export default GroupService;
