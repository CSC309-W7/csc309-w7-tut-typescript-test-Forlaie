import type { User } from "./types";

export const apiResponse: unknown = [
  { name: "Tony", age: 23 },
  { name: "Kevin", age: "24" }, // invalid
  { name: "Jim", age: 25 },
];

export function getUsersData(): User[] {
  if (!Array.isArray(apiResponse)) {
    return []; // I'm confused because the instructions say to not throw runtime errors, but I feel like we should for this case
  }

  // I dont know how to do this without doing "as User", so this is the best I can do
  const convertToUser = apiResponse.filter(
    (item): item is User =>
      typeof item === "object" &&
      "name" in item &&
      "age" in item
  );

  return formatAges(convertToUser);
}

export function formatAges(users: User[]): User[] {
  return users.map((u) => {
    let age = u.age;
    if (typeof age === "string") {
      age = Number(age);
    }
    return {
      ...u,
      age: age,
    };
  });
}