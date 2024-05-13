import { SetterOrUpdater } from 'recoil'

type SetStateFunction<T> = SetterOrUpdater<T>
type KeyPath = (string | number)[]

function updateNestedObject<T>(setState: SetStateFunction<T>, path: KeyPath, value: any): void {
  setState((prevState) => {
    // path를 따라가며 객체를 업데이트하는 재귀적 도우미 함수
    const updateRecursively = (obj: any, index: number): any => {
      if (index === path.length - 1) {
        // 최종적으로 값을 설정
        return { ...obj, [path[index]]: value }
      }
      // 다음 레벨의 객체로 재귀
      return {
        ...obj,
        [path[index]]: updateRecursively(obj[path[index]] || {}, index + 1),
      }
    }

    return updateRecursively(prevState, 0)
  })
}

export default updateNestedObject
