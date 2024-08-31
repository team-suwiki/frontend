type Generator<T> = (index: number) => T;

const createFakeData = <T>(count: number, generator: Generator<T>): T[] => {
  const data: T[] = new Array(count);
  for (let i = 0; i < data.length; i++) {
    data[i] = generator(i);
  }

  return data;
};

export default createFakeData;
