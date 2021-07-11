import FunctionList from 'utils/function-list'

export function startSwitch(firstFunction) {
  class Flow extends FunctionList {
    constructor() {
      super()
      this.functionList = [firstFunction]
    }

    execute() {
      const flowFactory = this

      return function(...initialArguments) {
        const executeResult = flowFactory.functionList.map(item => item(...initialArguments)).find(funcResult => Boolean(funcResult))

        return executeResult
      }
    }
  }

  return new Flow()
}
