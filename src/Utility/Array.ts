import assert from 'assert'

export const rotate = <T>(list: T[], count: number): T[] => {
	assert(list instanceof Array && count >= 0 && count < list.length)

	const newList = [...list]
	newList.unshift(...newList.splice(-count))
	return newList
}
