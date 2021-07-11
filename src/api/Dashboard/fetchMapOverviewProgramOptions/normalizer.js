export default options =>
  options.map(item => {
    return {
      label: item.programName,
      value: item.programName,
      programId: item.programId,
    }
  })
