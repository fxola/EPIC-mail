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

  static async getGroups(req, res) {
    const groups = await groupService.getGroups(req.body.email);
    if (groups) {
      return res.status(200).json({
        status: 200,
        data: groups,
        message: `Request succesful. You belong to ${groups.length} group(s)`
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'No group found',
      message: 'Request Unsuccessful. You do not belong to any group presently'
    });
  }
}

export default GroupController;
