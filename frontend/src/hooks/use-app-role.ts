import { useEffect, useMemo, useState } from "react";
import { APP_ROLE_LABELS, type AppRole, isAppRole } from "../lib/app-shell";

const APP_ROLE_STORAGE_KEY = "church.app-role";
const DEFAULT_APP_ROLE: AppRole = "jemaat";

function readStoredAppRole(): AppRole {
  if (typeof window === "undefined") {
    return DEFAULT_APP_ROLE;
  }

  const storedRole = window.localStorage.getItem(APP_ROLE_STORAGE_KEY);
  return isAppRole(storedRole) ? storedRole : DEFAULT_APP_ROLE;
}

export function getPersistedAppRole(): AppRole {
  return readStoredAppRole();
}

export function setPersistedAppRole(role: AppRole) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(APP_ROLE_STORAGE_KEY, role);
  window.dispatchEvent(
    new CustomEvent<AppRole>("app-role-change", { detail: role }),
  );
}

export function useAppRole() {
  const [role, setRoleState] = useState<AppRole>(() => readStoredAppRole());

  useEffect(() => {
    const syncRole = () => {
      setRoleState(readStoredAppRole());
    };

    const handleRoleChange = (event: Event) => {
      const customEvent = event as CustomEvent<AppRole>;
      const nextRole = customEvent.detail;

      if (nextRole && isAppRole(nextRole)) {
        setRoleState(nextRole);
        return;
      }

      syncRole();
    };

    window.addEventListener("storage", syncRole);
    window.addEventListener(
      "app-role-change",
      handleRoleChange as EventListener,
    );

    return () => {
      window.removeEventListener("storage", syncRole);
      window.removeEventListener(
        "app-role-change",
        handleRoleChange as EventListener,
      );
    };
  }, []);

  const setRole = (nextRole: AppRole) => {
    setPersistedAppRole(nextRole);
    setRoleState(nextRole);
  };

  return useMemo(
    () => ({
      role,
      roleLabel: APP_ROLE_LABELS[role],
      setRole,
      options: Object.entries(APP_ROLE_LABELS).map(([value, label]) => ({
        value: value as AppRole,
        label,
      })),
      isPMJ: role === "pmj",
      isJemaat: role === "jemaat",
      isAdmin: role === "pmj",
    }),
    [role],
  );
}
