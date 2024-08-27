import { redirect, ActionFunctionArgs } from "react-router-dom";
import { QueryClient } from "@tanstack/react-query";
import { deleteContact } from "../fectching/api";

export const action = (queryClient: QueryClient) => async({ params }: ActionFunctionArgs) => {
  await deleteContact(params.contactId as string);
  queryClient.invalidateQueries({queryKey:['contacts', 'get']})
  return redirect("/");
}