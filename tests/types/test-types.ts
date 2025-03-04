export type AssertFunction = (condition: boolean, message: string) => void;

export type AssertEqualsFunction = <T>(
  actual: T,
  expected: T,
  message: string
) => void;
