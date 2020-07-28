describe('63118259', () => {
  describe('updateOrCreateUser', () => {
    const db = require('./db.js');
    it('should call createDefaultProfile() when no profile is provided', () => {
      const userID = 1;
      const logSpy = jest.spyOn(console, 'log');
      db.createDefaultProfile = jest.fn().mockReturnValueOnce({ credential_id: null });
      db.updateOrCreateProfile(userID);
      expect(db.createDefaultProfile).toHaveBeenCalledTimes(1);
      expect(logSpy).toBeCalledWith('update profile with key');
    });
  });
});
