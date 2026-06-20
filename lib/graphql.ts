import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:8000/graphql"
);

export async function signup(email: string, password: string) {
  const { signup } = await client.request<{ signup: { email: string } }>(
    gql`
      mutation Signup($email: String!, $password: String!) {
        signup(email: $email, password: $password) {
          email
        }
      }
    `,
    { email, password }
  );
  return signup;
}

export async function login(email: string, password: string) {
  const { login } = await client.request<{ login: { message: string; email: string } }>(
    gql`
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          message
          email
        }
      }
    `,
    { email, password }
  );
  return login;
}
