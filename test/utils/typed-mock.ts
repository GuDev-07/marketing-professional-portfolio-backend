export const mockFn = <R, A extends any[] = any[]>(): jest.Mock<R, A> =>
  jest.fn() as unknown as jest.Mock<R, A>;

// Example usage:
// const findMany = mockFn<Promise<MyType[]>, [any?]>();
// findMany.mockResolvedValue([...]);

export default mockFn;
