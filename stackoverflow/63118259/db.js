function createDefaultProfile(user_id) {
  return { version: 1, username: user_id };
}

function updateOrCreateProfile(user_id, profile) {
  if (profile && profile.credential_id) return null;
  if (!profile) profile = exports.createDefaultProfile(user_id);
  if (!profile.credential_id) {
    console.log('update profile with key');
  }
}

exports.createDefaultProfile = createDefaultProfile;
exports.updateOrCreateProfile = updateOrCreateProfile;
