import groupService from '../services/group.services';

class GroupController {
  static async createGroup(req, res) {
    const group = await groupService.createGroup(req.body.name, req.body.email);
    if (group) {
      return res.status(201).send({
        status: 201,
        data: [group],
        message: `New Group Created Succesfully`
      });
    }
    return res.status(500).json({
      status: 500,
      error: 'Failed to create new group',
      message: 'Request Unsucessful'
    });
  }
}

export default GroupController;
