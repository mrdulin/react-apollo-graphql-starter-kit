const debug = console.debug;
const MemberService = require('./MemberService');
const generateError = require('./generateError');

const retrieveMember = async (req, res, next) => {
  try {
    if (req.params.id === '' || req.params.id === undefined) {
      throw generateError(400, 'invalid.');
    }

    const regex = RegExp('[^a-zA-Z0-9-]');
    if (regex.test(req.params.id)) {
      throw generateError(400, 'invalid format.');
    }

    const memberId = req.params.id;
    const memberRecord = await MemberService.retrieveOneMember(memberId);

    const member_detail = {
      id: memberRecord.id,
      username: memberRecord.username,
    };

    res.status(200).send({ member_detail: member_detail });
  } catch (e) {
    if (e) {
      debug('could not get member');
      return next(e);
    }
  }
};

module.exports = retrieveMember;
