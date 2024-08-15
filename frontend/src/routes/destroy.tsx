import { redirect, ActionFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { contactDelete } from "../fectching/query";

export const action = (queryClient: QueryClient) => async({ params }: ActionFunctionArgs) => {
  await queryClient.fetchQuery(contactDelete(params.contactId as string));
  return redirect("/");
}