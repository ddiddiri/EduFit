import { useFocusEffect } from "@react-navigation/native";
import { QueryKey, useQueryClient } from "@tanstack/react-query";
import React from "react";

export function useRefreshOnFocus(queryKey: QueryKey) {
  const queryClient = useQueryClient();
  const firstTimeRef = React.useRef(true);

  useFocusEffect(
    React.useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;
        return;
      }

      // refetch all stale active queries with matching query key
      queryClient.refetchQueries({
        queryKey,
        stale: true,
        type: "active",
      });
    }, [queryClient, queryKey]),
  );
}