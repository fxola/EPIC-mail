/**
 *
 *@exports
 * @class User
 */
class User {
  /**
   *Creates an instance of User.
   * @param {Integer} id
   * @param {String} email
   * @param {String} firstName
   * @param {String} lastName
   * @param {String} password
   * @memberof User
   */
  constructor(id, email, firstName, lastName, password) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }
}

export default User;
