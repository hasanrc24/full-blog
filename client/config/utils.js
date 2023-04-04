import { serialize } from "next-mdx-remote/serialize";

export const getTime = (time) => {
  const date = new Date(time);

  const options = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  };
  const formattedDate = date.toLocaleString("en-US", options).replace(/,/, ",");
  return formattedDate;
};

export const serializeMarkdown = async (body) => {
  return await serialize(body);
};
