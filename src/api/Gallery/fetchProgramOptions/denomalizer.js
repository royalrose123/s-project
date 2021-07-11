export default ({ programName, createUser, hasAll, isMixPlatform }) => ({
  programName: programName === 'All' ? null : programName,
  createUser: createUser,
  all: hasAll,
  isMixPlatform,
})
