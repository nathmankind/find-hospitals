import axios from "axios";
import { gql } from "apollo-boost";

export const getItem = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const getUsers = gql`
  {
    users {
      email
      search
    }
  }
`;

